import type {MetadataRoute} from 'next';
import {site} from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {'en-US': `${site.url}/`, 'es-US': `${site.url}/es`, 'x-default': `${site.url}/`};
  return [
    {url: `${site.url}/`, changeFrequency: 'monthly', priority: 1, alternates: {languages}, images: [`${site.url}/og-image.jpg`]},
    {url: `${site.url}/es`, changeFrequency: 'monthly', priority: 0.9, alternates: {languages}, images: [`${site.url}/og-image.jpg`]},
  ];
}
