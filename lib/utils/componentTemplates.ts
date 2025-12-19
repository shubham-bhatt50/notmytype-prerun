import { ComponentTemplate } from "@/types/pairing";

export const componentTemplates: ComponentTemplate[] = [
  {
    id: "product-card",
    name: "Product Card",
    content: {
      heading: "Wireless Headphones",
      price: "$199.99",
      body: "Premium sound quality with active noise cancellation. Perfect for music lovers and professionals.",
      button: "Add to Cart",
      badge: "Bestseller",
    },
  },
  {
    id: "blog-card",
    name: "Blog Post Card",
    content: {
      heading: "The Future of Design Systems",
      body: "Exploring how modern teams are building scalable design systems that adapt to changing needs and technologies.",
      meta: "Jane Doe • 5 min read",
      tag: "Design",
    },
  },
  {
    id: "hero",
    name: "Landing Page Hero",
    content: {
      heading: "Transform Your Digital Experience",
      subheading: "Build beautiful, responsive interfaces with confidence",
      body: "Join thousands of designers and developers creating exceptional user experiences with our comprehensive design tools.",
      button: "Get Started Free",
    },
  },
  {
    id: "testimonial",
    name: "Testimonial Card",
    content: {
      quote: "This tool has completely transformed how we approach typography in our projects. The validation system catches issues we would have missed.",
      name: "Sarah Chen",
      title: "Lead Designer at TechCorp",
    },
  },
  {
    id: "pricing",
    name: "Pricing Table",
    content: {
      plan: "Professional",
      price: "$29",
      period: "/month",
      features: [
        "Unlimited font pairings",
        "Component previews",
        "Export to Figma",
        "Priority support",
      ],
      button: "Start Free Trial",
    },
  },
  {
    id: "mobile-app",
    name: "Mobile App Screen",
    content: {
      header: "Dashboard",
      nav: "Home • Explore • Profile",
      cardTitle: "Recent Activity",
      cardContent: "You've completed 12 typography pairings this week",
      action: "View All",
    },
  },
];

export const getComponentTemplate = (id: string): ComponentTemplate | undefined => {
  return componentTemplates.find((template) => template.id === id);
};

