import 'server-only';

// Google Places API (New): https://developers.google.com/maps/documentation/places/web-service/place-details
// Returns up to 5 reviews chosen by Google. Content is refreshed by ISR (see REVALIDATE) and
// shown with the attribution Google requires (author name/link and "Google" source).

export type Review = {
  author: string;
  authorUrl?: string;
  photo?: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime?: string;
};

export type PlaceReviews = {
  placeId: string;
  name: string;
  rating?: number;
  total?: number;
  mapsUrl?: string;
  writeReviewUrl: string;
  reviews: Review[];
};

const REVALIDATE = 60 * 60 * 12; // 12 h
const API = 'https://places.googleapis.com/v1';

type ApiReview = {
  rating?: number;
  text?: {text?: string};
  originalText?: {text?: string};
  relativePublishTimeDescription?: string;
  publishTime?: string;
  authorAttribution?: {displayName?: string; uri?: string; photoUri?: string};
};

async function resolvePlaceId(key: string, query: string, knownId?: string): Promise<string | undefined> {
  if (process.env.GOOGLE_PLACE_ID) return process.env.GOOGLE_PLACE_ID;
  if (knownId) return knownId;
  const res = await fetch(`${API}/places:searchText`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'places.id'},
    body: JSON.stringify({textQuery: query}),
    next: {revalidate: 60 * 60 * 24 * 30},
  });
  if (!res.ok) return undefined;
  const data = (await res.json()) as {places?: {id: string}[]};
  return data.places?.[0]?.id;
}

export async function getPlaceReviews(query: string, lang: 'en' | 'es', knownId?: string): Promise<PlaceReviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;
  try {
    const placeId = await resolvePlaceId(key, query, knownId);
    if (!placeId) return null;
    const res = await fetch(`${API}/places/${encodeURIComponent(placeId)}?languageCode=${lang}`, {
      headers: {'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,googleMapsUri,reviews'},
      next: {revalidate: REVALIDATE},
    });
    if (!res.ok) {
      console.error('Places API error', res.status);
      return null;
    }
    const place = (await res.json()) as {
      id: string; displayName?: {text?: string}; rating?: number; userRatingCount?: number; googleMapsUri?: string; reviews?: ApiReview[];
    };
    return {
      placeId: place.id,
      name: place.displayName?.text ?? '',
      rating: place.rating,
      total: place.userRatingCount,
      mapsUrl: place.googleMapsUri,
      writeReviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(place.id)}`,
      reviews: (place.reviews ?? [])
        .map(r => ({
          author: r.authorAttribution?.displayName ?? 'Google user',
          authorUrl: r.authorAttribution?.uri,
          photo: r.authorAttribution?.photoUri,
          rating: r.rating ?? 0,
          text: (r.text?.text ?? r.originalText?.text ?? '').trim(),
          relativeTime: r.relativePublishTimeDescription ?? '',
          publishTime: r.publishTime,
        }))
        .filter(r => r.text.length > 0),
    };
  } catch (error) {
    console.error('Places API request failed', error);
    return null;
  }
}
