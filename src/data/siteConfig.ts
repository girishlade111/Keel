export interface NavLinkItem {
  label: string;
  to: string;
}

export const siteConfig = {
  brandName: 'Keel',
  tagline: 'A calmer system for spending, saving, and moving forward.',
  copyright: '© 2026 Keel. All Rights Reserved.',
  demoMode: import.meta.env.VITE_DEMO_MODE !== 'false',
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',
  newsletterEndpoint: import.meta.env.VITE_NEWSLETTER_ENDPOINT || '',
  primaryCtaHref: '/contact',
  primaryCtaLabel: 'Get Started',
  headerLogo: '/assets/brand/6ae0ebcf933a9a576be73091_Header-Logo-Keel.svg',
  footerLogo: '/assets/brand/6ae0ebd0ed3b32a4c2c1a959_Footer-Logo-Keel.svg',
  favicon: '/assets/brand/6ab10a7422f62c88a7d39214_Favicon.png',
  ogImage: '/assets/brand/6ae0f572ba6a86af55b4d61f_keel-og-thumbnail.jpg',
  contact: {
    email: 'hello@keel.com',
    phone: '+1 (415) 555-0148',
    phoneHref: 'tel:+14155550148',
    addressLine1: '128 Market Street San',
    addressLine2: 'Francisco, CA 94105, US',
    workingHours: 'Mon – Fri · 9:00 AM – 6:00 PM Sat · 10:00 AM – 2:00 PM',
  },
  headerNav: [
    { label: 'About', to: '/about-us' },
    { label: 'Features', to: '/features' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Insights', to: '/blogs' },
  ] as NavLinkItem[],
  allPagesDropdown: {
    pages: [
      { label: 'About', to: '/about-us' },
      { label: 'Features', to: '/features' },
      { label: 'Blog', to: '/blogs' },
      { label: 'Blog - Detail', to: '/blog/more-systems-for-calmer-money' },
      { label: 'Contact', to: '/contact' },
      { label: 'Integration', to: '/integration' },
      { label: 'Integration - Detail', to: '/integrations/novi-bank' },
    ],
    utilities: [
      { label: '404', to: '/404' },
      { label: 'License', to: '/licenses' },
      { label: 'Instructions', to: '/instructions' },
      { label: 'Changelog', to: '/changelog' },
      { label: 'Style Guide', to: '/style-guide' },
    ],
  },
  footerNav: {
    product: [
      { label: 'Home', to: '/' },
      { label: 'Features', to: '/features' },
      { label: 'Pricing', to: '/pricing' },
    ],
    company: [
      { label: 'About', to: '/about-us' },
      { label: 'Insights', to: '/blogs' },
      { label: 'Contact', to: '/contact' },
    ],
    utility: [
      { label: 'License', to: '/licenses' },
      { label: 'Changelog', to: '/changelog' },
      { label: '404', to: '/404' },
    ],
  },
  socials: [
    {
      name: 'X',
      href: 'https://x.com',
      icon: '/assets/icons/6ab90a697e32879b45716211_Vector.svg',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: '/assets/icons/6ab9097f29d6018592ed58e0_Vector.svg',
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: '/assets/icons/6ab90959310af94e01a467b8_Vector.svg',
    },
  ],
};
