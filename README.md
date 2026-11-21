# The King of Professional Welding

Bilingual English/Spanish website for a welding business in Katy, Texas.

## Local development

Requires Node.js. The website has no npm dependencies and needs no compilation.

```powershell
npm run check
npm run dev
```

Open http://127.0.0.1:4173 and keep the terminal running during local review.

## Deploy to Vercel

Import this repository into a Vercel project with these settings:

- Framework Preset: Other
- Root Directory: repository root
- Output Directory: dist
- Build Command: none
- Install Command: none

The included vercel.json configures the static output and response headers. Choose a Vercel plan that permits commercial use.

## Files

- dist/index.html: page structure and content
- dist/styles.css, dist/motion.css: responsive styling and motion
- dist/app.js: language switching, navigation and contact interactions
- dist/intro.js, dist/intro.css: introductory welding effect
- dist/assets/: logo, favicon and illustrative images
- scripts/check.mjs: local asset, anchor and business data checks
- scripts/serve.mjs: local development server

## Business contact

The King of Professional Welding

+1 832 732 7616

Thekingofprofessionalwelding@gmail.com

21126 Terrace View Dr, Katy, Texas 77449

## Image provenance

The welding and metalwork photographs are AI-generated illustrations. They are not a portfolio of completed client projects. The website retains an illustration disclosure.

This repository contains the website only. Promotional videos, audio masters, client handover documents and production caches are kept outside the public repository. Brand assets are supplied for this business; this repository does not grant a separate license to reuse its identity.
