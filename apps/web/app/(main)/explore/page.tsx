"use client";

import { ViewContainer } from "@workspace/ui/components";
import { useTranslation } from "@workspace/ui/hooks";

import { Sparkles } from "lucide-react";
import { SkillItem } from "@/components/skill-hub";

import { useSkills } from "@/hooks/explore/useSkills";

export default function ExplorePage() {
  const { t } = useTranslation();
  const { pages, loading } = useSkills();

  return (
    <ViewContainer>
      <div className="p-6 lg:p-12 lg:px-16 max-w-[1600px] mx-auto space-y-12 lg:space-y-16 pb-40 lg:pb-0">
        <div className="flex flex-col gap-6 border-b border-border pb-10">
          <div className="flex items-center gap-3 text-[10px] lg:text-[12px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            <Sparkles className="w-4 h-4 text-primary" />
            {0} {t("categories.onlineSuffix")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-10">
          {pages.data.map((skill) => (
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
