# The King of Professional Welding — website v2 (Next.js)

Bilingual site: English at `/`, Spanish at `/es`. Domain: **https://kingprofessionalwelding.com**.
Replaces the static `dist/` version (kept untouched in `../dist` and in the `github-public` repo).

## Commands

```powershell
npm install
npm run dev      # http://localhost:4173
npm run check    # TypeScript
npm run build    # production build
npm run assets   # regenerate favicons + og-image.jpg (requires Python + Pillow, Windows fonts)
```

## Structure

| Path | Content |
|---|---|
| `lib/site.ts` | Business data (name, phone, address, links). Must match Google Business Profile exactly. |
| `lib/i18n.ts` | All EN/ES copy, titles and meta descriptions |
| `lib/google-reviews.ts` | Server-only Google Places API (New) client, cached 12 h (ISR) |
| `app/[lang]/` | Layout (metadata, hreflang, Open Graph) and page |
| `app/sitemap.ts`, `robots.ts`, `manifest.ts` | SEO routes |
| `components/` | Header, gallery/lightbox, quote form, reviews, JSON-LD, mobile action bar |
| `public/` | Favicons, `og-image.jpg` (1200×630, 112 KB — WhatsApp/Facebook preview), photos |

## SEO included

- Unique title/description per language, canonical + `hreflang` (en-US, es-US, x-default).
- `LocalBusiness`, `WebSite`, `WebPage` and `FAQPage` JSON-LD with confirmed facts only (no invented hours, prices or ratings).
- `sitemap.xml` with language alternates, `robots.txt`, web manifest, favicons and Apple touch icon.
- Server-rendered HTML, `next/image` (AVIF/WebP, responsive sizes), self-hosted fonts via `next/font`, security headers.

## Deploy (Vercel)

1. Put the contents of this `web/` folder at the root of the GitHub repo connected to Vercel
   (`the-king-professional-welding`). `vercel.json` sets the framework to Next.js; in
   Vercel › Settings › Build, clear the old "Output Directory = dist" override if it remains.
2. Vercel › Settings › Domains: add `kingprofessionalwelding.com` and `www.kingprofessionalwelding.com`,
   set the apex as primary (www redirects to it), and apply the DNS records Vercel shows.
3. After the domain resolves: test the WhatsApp preview by sending the URL in a chat
   (or Facebook Sharing Debugger), then submit `https://kingprofessionalwelding.com/sitemap.xml`
   in Google Search Console.

## Google reviews

Without configuration, the Reviews section shows buttons to the Google Business Profile
(`https://share.google/l5OmoyoyysSBlC4Nw`). To load live reviews:

1. Google Cloud console (owner's account) › create project › enable **Places API (New)** › billing account required.
2. Create an API key; restrict it to *Places API (New)*. The key is only used on the server.
3. Vercel › Settings › Environment Variables: `GOOGLE_PLACES_API_KEY` (and optionally `GOOGLE_PLACE_ID`;
   if empty, the site finds it by searching the business name and address).
4. Redeploy. Google returns the rating, total count and up to 5 reviews; the page refreshes them every 12 h.

Also: in Google Business Profile, set the website to `https://kingprofessionalwelding.com` and keep
name, phone and address identical to `lib/site.ts`.
