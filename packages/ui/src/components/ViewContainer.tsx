import React from "react";

interface ViewContainerProps {
  children: React.ReactNode;
}

export function ViewContainer({ children }: ViewContainerProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-forwards h-full overflow-y-auto">
      {children}
    </div>
  );
}
