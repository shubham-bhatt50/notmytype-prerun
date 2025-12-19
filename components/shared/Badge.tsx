import React from "react";
import { UseCaseTag } from "@/types/pairing";

interface BadgeProps {
  children: React.ReactNode;
  variant?: UseCaseTag | "default";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "sm",
  className = "",
}) => {
  const baseStyles = "px-3 py-1 rounded-full text-sm font-medium";
  
  const variantStyles: Record<string, string> = {
    modern: "bg-primary-100 text-primary-700",
    elegant: "bg-accent-peach/10 text-accent-clay",
    playful: "bg-warning/10 text-warning-700",
    corporate: "bg-neutral-200 text-neutral-700",
    editorial: "bg-info/10 text-info-700",
    default: "bg-accent-peach/10 text-accent-clay",
  };

  const sizeStyles = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};

