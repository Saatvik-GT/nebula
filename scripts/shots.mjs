import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = ".impeccable/review";
mkdirSync(OUT, { recursive: true });

const BASE = process.env.BASE ?? "http://localhost:3000";
const routes = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["/", "/dashboard"];

const only = process.env.ONLY; // "desktop" | "mobile"
const targets = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
].filter((t) => !only || t.name === only);

const browser = await chromium.launch();
const ctxDesktop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: "dark",
});
const ctxMobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  colorScheme: "dark",
});

for (const route of routes) {
  const slug =
    route === "/" ? "landing" : route.replace(/^\//, "").replace(/\//g, "_");
  for (const t of targets) {
    const ctx = t.name === "desktop" ? ctxDesktop : ctxMobile;
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + route, {
        waitUntil: "domcontentloaded",
        timeout: 20000,
      });
      await page
        .waitForFunction(
          () => {
            const bg = getComputedStyle(document.body).backgroundColor;
            return (
              bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "rgb(255, 255, 255)"
            );
          },
          { timeout: 6000 },
        )
        .catch(() => {});
      await page.waitForTimeout(1600);
      const file = `${OUT}/${slug}-${t.name}.png`;
      await page.screenshot({ path: file, fullPage: true });
      console.log("wrote", file);
    } catch (e) {
      console.log("FAILED", route, t.name, String(e).slice(0, 120));
    } finally {
      await page.close();
    }
  }
}
await browser.close();
console.log("done");
