import { Slot } from "@radix-ui/react-slot";
import { cn } from "@workspace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:bg-primary/90",
        secondary: "bg-muted text-foreground shadow-sm hover:bg-muted/80",
        outline:
          "border border-border bg-transparent hover:bg-muted/50 hover:text-foreground",
        ghost: "hover:bg-muted/50 hover:text-foreground",
        indigo:
          "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
        zinc: "bg-muted/50 text-muted-foreground border border-border",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  active?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  active,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        active && "bg-primary/10 text-primary border border-primary/20",
        className,
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
