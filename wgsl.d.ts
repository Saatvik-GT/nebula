/// <reference types="@webgpu/types" />

/**
 * What `@vgpu/wgsl`'s webpack/turbopack loader emits for a `*.wgsl` import:
 * the v1 `ShaderSource` artifact, not a bare string. `gpu.effect()` accepts
 * this shape directly.
 */
declare module "*.wgsl" {
  const source: { readonly version: 1; readonly wgsl: string };
  export default source;
}
