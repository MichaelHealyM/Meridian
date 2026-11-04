# Meridian Process Controls website

Marketing site for a biologics automation company: upstream, downstream and fill-finish.
Built with [Astro](https://astro.build), Bootstrap 5 and TypeScript. Deployed to GitHub Pages.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
```

| Command             | Purpose                               |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Local development server              |
| `npm run build`     | Production build into `dist/`         |
| `npm run preview`   | Serve the production build            |
| `npm run typecheck` | Type-check TypeScript and Astro files |
| `npm run format`    | Format all files with Prettier        |

## Architecture

Every page section is a self-contained folder. Its markup, copy, styles and scripts live together, so a
section can be removed without touching the rest of the site.

```
src/
  config/       site-config.ts (company details) and page-sections.ts (page composition)
  layout/       base layout, header, footer, SEO tags
  sections/     one folder per page section (hero, capabilities, live-demos, ...)
  features/     behaviour shared by several sections (contact, detail modal, batch simulation, theme)
  shared/       helpers and components with no business content
  styles/       Bootstrap theme variables and global styles
  pages/        routes: home, privacy, 404, robots.txt
```

A section folder holds `index.ts` (its id and menu label), `<Name>Section.astro`, `content.ts` (typed copy),
and optionally CSS and `*.client.ts` scripts. Content is edited in `content.ts`, never in markup.

## Add or remove a section

- **Remove:** delete its folder and its line in `src/config/page-sections.ts`. The menu updates itself.
- **Add:** copy a similar section folder, edit it, and add its manifest to `page-sections.ts`.
- **Reorder:** move the line in `page-sections.ts`.

Some blocks are used elsewhere. Check before removing:

| Block                                   | Used by                                     |
| --------------------------------------- | ------------------------------------------- |
| `features/contact`                      | header, hero, contact section, detail modal |
| `features/detail-modal`                 | capabilities, projects                      |
| `features/batch-simulation`             | hero, live-demos (batch tab)                |
| `sections/live-demos` (id `live-demos`) | hero button links to it                     |

## Before launch

1. In `src/config/site-config.ts`: set the company details, the Formspree `contactFormId`, and one analytics code.
2. Replace placeholder copy in each section's `content.ts`, the privacy text and `public/og.png`.
3. In GitHub: Settings, Pages, Source: GitHub Actions. Push to `main` to deploy.
4. Custom domain (optional): add a repository variable `SITE_URL` (for example `https://www.example.com`).

The site address and base path are derived from the repository name during the GitHub build, so no
configuration change is needed for a standard `https://<user>.github.io/<repo>/` deployment.

## Quality checks

Pull requests run formatting, type checks and a production build (`.github/workflows/ci.yml`).
