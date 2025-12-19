"use client";

const components = [
  { id: "product-card", name: "Product Card" },
  { id: "blog-card", name: "Blog Card" },
  { id: "hero", name: "Hero" },
  { id: "testimonial", name: "Testimonial" },
  { id: "pricing", name: "Pricing" },
  { id: "mobile-app", name: "Mobile App" },
];

interface ComponentTabsProps {
  selectedComponent: string;
  onComponentChange: (id: string) => void;
}

export const ComponentTabs: React.FC<ComponentTabsProps> = ({
  selectedComponent,
  onComponentChange,
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {components.map((component) => (
        <button
          key={component.id}
          onClick={() => onComponentChange(component.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            selectedComponent === component.id
              ? "bg-primary-500 text-white shadow-md"
              : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
          }`}
        >
          {component.name}
        </button>
      ))}
    </div>
  );
};

