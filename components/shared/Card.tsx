import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hover = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "bg-white rounded-2xl shadow-md border border-neutral-100 transition-shadow duration-300";
  
  const hoverStyles = hover
    ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    : "";

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

