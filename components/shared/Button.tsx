import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    primary:
      "bg-primary-500 hover:bg-primary-600 text-white hover:shadow-lg focus:ring-primary-500",
    secondary:
      "bg-neutral-200 hover:bg-neutral-300 text-neutral-900 hover:shadow-md focus:ring-neutral-400",
    outline:
      "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:shadow-md focus:ring-primary-500",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

