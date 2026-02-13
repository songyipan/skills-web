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

import React from "react";
import { Skill } from "@repo/db";

interface SkillItemProps {
  skill: Skill;
  onSelect: (s: Skill) => void;
  isInstalled: boolean;
}

export function SkillItem({
  skill,
  onSelect,

  isInstalled,
}: SkillItemProps) {
  const { t } = useTranslation();
  return (
    <Card className="hover:-translate-y-1 lg:hover:-translate-y-2 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          {/* <div className="p-3 lg:p-4 bg-zinc-950 border border-zinc-800 rounded-2xl lg:rounded-[1.5rem] text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <span className="w-5 h-5 lg:w-6 lg:h-6 block">{skill.icon}</span>
          </div> */}
          {/* {skill.isNew && ( */}
          <Badge
            variant="indigo"
            className="animate-pulse px-2 lg:px-3 py-0.5 lg:py-1 font-black text-[8px] lg:text-[10px]"
          >
            NEW
          </Badge>
          {/* )} */}
        </div>
        <CardTitle
          className={`mt-4 transition-colors tracking-tight text-xl lg:text-2xl group-hover:text-indigo-400`}
        >
          {skill.name}
        </CardTitle>
        <CardDescription
          className={`line-clamp-2 mt-2 font-medium transition-colors group-hover:text-zinc-400 ${"text-xs h-8"}`}
        >
          {skill.desc || skill.mainContent?.substring(3, 400)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto justify-between ">
        <div className="flex items-center gap-2 ">
          {/* <Badge
            variant="zinc"
            className="px-2 lg:px-3 py-0.5 lg:py-1 border-zinc-800 font-bold text-[8px] lg:text-[10px]"
          > */}
          {/* {t(`categories.${skill.category}`)} */}
          {/* </Badge> */}
          <span className="text-[10px] font-black text-zinc-700 tracking-tighter hidden sm:block">
            {/* v3.2 */}
            Created:{" "}
            <span className="  text-zinc-500">
              {skill.createdAt?.toLocaleDateString()}
            </span>
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
