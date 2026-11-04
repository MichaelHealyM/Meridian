const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Path to a page or anchor on this site, including the GitHub Pages base path. */
export const sitePath = (relativePath = ''): string => `${basePath}/${relativePath}`;

export const absoluteSiteUrl = (relativePath: string, origin: URL | undefined): string =>
  new URL(sitePath(relativePath), origin ?? 'http://localhost').href;
