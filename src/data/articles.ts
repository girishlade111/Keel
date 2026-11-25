export type BlogCategory = 'Guide' | 'Planning' | 'Systems' | 'Saving';

export interface ArticleEntry {
  id: string;
  slug: string;
  title: string;
  category: BlogCategory;
  publicationDate: string;
  shortDate: string;
  readingTime: number;
  featured?: boolean;
  excerpt: string;
  coverImage: string;
  detailImage: string;
  inlineImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  overview: string;
  capabilitiesLead: string;
  capabilities: string[];
  setupLead: string;
  setupSteps: string[];
  security: string;
}

const DEFAULT_BODY = {
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

export const articles: ArticleEntry[] = [
  {
    id: 'more-systems-for-calmer-money',
    slug: 'more-systems-for-calmer-money',
    title: 'More systems for calmer money.',
    category: 'Systems',
    publicationDate: 'March 24, 2026',
    shortDate: 'MAR 24, 2026',
    readingTime: 7,
    featured: true,
    excerpt:
      'Review your finances, adjust your budget, and start every month with a fresh financial perspective.',
    coverImage: '/assets/images/mockups/6ac11b14a9993b2e60818fa5_Frame_202147264056_20_1_-p-1600.avif',
    detailImage: '/assets/images/mockups/6ac11b14a9993b2e60818fa5_Frame_202147264056_20_1_-p-1600.avif',
    inlineImage: '/assets/images/mockups/6ac10ac20b8d723e945c1c97_Rectangle_2034624626.jpg',
    author: {
      name: 'Jonathan',
      role: 'Stable Gain',
      avatar: '/assets/images/blog/6accace6fae7d56f23cd1351_avatar_12_WX_201.png',
    },
    ...DEFAULT_BODY,
  },
  {
    id: 'a-simple-monthly-money-reset',
    slug: 'a-simple-monthly-money-reset',
    title: 'A simple monthly money reset',
    category: 'Guide',
    publicationDate: 'March 24, 2026',
    shortDate: 'MAR 24, 2026',
    readingTime: 14,
    excerpt:
      'Connect every savings goal to something meaningful and track your progress toward what matters most.',
    coverImage: '/assets/images/mockups/6ac0d584da4745a95bd637f7_Images-7.avif',
    detailImage: '/assets/images/mockups/6ac11b03a9993b2e60818d29_Images02-p-1600.avif',
    inlineImage: '/assets/images/mockups/6ac10ac20b8d723e945c1c97_Rectangle_2034624626.jpg',
    author: {
      name: 'Harry',
      role: 'Trade Prism',
      avatar: '/assets/images/blog/6accacdb1efce99d35ed3d09_avatar_11_UV_201.png',
    },
    ...DEFAULT_BODY,
  },
  {
    id: 'give-your-savings-a-purpose',
    slug: 'give-your-savings-a-purpose',
    title: 'Give your savings a purpose',
    category: 'Planning',
    publicationDate: 'October 18, 2026',
    shortDate: 'OCT 18, 2026',
    readingTime: 13,
    excerpt:
      'Set up a simple savings system that helps you save consistently while staying in control of your money.',
    coverImage: '/assets/images/mockups/6ac0d5993b58576098bd777d_Iamges-6.avif',
    detailImage: '/assets/images/mockups/6ac11af593c316415463e198_Images01-p-1600.avif',
    inlineImage: '/assets/images/mockups/6ac10ac20b8d723e945c1c97_Rectangle_2034624626.jpg',
    author: {
      name: 'Gordon',
      role: 'Growth Axis',
      avatar: '/assets/images/blog/6accacce252649e5ea0a0cba_avatar_10_ST_201.png',
    },
    ...DEFAULT_BODY,
  },
  {
    id: 'automate-savings-keep-control',
    slug: 'automate-savings-keep-control',
    title: 'Automate savings, keep control',
    category: 'Systems',
    publicationDate: 'May 11, 2026',
    shortDate: 'MAY 11, 2026',
    readingTime: 12,
    excerpt:
      'Create a realistic financial strategy that balances your income, expenses, savings, and future goals.',
    coverImage: '/assets/images/mockups/6ac0d5ac9465518f1243455b_Images-5.avif',
    detailImage: '/assets/images/mockups/6ac11ae293b442b8281283a7_Images05-p-1600.avif',
    inlineImage: '/assets/images/mockups/6ac10ac20b8d723e945c1c97_Rectangle_2034624626.jpg',
    author: {
      name: 'Evan',
      role: 'Yield Craft',
      avatar: '/assets/images/blog/6accacc4fd7b7753f3c340e7_avatar_09_QR_201.png',
    },
    ...DEFAULT_BODY,
  },
  {
    id: 'build-a-money-plan-that-actually-works',
    slug: 'build-a-money-plan-that-actually-works',
    title: 'Build a money plan that actually works',
    category: 'Planning',
    publicationDate: 'April 8, 2026',
    shortDate: 'APR 8, 2026',
    readingTime: 11,
    excerpt:
      'Build consistent saving habits with a practical approach that makes reaching your financial goals easier.',
    coverImage: '/assets/images/mockups/6ac0d5be1f353525a38ef8e2_Images-4.avif',
    detailImage: '/assets/images/mockups/6ac11ace17c04dbca51f06a1_Images04-p-1600.avif',
    inlineImage: '/assets/images/mockups/6ac10ac20b8d723e945c1c97_Rectangle_2034624626.jpg',
    author: {
      name: 'Edward',
      role: 'Margin Sense',
      avatar: '/assets/images/blog/6accacbbb4f6d0058893d9f9_avatar_08_OP_201.png',
    },
    ...DEFAULT_BODY,
  },
  {
    id: 'make-saving-feel-easier-every-month',
    slug: 'make-saving-feel-easier-every-month',
    title: 'Make saving feel easier every month',
    category: 'Saving',
    publicationDate: 'March 21, 2026',
    shortDate: 'MAR 21, 2026',
    readingTime: 10,
    excerpt:
      'Understand where your money goes and make smarter financial decisions with a simple, organized plan.',
    coverImage: '/assets/images/mockups/6ac0d5d2e892d2d6a149d5b6_Images-3.avif',
    detailImage: '/assets/images/mockups/6ac11a1797510b06fe2acfdf_Images03-p-1600.avif',
    inlineImage: '/assets/images/mockups/6ac10ac20b8d723e945c1c97_Rectangle_2034624626.jpg',
    author: {
      name: 'Dominic',
      role: 'Asset Bloom',
      avatar: '/assets/images/blog/6accacb3c816eb85bb143f0f_avatar_07_MN_201.png',
    },
    ...DEFAULT_BODY,
  },
  {
    id: 'your-guide-to-a-clearer-financial-life',
    slug: 'your-guide-to-a-clearer-financial-life',
    title: 'Your guide to a clearer financial life',
    category: 'Guide',
    publicationDate: 'January 28, 2026',
    shortDate: 'JAN 28, 2026',
    readingTime: 9,
    excerpt:
      'Create a clear monthly budget, organize your expenses, and prepare your money for the month ahead.',
    coverImage: '/assets/images/mockups/6ac0d5e493b442b828062c74_Images-2.avif',
    detailImage: '/assets/images/mockups/6ac11abbbe85aba7df1f0062_Images06-p-1600.avif',
    inlineImage: '/assets/images/mockups/6ac10ac20b8d723e945c1c97_Rectangle_2034624626.jpg',
    author: {
      name: 'Christopher',
      role: 'Trend Quant',
      avatar: '/assets/images/blog/6accaca7f2094eb23a8b943f_avatar_06_KL_201.png',
    },
    ...DEFAULT_BODY,
  },
  {
    id: 'plan-your-month-before-it-starts',
    slug: 'plan-your-month-before-it-starts',
    title: 'Plan your month before it starts',
    category: 'Planning',
    publicationDate: 'February 12, 2026',
    shortDate: 'FEB 12, 2026',
    readingTime: 8,
    excerpt:
      'A short planning habit that shows where your money is going before the month begins, so surprises stay small.',
    coverImage: '/assets/images/mockups/6ac1e445b19cb38afca59680_Tranquil_20Dunes_20Through_20the_20Curve_201.avif',
    detailImage: '/assets/images/mockups/6ac1e4e626a0b23fca296e48_Tranquil_20Dunes_20Through_20the_20Curve_201_20_1_-p-1600.avif',
    inlineImage: '/assets/images/mockups/6ac10ac20b8d723e945c1c97_Rectangle_2034624626.jpg',
    author: {
      name: 'Christian',
      role: 'Equity Shift',
      avatar: '/assets/images/blog/6accac9cfae7d56f23ccc2e8_avatar_05_IJ_201.png',
    },
    overview:
      'A good month starts with a simple plan. By listing your income, fixed bills, and goals before the month begins, you can see how much is left to spend and decide where it should go. Keel pulls your accounts into one view, so planning takes minutes instead of an evening.',
    capabilitiesLead:
      'Keel keeps your balances, bills, and goals in one place so every decision starts from an accurate picture.',
    capabilities: [
      'Set a target for each category and adjust it as your month unfolds.',
      'See what is due in the next few weeks so nothing catches you off guard.',
      'Reserve money for savings goals before everyday spending begins.',
    ],
    setupLead:
      "Open your plan at the start of each month, review last month's spending, and set targets for the weeks ahead. Keel carries over your categories so each new plan takes only a few minutes.",
    setupSteps: [
      "Look back at last month's income and spending.",
      'Give every part of your income a clear job.',
      'Revisit your plan weekly and adjust where needed.',
    ],
    security:
      'Your plan and account data are protected with encryption and secure connections. Only you decide who can view or edit your budget.',
  },
  {
    id: 'set-spending-limits-that-stick',
    slug: 'set-spending-limits-that-stick',
    title: 'Set spending limits that stick',
    category: 'Planning',
    publicationDate: 'June 3, 2026',
    shortDate: 'JUN 3, 2026',
    readingTime: 6,
    excerpt:
      'Practical ways to choose category limits you can actually keep, and what to do when a month does not go to plan.',
    coverImage: '/assets/images/mockups/6ac1e438229fac8fa42ca551_Serene_20Seascape_20Sunset_201.avif',
    detailImage: '/assets/images/mockups/6ac1e4f812cb625849c48aae_Serene_20Seascape_20Sunset_201_20_1_-p-1600.avif',
    inlineImage: '/assets/images/mockups/6ac10ac20b8d723e945c1c97_Rectangle_2034624626.jpg',
    author: {
      name: 'Charles',
      role: 'Capital Vector',
      avatar: '/assets/images/blog/6accac9131ce4c749a2ce393_avatar_04_GH_201.png',
    },
    overview:
      'Spending limits work best when they match real life. Instead of copying a generic rule, start from what you actually spend, then tighten one category at a time. Keel shows progress as you go, so a limit feels like a guide rather than a restriction.',
    capabilitiesLead:
      'Keel tracks each category automatically, so you always know how much room is left without doing any math.',
    capabilities: [
      'Set a monthly cap for groceries, transport, dining, and more.',
      'Get a gentle heads-up as you approach a limit.',
      'Move unused money into the next month or into savings.',
    ],
    setupLead:
      'Begin with the two or three categories that vary the most. Set a limit slightly below your recent average, then review it after a month and adjust.',
    setupSteps: [
      'Check your average spending in each category.',
      'Set a realistic cap for the categories you want to improve.',
      'Review monthly and change limits as your needs shift.',
    ],
    security:
      'Keel reads your transactions through secure, read-only connections. Your limits and spending data stay private to you.',
  },
  {
    id: 'save-a-little-every-single-week',
    slug: 'save-a-little-every-single-week',
    title: 'Save a little, every single week',
    category: 'Saving',
    publicationDate: 'July 15, 2026',
    shortDate: 'JUL 15, 2026',
    readingTime: 5,
    excerpt:
      'Small, regular transfers add up faster than you expect. Here is how to make weekly saving feel effortless.',
    coverImage: '/assets/images/mockups/6ac1e42b5f590dd7a87248a9_Abstract_20Serenity_201.avif',
    detailImage: '/assets/images/mockups/6ac1e510f851c777cc3d68c4_Abstract_20Serenity_201_20_1_-p-1600.avif',
    inlineImage: '/assets/images/mockups/6ac10ac20b8d723e945c1c97_Rectangle_2034624626.jpg',
    author: {
      name: 'Cameron',
      role: 'Ledger Flow',
      avatar: '/assets/images/blog/6accac875ed8eae53b8afe03_avatar_03_EF_201.png',
    },
    overview:
      'Saving does not need a big decision each time. A small amount moved every week builds a steady habit, and the balance grows without much effort. Keel makes it easy to set an amount, pick a day, and let it run.',
    capabilitiesLead: 'Keel handles the routine so you can focus on what the savings are for.',
    capabilities: [
      'Schedule a fixed amount to move into savings on the day you choose.',
      'Turn everyday purchases into small contributions toward your goals.',
      'Watch your balance grow and see how close each goal is.',
    ],
    setupLead:
      'Choose an amount that feels almost too small, then schedule it for the day after you get paid. Increase it gradually once the habit feels natural.',
    setupSteps: [
      'Pick a weekly amount you will barely notice.',
      'Set the transfer to run automatically.',
      'Raise the amount a little every few months.',
    ],
    security:
      'Transfers use secure connections and you stay in control. You can pause or change a schedule at any time.',
  },
  {
    id: 'build-an-emergency-fund-step-by-step',
    slug: 'build-an-emergency-fund-step-by-step',
    title: 'Build an emergency fund step by step',
    category: 'Saving',
    publicationDate: 'August 20, 2026',
    shortDate: 'AUG 20, 2026',
    readingTime: 4,
    excerpt:
      'A clear, staged approach to building a safety net, starting with a small first target you can reach this month.',
    coverImage: '/assets/images/mockups/6ac1e41b4ddeb2f1f2e4fde1_Tranquil_20Sunset_20Sky_201.avif',
    detailImage: '/assets/images/mockups/6ac1e51cb7ba21addfe4d8c3_Tranquil_20Sunset_20Sky_201_20_1_-p-1600.avif',
    inlineImage: '/assets/images/mockups/6ac10ac20b8d723e945c1c97_Rectangle_2034624626.jpg',
    author: {
      name: 'Brian',
      role: 'Trade Sync',
      avatar: '/assets/images/blog/6accac79e2de1966e9159951_avatar_02_CD_201.png',
    },
    overview:
      'An emergency fund gives you room to handle surprises without stress. The goal can feel large, so it helps to break it into stages: a first small cushion, then one month of expenses, then several months. Keel tracks each stage so you can see real progress.',
    capabilitiesLead:
      'Keel keeps your emergency savings separate and visible, so it stays protected from everyday spending.',
    capabilities: [
      'Set milestones and celebrate each one as you reach it.',
      'Keep emergency money apart from your spending balance.',
      'See what one month of essentials costs to size your target.',
    ],
    setupLead:
      'Create an emergency goal, choose your first milestone, and connect a regular contribution. Review the target each quarter as your expenses change.',
    setupSteps: [
      'Aim for a first cushion you can reach quickly.',
      'Add a regular contribution to your goal.',
      'Move toward a full month, then several months of expenses.',
    ],
    security:
      'Your goals and balances are protected with encryption and strict access controls, and only you can see them.',
  },
  {
    id: 'a-beginners-guide-to-shared-budgets',
    slug: 'a-beginners-guide-to-shared-budgets',
    title: "A beginner's guide to shared budgets",
    category: 'Guide',
    publicationDate: 'September 10, 2026',
    shortDate: 'SEP 10, 2026',
    readingTime: 3,
    excerpt:
      'How to manage money together with a partner, family, or housemate without losing clarity or privacy.',
    coverImage: '/assets/images/backgrounds/6ac1e53569495e83dbee2fde_Abstract_20Gradient_20Composition_201.avif',
    detailImage: '/assets/images/backgrounds/6ac1e53c07d71f83c6a81563_Abstract_20Gradient_20Composition_201_20_1_-p-1600.avif',
    inlineImage: '/assets/images/mockups/6ac10ac20b8d723e945c1c97_Rectangle_2034624626.jpg',
    author: {
      name: 'Benjamin',
      role: 'Market Pulse',
      avatar: '/assets/images/blog/6accac6c33e846e23ba8cd06_avatar_01_AB_201.png',
    },
    overview:
      'Sharing a budget works best when everyone can see the same picture and knows what they are responsible for. Agree on shared goals, decide what stays private, and check in regularly. Keel gives each person the right level of access in one workspace.',
    capabilitiesLead:
      'Keel keeps shared spending visible without exposing anything you want to keep to yourself.',
    capabilities: [
      'Invite others to view or manage joint accounts and budgets.',
      'Choose which accounts are visible to the group.',
      'Work toward a trip, a home, or a bill together and track it as a team.',
    ],
    setupLead:
      'Create a shared workspace, invite the people you manage money with, and decide which accounts to include. Set a regular time to review together.',
    setupSteps: [
      'Add the people you share finances with.',
      'Choose which accounts and budgets everyone can see.',
      'Check in together on a regular schedule.',
    ],
    security:
      'Access controls let you decide exactly who can view or edit each account, and you can change permissions at any time.',
  },
  {
    id: 'one-dashboard-for-every-account',
    slug: 'one-dashboard-for-every-account',
    title: 'One dashboard for every account',
    category: 'Systems',
    publicationDate: 'September 24, 2026',
    shortDate: 'SEP 24, 2026',
    readingTime: 7,
    excerpt:
      'Bring every bank, card, and savings account into one clear view and spend less time switching between apps.',
    coverImage: '/assets/images/backgrounds/6ac1e3f9bd8805a8063c1b90_Abstract_20Green_20Motion_20Blur_201.avif',
    detailImage: '/assets/images/backgrounds/6ac1e54fae695e637c928d6e_Abstract_20Green_20Motion_20Blur_201_20_1_-p-1600.avif',
    inlineImage: '/assets/images/mockups/6ac10ac20b8d723e945c1c97_Rectangle_2034624626.jpg',
    author: {
      name: 'Daniel Siemon',
      role: 'Finance Editor',
      avatar: '/assets/images/blog/6accac607098a7afca66b547_avatar_15_DE_201.png',
    },
    overview:
      'When your money lives in several places, it is hard to see the whole picture. A single dashboard brings balances, transactions, and goals together so you can understand where you stand at a glance. Keel keeps everything up to date automatically.',
    capabilitiesLead:
      'Keel connects your accounts and organizes them so your finances feel simple instead of scattered.',
    capabilities: [
      'Link banks, cards, and savings in one workspace.',
      'Transactions are sorted for you, so trends are easy to spot.',
      'See balances, spending, and goals on a single screen.',
    ],
    setupLead:
      'Connect your first account, add the others, and let Keel organize your history. Your dashboard is ready within minutes and stays current on its own.',
    setupSteps: [
      'Link your first account securely.',
      'Bring in the rest of your cards and savings.',
      'Use your dashboard to understand spending and progress.',
    ],
    security:
      'Connections are encrypted and read-only, and your data is never shared without your permission.',
  },
];

export const featuredArticle = articles[0];
export const catalogArticles = articles.slice(1); // 12 articles matching ALL / 12
