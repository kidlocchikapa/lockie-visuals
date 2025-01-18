import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
}

const buttonVariants = {
  default: "bg-primary text-white hover:bg-primary-dark",
  outline: "border border-gray-300 text-gray-900 hover:bg-gray-100",
  ghost: "bg-transparent hover:bg-gray-100",
  link: "text-primary underline-offset-4 hover:underline",
};

const buttonSizes = {
  default: "py-2 px-4",
  sm: "py-1 px-3 text-sm",
  lg: "py-3 px-6 text-lg",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
