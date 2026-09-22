import { unstable_cache } from "next/cache";
import { CONTACT_INFO, GOOGLE_REVIEWS_DATA } from "@/lib/constants";

export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  relativeTime?: string;
  photoUrl?: string;
}

export interface GooglePlaceData {
  averageRating: number;
  totalReviews: number;
  reviews: GoogleReview[];
}

const FALLBACK: GooglePlaceData = {
  averageRating: GOOGLE_REVIEWS_DATA.averageRating,
  totalReviews: GOOGLE_REVIEWS_DATA.totalReviews,
  reviews: [],
};

/**
 * Trae rating + reseñas recientes de Google Places API (New).
 * Lanza error si la respuesta no es válida: así unstable_cache no guarda el
 * fallo (antes lo guardaba 7 días y la home se quedaba sin reseñas reales).
 * La key vive solo en .env (server-side).
 */
async function fetchGooglePlaceData(): Promise<GooglePlaceData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  // Place ID verificado vive en constants; el env solo lo sobreescribe si se define.
  const placeId = process.env.GOOGLE_PLACE_ID || CONTACT_INFO.googlePlaceId;
  if (!apiKey || !placeId) throw new Error("Places: falta API key o Place ID");

  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        "Accept-Language": "es",
      },
      // unstable_cache maneja el cacheo; evitamos doble caché de fetch.
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error(`Places: HTTP ${res.status}`);
  const data = (await res.json()) as {
    rating?: number;
    userRatingCount?: number;
    reviews?: Array<{
      rating?: number;
      text?: { text?: string };
      originalText?: { text?: string };
      authorAttribution?: { displayName?: string; photoUri?: string };
      relativePublishTimeDescription?: string;
    }>;
  };

  const reviews: GoogleReview[] = (data.reviews ?? [])
    .filter((r) => (r.rating ?? 0) >= 5)
    .slice(0, 5)
    .map((r) => ({
      author: r.authorAttribution?.displayName ?? "Google",
      rating: r.rating ?? 5,
      text: r.text?.text ?? r.originalText?.text ?? "",
      relativeTime: r.relativePublishTimeDescription,
      photoUrl: r.authorAttribution?.photoUri,
    }))
    .filter((r) => r.text.length > 0);

  if (!data.rating || !data.userRatingCount || reviews.length === 0) {
    throw new Error("Places: respuesta sin rating o sin reseñas");
  }

  return {
    averageRating: data.rating,
    totalReviews: data.userRatingCount,
    reviews,
  };
}

// Clave rotada (-v2): la Data Cache de Vercel sobrevive a los deploys y aún
// guardaba el fallback de la versión anterior.
const getCachedGooglePlaceData = unstable_cache(
  fetchGooglePlaceData,
  ["google-place-data-v2"],
  { revalidate: 604800, tags: ["google-place-data"] },
);

/**
 * Si Places falla y no hay caché previa, devuelve el respaldo SIN cachearlo.
 * Si ya hay un resultado bueno en caché, Next lo sigue sirviendo aunque la
 * revalidación en segundo plano falle.
 */
export async function getGooglePlaceData(): Promise<GooglePlaceData> {
  try {
    return await getCachedGooglePlaceData();
  } catch (err) {
    console.error("[google-places]", err);
    return FALLBACK;
  }
}
