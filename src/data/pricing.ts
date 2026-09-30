export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  disabledFeatures?: string[];
  featured?: boolean;
  badge?: string;
  buttonLabel: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    description:
      "For creators who want to try before committing. Full quality, limited volume.",
    features: [
      "3 videos per month",
      "Up to 3 minutes per video",
      "HD download",
      "All visual styles",
    ],
    disabledFeatures: [
      "Priority generation",
      "Custom voice upload",
      "Multi-language dubbing",
    ],
    buttonLabel: "Start for free",
  },

  {
    id: "basic",
    name: "Basic",
    price: "₹499",
    period: "/month",
    description:
      "For creators ready to make more videos without a large commitment.",
    features: [
      "10 videos per month",
      "Up to 5 minutes per video",
      "HD download",
      "All visual styles",
    ],
    buttonLabel: "Get Basic",
  },

  {
    id: "creator",
    name: "Creator",
    price: "₹999",
    period: "/month",
    description:
      "For creators publishing consistently. Everything you need to build an audience.",
    features: [
      "25 videos per month",
      "Up to 8 minutes per video",
      "HD download + 4K upgrade",
      "Priority generation queue",
      "Custom voice upload",
      "Subtitles in 12 languages",
    ],
    disabledFeatures: [
      "Multi-language dubbing",
    ],
    featured: true,
    badge: "Most popular",
    buttonLabel: "Get Creator",
  },

  {
    id: "pro",
    name: "Pro",
    price: "₹2,999",
    period: "/month",
    description:
      "For studios and serious creators shipping multiple series simultaneously.",
    features: [
      "Unlimited videos",
      "Up to 15 minutes per video",
      "4K download",
      "Instant generation",
      "Multi-language dubbing",
      "API access",
      "Dedicated support",
    ],
    buttonLabel: "Get Pro",
  },

  {
    id: "studio",
    name: "Studio",
    price: "Custom",
    description:
      "For teams and production studios creating at scale with advanced needs.",
    features: [
      "Custom video volume",
      "Advanced generation limits",
      "4K production",
      "Team workflows",
      "API access",
      "Dedicated support",
      "Custom solutions",
    ],
    buttonLabel: "Contact us",
  },
];