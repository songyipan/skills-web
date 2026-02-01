"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components";
import { useTranslation } from "@workspace/ui/hooks";
import { Skill } from "@workspace/ui/types";
import {
  CheckCircle2,
  Download,
  FileCode,
  Info,
  Loader2,
  Star,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";

interface SkillDetailModalProps {
  skill: Skill;
  onClose: () => void;
  onInstall: (id: string) => void;
  isInstalled: boolean;
}

export function SkillDetailModal({
  skill,
  onClose,
  onInstall,
  isInstalled,
}: SkillDetailModalProps) {
  const { t, t_raw, lang } = useTranslation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleInstall = () => {
    if (isInstalled) return;
    setIsDownloading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 30;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsDownloading(false);
          onInstall(skill.id);
        }, 500);
      }
      setProgress(p);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-300">
      <Card className="w-full max-w-3xl h-[95vh] sm:h-auto sm:max-h-[90vh] flex flex-col overflow-hidden border-zinc-800 shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-t-[2.5rem] sm:rounded-[3rem]">
        <CardHeader className="flex-row items-center justify-between bg-zinc-900/50 border-b border-zinc-800 p-6 sm:p-10">
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="p-4 sm:p-6 bg-indigo-600/10 text-indigo-400 rounded-2xl sm:rounded-[2rem] border border-indigo-500/20 shadow-inner">
              <span className="w-6 h-6 sm:w-8 sm:h-8 block">{skill.icon}</span>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <CardTitle
                  className={`text-white tracking-tight ${lang === "zh" ? "text-xl sm:text-3xl font-black" : "text-xl sm:text-4xl"}`}
                >
                  {t_raw(`skills.${skill.id}.name`)}
                </CardTitle>
                <Badge
                  variant="indigo"
                  className="px-2 py-0.5 font-black text-[8px] w-fit"
                >
                  Official
                </Badge>
              </div>
              <CardDescription className="text-[10px] mt-1 font-mono text-zinc-500 tracking-wider hidden sm:block">
                manifest_v3.2.0 • build_882
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-zinc-800 w-10 h-10 sm:w-12 sm:h-12 transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-6 sm:p-12 space-y-8 sm:space-y-12">
          <div className="grid grid-cols-3 gap-3 sm:gap-8">
            <div className="p-4 sm:p-6 bg-zinc-950/50 border border-zinc-800 rounded-2xl sm:rounded-3xl text-center">
              <Users className="w-4 h-4 sm:w-5 h-5 mx-auto mb-2 text-zinc-600" />
              <p className="text-lg sm:text-2xl font-black text-white">12.4k</p>
              <p className="text-[8px] sm:text-[10px] font-black text-zinc-700 uppercase tracking-[0.1em] mt-1">
                Downloads
              </p>
            </div>
            <div className="p-4 sm:p-6 bg-zinc-950/50 border border-zinc-800 rounded-2xl sm:rounded-3xl text-center">
              <Star className="w-4 h-4 sm:w-5 h-5 mx-auto mb-2 text-yellow-500/80" />
              <p className="text-lg sm:text-2xl font-black text-white">4.9</p>
              <p className="text-[8px] sm:text-[10px] font-black text-zinc-700 uppercase tracking-[0.1em] mt-1">
                Rating
              </p>
            </div>
            <div className="p-4 sm:p-6 bg-zinc-950/50 border border-zinc-800 rounded-2xl sm:rounded-3xl text-center">
              <FileCode className="w-4 h-4 sm:w-5 h-5 mx-auto mb-2 text-indigo-500" />
              <p className="text-lg sm:text-2xl font-black text-white">2.4MB</p>
              <p className="text-[8px] sm:text-[10px] font-black text-zinc-700 uppercase tracking-[0.1em] mt-1">
                Size
              </p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-[10px] sm:text-[11px] font-black text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-2 sm:gap-3">
              <Info className="w-4 h-4 text-indigo-500" />{" "}
              {lang === "zh" ? "技能描述" : "Description"}
            </h4>
            <p
              className={`text-zinc-300 leading-relaxed font-medium ${lang === "zh" ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`}
            >
              {t_raw(`skills.${skill.id}.desc`)}{" "}
              {lang === "zh"
                ? "该模块化功能可集成到您的 AI 技术栈，提供增强的"
                : "This modular capability integrates into your AI stack, providing enhanced"}{" "}
              {t(`categories.${skill.category}`)}
              {lang === "zh" ? "推理逻辑。" : " reasoning."}
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-[10px] sm:text-[11px] font-black text-zinc-600 uppercase tracking-[0.3em]">
              {lang === "zh" ? "技术规范" : "Technical Specification"}
            </h4>
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 font-mono text-xs sm:text-sm text-zinc-400 space-y-2 sm:space-y-3 shadow-inner overflow-x-auto">
              <p>
                <span className="text-indigo-500/80">"model":</span>{" "}
                <span className="text-zinc-300">"{skill.model}"</span>
              </p>
              <p>
                <span className="text-indigo-500/80">"caps":</span>{" "}
                <span className="text-zinc-300">
                  ["reasoning", "streaming"]
                </span>
              </p>
              <p>
                <span className="text-indigo-500/80">"schema":</span>{" "}
                <span className="text-zinc-300">
                  {"{"} "prompt": "string" {"}"}
                </span>
              </p>
            </div>
          </div>

          <div className="pt-2 sm:pt-4">
            {isDownloading ? (
              <div className="space-y-4 sm:space-y-5">
                <div className="flex justify-between items-center text-[10px] sm:text-[12px] font-black uppercase tracking-widest text-indigo-400">
                  <span className="flex items-center gap-2 sm:gap-3">
                    <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />{" "}
                    {t("modal.processing")}
                  </span>
                  <span>{Math.floor(progress)}%</span>
                </div>
                <div className="h-2 sm:h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <Button
                className={`w-full h-16 sm:h-20 gap-3 sm:gap-4 text-lg sm:text-xl shadow-2xl rounded-2xl sm:rounded-[1.5rem] font-black transition-all ${isInstalled ? "bg-green-600/10 text-green-400 border border-green-500/30" : ""}`}
                onClick={handleInstall}
                disabled={isInstalled}
              >
                {isInstalled ? (
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                ) : (
                  <Download className="w-6 h-6 sm:w-7 sm:h-7" />
                )}
                {isInstalled ? t("common.synced") : t("modal.runBtn")}
              </Button>
            )}
          </div>
        </CardContent>

        <CardFooter className="bg-zinc-950 border-t border-zinc-800 py-4 sm:py-6 px-6 sm:px-12 justify-between">
          <div className="flex gap-4 sm:gap-8 text-zinc-700">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">
              License: MIT
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-[9px] sm:text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">
              {lang === "zh" ? "已验证安全" : "Verified"}
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
