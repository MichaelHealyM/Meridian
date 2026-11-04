import type { APIRoute } from 'astro';
import { absoluteSiteUrl } from '../shared/site-urls';

export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${absoluteSiteUrl('sitemap-index.xml', site)}\n`,
  );
