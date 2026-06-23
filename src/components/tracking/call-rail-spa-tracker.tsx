"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type CallTrkWindow = Window & {
  CallTrk?: { swap?: () => void };
};

/**
 * Re-ejecuta el swap de CallRail en cambios de ruta (SPA). El swap.js solo corre
 * al cargar la página; en navegaciones cliente hay que volver a llamar a
 * CallTrk.swap() para que reemplace los teléfonos del contenido nuevo. No carga
 * el script: de eso se encarga <CallRail /> en el layout.
 */
export function CallRailSPATracker() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const w = window as CallTrkWindow;
    w.CallTrk?.swap?.();
  }, [pathname]);

  return null;
}
