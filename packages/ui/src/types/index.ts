import React from "react";

export type Category =
  | "All"
  | "Creative"
  | "Logic"
  | "Coding"
  | "Visual"
  | "Utility";

export type AppView = "explore" | "my" | "star";

export type Language = "en" | "zh";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export type BadgeVariant = "indigo" | "zinc" | "success" | "error";

export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: Exclude<Category, "All">;
  promptTemplate: string;
  placeholder: string;
  model: "gemini-3-flash-preview" | "gemini-2.5-flash-image";
  isNew?: boolean;
}

export interface ActivityRecord {
  id: string;
  skillId: string;
  skillName: string;
  timestamp: Date;
  status: "success" | "failed";
}
