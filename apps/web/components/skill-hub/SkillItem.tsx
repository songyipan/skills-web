"use client";

import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components";
import { useTranslation } from "@workspace/ui/hooks";
import { Skill } from "@workspace/ui/types";
import React from "react";

interface SkillItemProps {
  skill: Skill;
  onSelect: (s: Skill) => void;
  onInstall: (id: string, e: React.MouseEvent) => void;
  isInstalled: boolean;
}

export function SkillItem({
  skill,
  onSelect,
  /* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars */
  onInstall,
  /* eslint-enable @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars */
  isInstalled,
}: SkillItemProps) {
  const { t, t_raw, lang } = useTranslation();
  return (
    <Card className="hover:-translate-y-1 lg:hover:-translate-y-2 group">
      <CardHeader className="p-6 lg:p-8 pb-3 lg:pb-4">
        <div className="flex items-start justify-between">
          <div className="p-3 lg:p-4 bg-zinc-950 border border-zinc-800 rounded-2xl lg:rounded-[1.5rem] text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <span className="w-5 h-5 lg:w-6 lg:h-6 block">{skill.icon}</span>
          </div>
          {skill.isNew && (
            <Badge
              variant="indigo"
              className="animate-pulse px-2 lg:px-3 py-0.5 lg:py-1 font-black text-[8px] lg:text-[10px]"
            >
              NEW
            </Badge>
          )}
        </div>
        <CardTitle
          className={`mt-4 lg:mt-6 transition-colors tracking-tight ${lang === "zh" ? "text-xl lg:text-2xl font-black group-hover:text-indigo-400" : "text-xl lg:text-2xl group-hover:text-indigo-400"}`}
        >
          {t_raw(`skills.${skill.id}.name`)}
        </CardTitle>
        <CardDescription
          className={`line-clamp-2 mt-2 font-medium transition-colors group-hover:text-zinc-400 ${lang === "zh" ? "text-xs lg:text-sm leading-relaxed h-8 lg:h-10" : "text-xs h-9"}`}
        >
          {t_raw(`skills.${skill.id}.desc`)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto justify-between p-6 lg:p-8 pt-2 lg:pt-4">
        <div className="flex items-center gap-2 lg:gap-3">
          <Badge
            variant="zinc"
            className="px-2 lg:px-3 py-0.5 lg:py-1 border-zinc-800 font-bold text-[8px] lg:text-[10px]"
          >
            {t(`categories.${skill.category}`)}
          </Badge>
          <span className="text-[9px] font-black text-zinc-700 tracking-tighter hidden sm:block">
            v3.2
          </span>
        </div>
        <Button
          onClick={() => onSelect(skill)}
          variant={isInstalled ? "outline" : "primary"}
          size="sm"
          className={`rounded-xl h-9 lg:h-10 px-4 lg:px-5 gap-2 transition-all font-black ${isInstalled ? "border-green-500/20 text-green-400 bg-green-500/5" : ""}`}
        >
          <span className="text-[10px] lg:text-[11px] uppercase tracking-wide">
            {t("common.detail")}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}
