export interface PricingFeature {
  name: string;
  available: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
  featured?: boolean;
  buttonLabel: string;
  features: PricingFeature[];
}

const feature = (name: string, available: boolean): PricingFeature => ({
  name,
  available,
});

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "",
    description: "Explore Visl and bring your first ideas to life.",
    buttonLabel: "Start for Free",
    features: [
      feature("Max video length: 30 sec", true),
      feature("Monthly credits: 300", true),
      feature("Video models: Value + Standard", true),
      feature("Image models: 2K", true),
      feature("Max resolution: 480p", true),
      feature("Vibe Edit", false),
      feature("No Watermark", false),
      feature("Priority queue", false),
      feature("Commercial rights", false),
      feature("Team seats: 1", true),
      feature("Credit rollover", false),
      feature("Pay-as-you-go coverage", true),
      feature("Community access", false),
      feature("Parallel videos", false),
    ],
  },

  {
    id: "starter",
    name: "Starter",
    price: "$25",
    period: "/month",
    description: "For creators getting started with AI video.",
    buttonLabel: "Choose Starter",
    features: [
      feature("Max video length: 3 min", true),
      feature("Monthly credits: 2,500", true),
      feature("Video models: Value + Standard + Premium", true),
      feature("Image models: 2K", true),
      feature("Max resolution: 720p", true),
      feature("Vibe Edit", true),
      feature("No Watermark", true),
      feature("Priority queue", false),
      feature("Commercial rights", true),
      feature("Team seats: 1", true),
      feature("Credit rollover", false),
      feature("Pay-as-you-go coverage", true),
      feature("Community access", true),
      feature("Parallel videos", false),
    ],
  },

  {
    id: "creator",
    name: "Creator",
    price: "$60",
    period: "/month",
    description: "For creators producing videos consistently.",
    badge: "Most Popular",
    featured: true,
    buttonLabel: "Choose Creator",
    features: [
      feature("Max video length: 5 min", true),
      feature("Monthly credits: 6,000", true),
      feature("Video models: Value + Standard + Premium", true),
      feature("Image models: All incl.", true),
      feature("Max resolution: 720p + 1080p", true),
      feature("Vibe Edit", true),
      feature("No Watermark", true),
      feature("Priority queue", true),
      feature("Commercial rights", true),
      feature("Team seats: 1", true),
      feature("Credit rollover", true),
      feature("Pay-as-you-go coverage", true),
      feature("Community access", true),
      feature("Parallel videos: 2 videos", true),
    ],
  },

  {
    id: "pro",
    name: "Pro",
    price: "$150",
    period: "/month",
    description: "For professional creators scaling production.",
    buttonLabel: "Choose Pro",
    features: [
      feature("Max video length: 10 min", true),
      feature("Monthly credits: 15,000", true),
      feature("Video models: All incl. Premium", true),
      feature("Image models: All incl.", true),
      feature("Max resolution: 720p + 1080p", true),
      feature("Vibe Edit", true),
      feature("No Watermark", true),
      feature("Priority queue", true),
      feature("Commercial rights", true),
      feature("Team seats: 1", true),
      feature("Credit rollover", true),
      feature("Pay-as-you-go coverage", true),
      feature("Community access", true),
      feature("Parallel videos: 3 videos", true),
    ],
  },

  {
    id: "business",
    name: "Business",
    price: "$250",
    period: "/month",
    description: "For teams and businesses producing at scale.",
    buttonLabel: "Choose Business",
    features: [
      feature("Max video length: 10 min", true),
      feature("Monthly credits: 25,000", true),
      feature("Video models: All incl. Premium", true),
      feature("Image models: All incl.", true),
      feature("Max resolution: 720p + 1080p", true),
      feature("Vibe Edit", true),
      feature("No Watermark", true),
      feature("Priority queue", true),
      feature("Commercial rights", true),
      feature("Team seats: Custom", true),
      feature("Credit rollover", true),
      feature("Pay-as-you-go coverage", true),
      feature("Community access", true),
      feature("Parallel videos: 5 videos", true),
    ],
  },
];