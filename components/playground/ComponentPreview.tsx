"use client";

import { FontPairing } from "@/types/pairing";
import { getComponentTemplate } from "@/lib/utils/componentTemplates";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";

interface ComponentPreviewProps {
  pairing: FontPairing;
  componentId: string;
  theme: "light" | "dark";
  viewport?: "mobile" | "desktop";
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  pairing,
  componentId,
  theme,
  viewport = "desktop",
}) => {
  const template = getComponentTemplate(componentId);
  if (!template) return null;

  const bgColor = theme === "light" ? "bg-white" : "bg-neutral-900";
  const textColor = theme === "light" ? "text-neutral-900" : "text-neutral-100";
  const borderColor = theme === "light" ? "border-neutral-200" : "border-neutral-700";

  const renderComponent = () => {
    switch (componentId) {
      case "product-card":
        return (
          <Card className={`p-6 ${bgColor} ${textColor} ${borderColor} border`}>
            <div className="mb-4">
              <span className="px-2 py-1 text-xs rounded bg-primary-100 text-primary-700">
                {template.content.badge as string}
              </span>
            </div>
            <h3
              className="text-2xl font-bold mb-2"
              style={{
                fontFamily: `'${pairing.primary.family}', sans-serif`,
                fontWeight: pairing.primary.weight || 700,
              }}
            >
              {template.content.heading as string}
            </h3>
            <p
              className="text-3xl font-bold text-primary-500 mb-3"
              style={{
                fontFamily: `'${pairing.primary.family}', sans-serif`,
                fontWeight: pairing.primary.weight || 700,
              }}
            >
              {template.content.price as string}
            </p>
            <p
              className="text-sm mb-4 text-neutral-600"
              style={{
                fontFamily: `'${pairing.secondary.family}', sans-serif`,
                fontWeight: pairing.secondary.weight || 400,
              }}
            >
              {template.content.body as string}
            </p>
            <Button className="w-full">
              {template.content.button as string}
            </Button>
          </Card>
        );

      case "blog-card":
        return (
          <Card className={`p-6 ${bgColor} ${textColor} ${borderColor} border`}>
            <span className="px-3 py-1 text-xs rounded-full bg-accent-peach/10 text-accent-clay mb-3 inline-block">
              {template.content.tag as string}
            </span>
            <h3
              className="text-xl font-bold mb-3"
              style={{
                fontFamily: `'${pairing.primary.family}', sans-serif`,
                fontWeight: pairing.primary.weight || 700,
              }}
            >
              {template.content.heading as string}
            </h3>
            <p
              className="text-sm mb-4 text-neutral-600 leading-relaxed"
              style={{
                fontFamily: `'${pairing.secondary.family}', sans-serif`,
                fontWeight: pairing.secondary.weight || 400,
              }}
            >
              {template.content.body as string}
            </p>
            <p
              className="text-xs text-neutral-500"
              style={{
                fontFamily: `'${pairing.secondary.family}', sans-serif`,
                fontWeight: pairing.secondary.weight || 400,
              }}
            >
              {template.content.meta as string}
            </p>
          </Card>
        );

      case "hero":
        return (
          <div className={`p-12 ${bgColor} ${textColor} rounded-2xl text-center`}>
            <h1
              className="text-5xl font-bold mb-4"
              style={{
                fontFamily: `'${pairing.primary.family}', sans-serif`,
                fontWeight: pairing.primary.weight || 700,
              }}
            >
              {template.content.heading as string}
            </h1>
            <h2
              className="text-2xl mb-6"
              style={{
                fontFamily: `'${pairing.primary.family}', sans-serif`,
                fontWeight: pairing.primary.weight || 700,
              }}
            >
              {template.content.subheading as string}
            </h2>
            <p
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{
                fontFamily: `'${pairing.secondary.family}', sans-serif`,
                fontWeight: pairing.secondary.weight || 400,
              }}
            >
              {template.content.body as string}
            </p>
            <Button size="lg">
              {template.content.button as string}
            </Button>
          </div>
        );

      case "testimonial":
        return (
          <Card className={`p-8 ${bgColor} ${textColor} ${borderColor} border`}>
            <p
              className="text-lg italic mb-6"
              style={{
                fontFamily: `'${pairing.secondary.family}', sans-serif`,
                fontWeight: pairing.secondary.weight || 400,
              }}
            >
              "{template.content.quote as string}"
            </p>
            <div>
              <p
                className="font-semibold mb-1"
                style={{
                  fontFamily: `'${pairing.primary.family}', sans-serif`,
                  fontWeight: pairing.primary.weight || 700,
                }}
              >
                {template.content.name as string}
              </p>
              <p
                className="text-sm text-neutral-500"
                style={{
                  fontFamily: `'${pairing.secondary.family}', sans-serif`,
                  fontWeight: pairing.secondary.weight || 400,
                }}
              >
                {template.content.title as string}
              </p>
            </div>
          </Card>
        );

      case "pricing":
        return (
          <Card className={`p-8 ${bgColor} ${textColor} ${borderColor} border`}>
            <h3
              className="text-2xl font-bold mb-2"
              style={{
                fontFamily: `'${pairing.primary.family}', sans-serif`,
                fontWeight: pairing.primary.weight || 700,
              }}
            >
              {template.content.plan as string}
            </h3>
            <div className="mb-6">
              <span
                className="text-5xl font-bold"
                style={{
                  fontFamily: `'${pairing.primary.family}', sans-serif`,
                  fontWeight: pairing.primary.weight || 700,
                }}
              >
                {template.content.price as string}
              </span>
              <span
                className="text-lg text-neutral-500"
                style={{
                  fontFamily: `'${pairing.secondary.family}', sans-serif`,
                }}
              >
                {template.content.period as string}
              </span>
            </div>
            <ul className="mb-6 space-y-2">
              {(template.content.features as string[]).map((feature, idx) => (
                <li
                  key={idx}
                  className="text-sm"
                  style={{
                    fontFamily: `'${pairing.secondary.family}', sans-serif`,
                    fontWeight: pairing.secondary.weight || 400,
                  }}
                >
                  ✓ {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full">
              {template.content.button as string}
            </Button>
          </Card>
        );

      case "mobile-app":
        return (
          <div className={`p-6 ${bgColor} ${textColor} rounded-2xl border ${borderColor} max-w-sm mx-auto`}>
            <div className="mb-6">
              <h3
                className="text-lg font-bold mb-4"
                style={{
                  fontFamily: `'${pairing.primary.family}', sans-serif`,
                  fontWeight: pairing.primary.weight || 700,
                }}
              >
                {template.content.header as string}
              </h3>
              <p
                className="text-xs text-neutral-500 mb-6"
                style={{
                  fontFamily: `'${pairing.secondary.family}', sans-serif`,
                  fontWeight: pairing.secondary.weight || 400,
                }}
              >
                {template.content.nav as string}
              </p>
            </div>
            <Card className={`p-4 ${theme === "light" ? "bg-neutral-50" : "bg-neutral-800"}`}>
              <h4
                className="text-sm font-semibold mb-2"
                style={{
                  fontFamily: `'${pairing.primary.family}', sans-serif`,
                  fontWeight: pairing.primary.weight || 700,
                }}
              >
                {template.content.cardTitle as string}
              </h4>
              <p
                className="text-xs"
                style={{
                  fontFamily: `'${pairing.secondary.family}', sans-serif`,
                  fontWeight: pairing.secondary.weight || 400,
                }}
              >
                {template.content.cardContent as string}
              </p>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div id="component-preview" className="transition-opacity duration-300">
      {renderComponent()}
    </div>
  );
};

