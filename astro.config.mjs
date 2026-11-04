import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * GitHub Pages serves a project site from /<repository>/, a user site from /, and a custom
 * domain from /. In GitHub Actions we derive this from the repository name, so no manual edit
 * is needed. Set the repository variable SITE_URL to use a custom domain.
 */
function resolveDeployment() {
  if (!process.env.GITHUB_ACTIONS) return { site: 'http://localhost:4321', base: '/' };
  if (process.env.SITE_URL) return { site: process.env.SITE_URL, base: '/' };

  const [owner, repository] = process.env.GITHUB_REPOSITORY.split('/');
  const isUserSite = repository === `${owner}.github.io`;
  return { site: `https://${owner}.github.io`, base: isUserSite ? '/' : `/${repository}` };
}

export default defineConfig({
  ...resolveDeployment(),
  integrations: [sitemap()],
  vite: {
    css: {
      preprocessorOptions: {
        // Bootstrap 5 still uses Sass features that newer Sass versions warn about
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import', 'color-functions', 'global-builtin'],
        },
      },
    },
  },
});
