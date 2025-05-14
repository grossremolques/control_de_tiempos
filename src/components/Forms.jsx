import React from "react";
export default function Input({ label, type, id }) {
  return (
    <label htmlFor={id}>
      <span className="text-sm font-medium text-gray-700"> {label} </span>

      <input
        type={type}
        id={id}
        name={id}
        className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
      />
    </label>
  );
}
export function Button({
  children,
  type = "button",
  size = "sm",
  variant = "primary",
  onClick,
  onSubmit,
}) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-200 text-gray-700",
  };
  return (
    <button
      type={type}
      className={`rounded  font-medium transition-colors cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]}`}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  );
}
