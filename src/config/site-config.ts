export interface SiteConfig {
  companyName: string;
  description: string;
  homePageTitle: string;
  contact: { email: string; phone: string; openingHours: string };
  /** Formspree form id that receives contact messages. */
  contactFormId: string;
  /** Fill in at most one analytics provider; both are cookie-free. */
  analytics: { goatCounterCode: string; cloudflareBeaconToken: string };
}

export const siteConfig: SiteConfig = {
  companyName: 'Meridian Process Controls',
  description:
    'GMP automation and validation for biologics: upstream, downstream and sterile fill-finish.',
  homePageTitle: 'Meridian Process Controls: Automation for Biologics and Fill-Finish',
  contact: {
    email: 'hello@meridian.example',
    phone: '+353 21 000 0000',
    openingHours: 'Mon–Fri 08:00–18:00; 24/7 for support clients',
  },
  contactFormId: 'YOUR_FORM_ID',
  analytics: { goatCounterCode: '', cloudflareBeaconToken: '' },
};
