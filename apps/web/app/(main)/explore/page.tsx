"use client";

import { ViewContainer } from "@workspace/ui/components";
import { useTranslation } from "@workspace/ui/hooks";
import { Category, Skill } from "@workspace/ui/types";
import { useEffect, useState } from "react";
import { getSkillsCategories as getSkillsCategoriesActions } from "@/app/actions/skills";
import { SkillCategory } from "@repo/db";
import {
  BookOpen,
  Code2,
  Image as ImageIcon,
  Lightbulb,
  PenTool,
  Sparkles,
} from "lucide-react";
import { SkillItem } from "@/components/skill-hub";

const SKILLS: Skill[] = [
  {
    id: "creative-writer",
    name: "Story Architect",
    description:
      "Generates immersive short stories or plot outlines based on your characters and setting.",
    icon: <PenTool className="w-6 h-6" />,
    category: "Creative",
    promptTemplate: "Write a creative and engaging short story about: ",
    model: "gemini-3-flash-preview",
    placeholder: "Enter a character or a setting...",
  },
  {
    id: "code-optimizer",
    name: "Logic Refactor",
    description:
      "Analyzes your code snippets to suggest performance improvements and cleaner patterns.",
    icon: <Code2 className="w-6 h-6" />,
    category: "Coding",
    promptTemplate:
      "Please refactor and optimize this code for readability and performance: ",
    model: "gemini-3-flash-preview",
    placeholder: "Paste your code here...",
    isNew: true,
  },
  {
    id: "image-gen",
    name: "Dream Visualizer",
    description:
      "Transform your wildest descriptions into stunning visual assets using AI image generation.",
    icon: <ImageIcon className="w-6 h-6" />,
    category: "Visual",
    promptTemplate: "",
    model: "gemini-2.5-flash-image",
    placeholder: "Describe the image you want to create...",
  },
  {
    id: "summarizer",
    name: "Essence Extractor",
    description:
      "Condenses long articles or complex documents into actionable bullet points.",
    icon: <BookOpen className="w-6 h-6" />,
    category: "Utility",
    promptTemplate: "Summarize the following text into 3-5 key bullet points: ",
    model: "gemini-3-flash-preview",
    placeholder: "Paste your long text here...",
  },
  {
    id: "philosopher",
    name: "Zen Thinker",
    description:
      "Ask deep questions and get philosophical perspectives on life and technology.",
    icon: <Lightbulb className="w-6 h-6" />,
    category: "Logic",
    promptTemplate: "Provide a philosophical and insightful perspective on: ",
    model: "gemini-3-flash-preview",
    placeholder: 'Ask a "Why" or "What if" question...',
  },
  {
    id: "brand-genius",
    name: "Brand Identity",
    description:
      "Generate catchy business names and slogans tailored to your industry.",
    icon: <Sparkles className="w-6 h-6" />,
    category: "Creative",
    promptTemplate: "Suggest 5 business names and slogans for a company that: ",
    model: "gemini-3-flash-preview",
    placeholder: "What does your business do?",
  },
];

export default function ExplorePage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const { t } = useTranslation();

  const getSkillsCategories = () => {
    setIsClient(true);
    getSkillsCategoriesActions()
      .then((res) => {
        console.log("categories", res);
        setCategories(res);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getSkillsCategories();
  }, []);

  const filteredSkills = SKILLS.filter((skill) => {
    const matchCategory =
      selectedCategory === "All" || skill.category === selectedCategory;
    const matchSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (!isClient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <ViewContainer>
      <div className="p-6 lg:p-12 lg:px-16 max-w-[1600px] mx-auto space-y-12 lg:space-y-16 pb-40 lg:pb-0">
        <div className="flex flex-col gap-6 border-b border-border pb-10">
          <div className="flex gap-3 bg-card/40 p-1.5 rounded-xl border border-border overflow-x-auto no-scrollbar max-w-fit">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 lg:px-10 py-2.5 rounded-lg text-[10px] lg:text-[11px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-[10px] lg:text-[12px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            <Sparkles className="w-4 h-4 text-primary" />
            {filteredSkills.length} {t("categories.onlineSuffix")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-10">
          {filteredSkills.map((skill) => (
            <SkillItem
              key={skill.id}
              skill={skill}
              onSelect={() => {}}
              onInstall={() => {}}
              isInstalled={false}
            />
          ))}
        </div>
      </div>
    </ViewContainer>
  );
}
