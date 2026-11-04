import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

export interface PageSectionManifest {
  id: string;
  /** Shown in the site navigation. Leave out to keep the section off the menu. */
  navigationLabel?: string;
  component: AstroComponentFactory;
}

export interface SectionProps {
  id: string;
}
