import Script from "next/script";

/**
 * CallRail Dynamic Number Insertion (swap.js) — "Website pool".
 * Company 727469111. El swap.js detecta el "swap target" configurado en CallRail
 * dentro de la página y lo reemplaza por un número de seguimiento del pool,
 * atribuyendo cada llamada a la fuente del visitante.
 *
 * Solo se carga en producción (incl. previews de Vercel) para no gastar números
 * del pool ni ensuciar la atribución con visitas desde localhost.
 */
const CALLRAIL_SWAP_SRC =
  "https://cdn.callrail.com/companies/727469111/6eefb2b516d9c5b0d33e/12/swap.js";

export function CallRail() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script id="callrail-swap" strategy="afterInteractive" src={CALLRAIL_SWAP_SRC} />
  );
}
