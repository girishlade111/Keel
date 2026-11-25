export interface TeamMember {
  department: string;
  name: string;
  role: string;
  image: string;
}

export interface TestimonialItem {
  index: string;
  quote: string;
  name: string;
  tenure: string;
  goal: string;
  portrait: string;
  avatar: string;
}

export const teamMembers: TeamMember[] = [
  {
    department: 'FOUNDATION',
    name: 'Ethan Brooks',
    role: 'Co-Founder & CEO',
    image: '/assets/images/mockups/6abbc7ef05967b9c873adb38_Liam_20Carter.avif',
  },
  {
    department: 'PRODUCT',
    name: 'Daniel Carter',
    role: 'Head of Product',
    image: '/assets/images/mockups/6abbd40a14686f8ea470d5df_Liam_20Carter.avif',
  },
  {
    department: 'ENGINEERING',
    name: 'Ryan Mitchell',
    role: 'Lead Software Engineer',
    image: '/assets/images/mockups/6abbd4873e76c0cac5a49195_Liam_20Carter.avif',
  },
  {
    department: 'DESIGN',
    name: 'Lucas Bennett',
    role: 'Product Designer',
    image: '/assets/images/mockups/6abbd4de616a51398b0c750e_Liam_20Carter.avif',
  },
  {
    department: 'DATA',
    name: 'Noah Anderson',
    role: 'Data & Insights Lead',
    image: '/assets/images/mockups/6abbd52efc9c48d08fbe9f16_Liam_20Carter.avif',
  },
  {
    department: 'GROWTH',
    name: 'James Wilson',
    role: 'Growth Manager',
    image: '/assets/images/mockups/6abbd5b72d6319c594667bc9_Liam_20Carter.avif',
  },
  {
    department: 'SECURITY',
    name: 'Oliver Hayes',
    role: 'Security Engineer',
    image: '/assets/images/mockups/6abbd61320b1020e328033cb_Liam_20Carter.avif',
  },
];

export const testimonials: TestimonialItem[] = [
  {
    index: '01',
    quote:
      'Keel gave me a completely different view of my money. I can finally see where I’m spending, stay on budget, and make better decisions without constantly checking different apps.',
    name: 'Daniel Carter',
    tenure: 'Keel user · 14 months',
    goal: 'Goal: Build his first emergency fund',
    portrait: '/assets/images/mockups/6ab5277713bf0988083fb809_Jordan_20Reed.avif',
    avatar: '/assets/images/mockups/6ab52dffb679ad549229a07c_Frame_202147263910.avif',
  },
  {
    index: '02',
    quote:
      'Keel made managing my money feel much less overwhelming. I can see my spending, savings, and upcoming payments in one place, so I know exactly where I stand without having to piece everything together myself.',
    name: 'John Bennett',
    tenure: 'Keel user · 9 months',
    goal: 'Goal: Save for his first home',
    portrait: '/assets/images/mockups/6ab75bb5f1de06999fae67e4_Jordan_20Reed.avif',
    avatar: '/assets/images/mockups/6ab52dfe4ca352f45408458a_Frame_202147263909.avif',
  },
  {
    index: '03',
    quote:
      'I used to check multiple accounts just to understand how much I could actually spend. Keel brings everything together and makes it much easier to stay within my budget.',
    name: 'Ethan Brooks',
    tenure: 'Keel user · 18 months',
    goal: 'Goal: Build a six-month savings cushion',
    portrait: '/assets/images/mockups/6ab75b902b179a49d00cb509_Jordan_20Reed.avif',
    avatar: '/assets/images/testimonials/6ab7593db39946ad137f1d82_Avatar.avif',
  },
];

export const partnerLogosRowOne = [
  '/assets/brand/6abbbbc737c393decafeadc0_Logo_20_7_.svg',
  '/assets/brand/6abbbbc97ec426ac1d7078e5_Logo_20_6_.svg',
  '/assets/images/mockups/6abbbbc778991f347581959a_Frame.svg',
  '/assets/images/mockups/6abbbbc75a8c8cd4e0479232_Frame_20_1_.svg',
  '/assets/brand/6abbbbc754e12a0c98358e7f_Logo_20_8_.svg',
];

export const partnerLogosRowTwo = [
  '/assets/brand/6abbbbc754e12a0c98358e7f_Logo_20_8_.svg',
  '/assets/brand/6abbbbc41d6fa901e5c145fa_Logo_20_9_.svg',
  '/assets/brand/6abbbbc49635fc68b9affe20_Logo_20_10_.svg',
  '/assets/brand/6abbbbc5c351def9fd622a31_Logo_20_11_.svg',
  '/assets/brand/6abbbbc42d01b324cc58817c_Logo_20_12_.svg',
];
