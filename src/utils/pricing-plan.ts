export type Pricing = {
  id: string;
  name: string;
  description: string;
  price: number;
  items: string[];
  paymentLink: string;
  priceId: string;
};

export const pricingPlans: Pricing[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for occasional use",
    price: 9,
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    paymentLink: "https://buy.stripe.com/test_aEUeXn5yG1FN8Xm288",
    priceId: "price_1R7VRpGhLML6jADdzmofJNHV",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals and teams",
    price: 19,
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    paymentLink: "https://buy.stripe.com/test_4gwbLbaT00BJ0qQaEF",
    priceId: "price_1R7VQFGhLML6jADdACCymd1Y",
  },
];
