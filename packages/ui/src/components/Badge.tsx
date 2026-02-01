import React from "react";

import { BadgeVariant } from "../types";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  zinc: "bg-zinc-800 text-zinc-400 border-zinc-700",
  success: "bg-green-500/10 text-green-400 border-green-500/20",
  error: "bg-red-500/10 text-red-400 border-red-500/20",
};

export function Badge({
  children,
  className = "",
  variant = "zinc",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
