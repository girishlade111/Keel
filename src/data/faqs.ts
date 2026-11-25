export interface FAQItemData {
  index: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItemData[] = [
  {
    index: '01',
    question: 'What is included in the Keel membership?',
    answer:
      'Your membership brings connected accounts, cards, budgets and goals into one workspace, with planning views, shared access controls and support included.',
  },
  {
    index: '02',
    question: 'Can I connect more than one bank or card?',
    answer:
      'Yes! You can connect multiple bank accounts and payment cards in one place, making it easy to track transactions, monitor balances, and manage your finances.',
  },
  {
    index: '03',
    question: 'How is my financial data protected?',
    answer:
      'Your financial data is protected with secure encryption, strict access controls, and industry-standard security practices to help keep your personal and financial information safe.',
  },
  {
    index: '04',
    question: 'Can I share the workspace with someone else?',
    answer:
      'Yes! You can invite team members or trusted individuals to your workspace and manage their access permissions to ensure everyone can access only the information they need.',
  },
  {
    index: '05',
    question: 'What happens during the 14-day review?',
    answer:
      'During the 14-day review, you can explore your financial activity, review connected accounts, and evaluate how well the platform meets your needs before making a final decision.',
  },
  {
    index: '06',
    question: 'Can I cancel, change billing or update payment?',
    answer:
      'Absolutely! You can cancel your subscription, change your billing plan, or update your payment method at any time through your account settings.',
  },
];
