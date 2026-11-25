export interface IntegrationEntry {
  id: string;
  slug: string;
  name: string;
  logo: string;
  description: string;
  overview: string;
  capabilitiesLead: string;
  capabilities: string[];
  setupLead: string;
  setupSteps: string[];
  security: string;
  relatedSlugs: string[];
}

const SHARED_CONTENT = {
  overview:
    'Keel brings your financial accounts, transactions, spending, and savings activity together in one connected workspace. By keeping your financial information organized and up to date, Keel makes it easier to understand where your money goes, stay on top of everyday finances, and make more confident decisions.',
  capabilitiesLead:
    'Keel keeps your financial life connected so you can spend less time checking different accounts and more time making informed decisions about your money.',
  capabilities: [
    'Keep balances and financial activity up to date across your connected accounts.',
    'Organize your transactions automatically so every purchase is easy to understand.',
    'See your accounts, spending, budgets, and savings goals from one place.',
  ],
  setupLead:
    'Getting started with Keel is simple. Choose the financial account you want to connect, follow the secure connection process, and let Keel bring your information into one organized view. Once connected, your financial activity is automatically synced and organized, so you can start tracking your money without manual data entry.',
  setupSteps: [
    'Choose an account and securely connect it to Keel.',
    'Let Keel automatically bring in your balances and transactions.',
    'Explore your spending, budgets, savings, and financial progress in one place.',
  ],
  security:
    'Security is built into every part of the Keel experience. Your financial information is protected through secure connections and encryption, while access controls help ensure your data remains private and protected. Keel is designed to give you greater visibility into your finances without compromising the security of the information.',
};

export const integrations: IntegrationEntry[] = [
  {
    id: 'novi-bank',
    slug: 'novi-bank',
    name: 'Novi Bank',
    logo: '/assets/brand/6ac1fa6184e660d196a36b0c_logo-01.svg',
    description: 'Connect your accounts and keep balances and transactions in sync.',
    ...SHARED_CONTENT,
    relatedSlugs: ['verapay', 'milo-finance', 'northline'],
  },
  {
    id: 'verapay',
    slug: 'verapay',
    name: 'VeraPay',
    logo: '/assets/brand/6ac1fa5684e660d196a36a9e_Logo-02.svg',
    description: 'Bring your everyday banking activity into one clear financial view.',
    ...SHARED_CONTENT,
    relatedSlugs: ['novi-bank', 'milo-finance', 'paya'],
  },
  {
    id: 'milo-finance',
    slug: 'milo-finance',
    name: 'Milo Finance',
    logo: '/assets/brand/6ac1fa4d0b8d723e9479bfd1_Logo-03.svg',
    description: 'Track balances, spending, and account activity without switching apps.',
    ...SHARED_CONTENT,
    relatedSlugs: ['novi-bank', 'verapay', 'northline'],
  },
  {
    id: 'northline',
    slug: 'northline',
    name: 'Northline',
    logo: '/assets/brand/6ac1fa44da4745a95bfb90c4_Logo-04.svg',
    description: 'Keep cards, transactions, and spending activity connected in Keel.',
    ...SHARED_CONTENT,
    relatedSlugs: ['paya', 'luma-invest', 'oakline'],
  },
  {
    id: 'paya',
    slug: 'paya',
    name: 'Paya',
    logo: '/assets/brand/6ac1fa39fe6dc3467a6f1be0_Logo-05.svg',
    description: 'Monitor card spending and stay on top of your monthly activity.',
    ...SHARED_CONTENT,
    relatedSlugs: ['northline', 'verapay', 'clover-money'],
  },
  {
    id: 'luma-invest',
    slug: 'luma-invest',
    name: 'Luma Invest',
    logo: '/assets/brand/6ac1fa2ed95a8b30194c8560_Logo-06.svg',
    description: 'Track payments and transactions alongside your everyday finances.',
    ...SHARED_CONTENT,
    relatedSlugs: ['oakline', 'arcus', 'novi-bank'],
  },
  {
    id: 'oakline',
    slug: 'oakline',
    name: 'Oakline',
    logo: '/assets/brand/6ac1fa2297510b06fe42e269_Logo-07.svg',
    description: 'Connect your investments and keep your financial picture up to date.',
    ...SHARED_CONTENT,
    relatedSlugs: ['luma-invest', 'arcus', 'milo-finance'],
  },
  {
    id: 'clover-money',
    slug: 'clover-money',
    name: 'Clover Money',
    logo: '/assets/brand/6ac1fa18e9044de04900804b_Logo-8.svg',
    description: 'Keep everyday payments and transfers visible in one place.',
    ...SHARED_CONTENT,
    relatedSlugs: ['paya', 'arcus', 'verapay'],
  },
  {
    id: 'arcus',
    slug: 'arcus',
    name: 'Arcus',
    logo: '/assets/brand/6ac1fa090540c28c8cb165bc_Logo-09.svg',
    description: 'Bring investment accounts together with your broader financial plan.',
    ...SHARED_CONTENT,
    relatedSlugs: ['oakline', 'luma-invest', 'clover-money'],
  },
];
