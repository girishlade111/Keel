export interface PlanFeatureRow {
  label: string;
  essential: string | boolean;
  plus: string | boolean;
}

export interface PricingPlan {
  id: 'essential' | 'plus';
  name: string;
  badge: string;
  description: string;
  monthlyPrice: number;
  yearlyMonthlyPrice: number;
  yearlyBilledTotal: number;
  monthlySavingsLabel: string;
  yearlySavingsLabel: string;
  cardArtwork: string;
  features: string[];
  ctaUrl: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'essential',
    name: 'KEEL ESSENTIAL',
    badge: 'Starter Plan',
    description: 'Track your money, manage spending, and build healthy financial habits.',
    monthlyPrice: 16.0,
    yearlyMonthlyPrice: 13.33,
    yearlyBilledTotal: 160.0,
    monthlySavingsLabel: 'Saved $52.',
    yearlySavingsLabel: 'Saved $50.',
    cardArtwork: '/assets/brand/6ae0f02ee4f58cb0a5936bd1_keel-pricing-essential.avif',
    features: [
      'Connect up to 3 accounts',
      'Spending overview',
      'Transaction tracking',
      'Monthly financial summary',
    ],
    ctaUrl: '/contact',
  },
  {
    id: 'plus',
    name: 'KEEL PLUS',
    badge: 'Most Popular',
    description: 'Unlock advanced insights, and smarter tools for long-term financial planning.',
    monthlyPrice: 24.0,
    yearlyMonthlyPrice: 30.0,
    yearlyBilledTotal: 240.0,
    monthlySavingsLabel: 'Saved $48.',
    yearlySavingsLabel: 'Saved $38.',
    cardArtwork: '/assets/brand/6ae0f02f88a5d1d4fc096b43_keel-pricing-plus.avif',
    features: [
      'Unlimited accounts',
      'Advanced spending insights',
      'Financial progress tracking',
      'Smart spending alerts',
    ],
    ctaUrl: '/contact',
  },
];

export const pricingComparisonRows: PlanFeatureRow[] = [
  {
    label: 'Best For',
    essential: 'Everyday money management',
    plus: 'Deeper financial planning',
  },
  {
    label: 'Connected Accounts',
    essential: 'Up to 3 accounts',
    plus: 'Unlimited accounts',
  },
  {
    label: 'Spending Overview',
    essential: true,
    plus: true,
  },
  {
    label: 'Budgeting Tools',
    essential: 'Basic budgets',
    plus: 'Advanced budgets',
  },
  {
    label: 'Savings Goals',
    essential: 'Up to 3 goals',
    plus: 'Unlimited goals',
  },
  {
    label: 'Financial Insights',
    essential: 'Monthly insights',
    plus: 'Advanced insights & trends',
  },
  {
    label: 'Spending Alerts',
    essential: false,
    plus: true,
  },
  {
    label: 'Custom Categories',
    essential: false,
    plus: true,
  },
  {
    label: 'Financial Progress',
    essential: 'Basic tracking',
    plus: 'Detailed progress tracking',
  },
];
