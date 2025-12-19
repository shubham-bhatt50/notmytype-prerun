"use client";

import { UseCaseTag } from "@/types/pairing";
import { Badge } from "@/components/shared/Badge";

interface GalleryFiltersProps {
  selectedTag: UseCaseTag | "all";
  onTagChange: (tag: UseCaseTag | "all") => void;
}

const tags: (UseCaseTag | "all")[] = [
  "all",
  "modern",
  "elegant",
  "playful",
  "corporate",
  "editorial",
];

export const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  selectedTag,
  onTagChange,
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedTag === tag
              ? "bg-primary-500 text-white shadow-md"
              : "bg-white text-neutral-700 hover:bg-neutral-300 border border-[#D9D9D9]"
          }`}
        >
          {tag === "all" ? "All" : tag.charAt(0).toUpperCase() + tag.slice(1)}
        </button>
      ))}
    </div>
  );
};

