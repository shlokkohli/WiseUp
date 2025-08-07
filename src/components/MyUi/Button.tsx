"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import { motion } from "framer-motion"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
}

export const Button = ({ children, className, variant = "primary", ...props }: ButtonProps) => {
  const isTertiary = variant === "tertiary";

  return (
    <motion.button
    whileHover={{scale:1.05}}
    {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)} // Explicitly cast props to match motion.button's expected type
    className={clsx(
      className, // Ensures user-provided styles take the highest priority
    "px-4 py-1 border-gray-200 rounded-lg text-sm",
      variant === "primary" && "px-4 border-t-2 shadow-inner shadow-violet-400 py-1 text-white hover:shadow-none hover:bg-violet-500 bg-violet-600 border-violet-400 hover:text-white",
      variant === "secondary" && "px-4 hover:border-t-2 hover:shadow-inner hover:border-violet-400  py-1 bg-none text-gray-600 hover:shadow-violet-400 hover:bg-violet-500 hover:text-white",

    )}
    >
      {children}
    </motion.button>
  );
};
