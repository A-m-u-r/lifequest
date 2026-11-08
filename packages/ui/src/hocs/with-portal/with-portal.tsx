import { createPortal } from "react-dom";
import type { ComponentType } from "react";

export function withPortal<P extends object>(
  Component: ComponentType<P>,
  containerId = "portals",
) {
  function Portaled(props: P) {
    if (typeof document === "undefined") return null;
    const container = document.getElementById(containerId);
    if (!container) return null;
    return createPortal(<Component {...props} />, container);
  }

  Portaled.displayName = `withPortal(${Component.displayName || Component.name || "Component"})`;
  return Portaled;
}
