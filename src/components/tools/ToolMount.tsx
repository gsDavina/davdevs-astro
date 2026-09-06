import { TOOL_REGISTRY } from './registry';

/**
 * Astro's `client:*` directives need to statically resolve which component
 * to hydrate, so a variable holding a dynamically-looked-up component
 * (`TOOL_REGISTRY[slug]`) can't be passed directly as `<Component client:load />`
 * from an .astro file — Astro throws NoMatchingImport. This wrapper is the
 * one statically-known island Astro hydrates; the actual per-tool lookup
 * happens inside React, where a dynamic reference is fine.
 */
export default function ToolMount({ component }: { component: string }) {
  const Component = TOOL_REGISTRY[component];
  if (!Component) return null;
  return <Component />;
}
