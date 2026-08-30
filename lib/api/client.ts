import type { DashboardDto } from "@/lib/contracts/dashboard";
import { mockDashboard } from "@/lib/api/mock/dashboard";

/**
 * Thin typed API client. During scaffolding it resolves fixtures that satisfy
 * the contract types; point `EPD_API_BASE` at the backend to switch transport
 * without touching component code.
 */

const API_BASE = process.env.NEXT_PUBLIC_EPD_API_BASE ?? "";

async function get<T>(path: string, fallback: T): Promise<T> {
  if (!API_BASE) return fallback;
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`);
  return (await res.json()) as T;
}

export const api = {
  getDashboard: (window: "day" | "week" = "week"): Promise<DashboardDto> =>
    get(`/dashboard?window=${window}`, {
      ...mockDashboard,
      validationOverview: { ...mockDashboard.validationOverview, window },
    }),
};
