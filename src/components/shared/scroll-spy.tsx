"use client";

import { useEffect } from "react";

/**
 * Actualiza el hash de la URL del navegador conforme el usuario hace scroll por
 * las secciones de la home (scroll-spy). Usa history.replaceState para no llenar
 * el historial ni provocar saltos de scroll (replaceState no dispara navegación
 * ni el evento hashchange). La primera sección limpia el hash (URL "/").
 *
 * `ids` debe ir en el mismo orden en que las secciones aparecen en el DOM.
 */
export function ScrollSpy({ ids }: { ids: string[] }) {
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const visible = new Set<string>();
    let currentId = "";

    const apply = () => {
      // Sección activa = la primera (en orden de documento) que cruza la banda.
      const active = ids.find((id) => visible.has(id));
      if (!active || active === currentId) return;
      currentId = active;
      const isFirst = active === ids[0];
      const url = isFirst
        ? window.location.pathname + window.location.search
        : `#${active}`;
      window.history.replaceState(window.history.state, "", url);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        apply();
      },
      // Banda activa: ~40% desde arriba hasta ~45% desde abajo del viewport.
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return null;
}
