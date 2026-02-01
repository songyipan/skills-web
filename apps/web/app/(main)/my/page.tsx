"use client";

import { Badge, Button } from "@workspace/ui/components";
import { useTranslation } from "@workspace/ui/hooks";
import { Layers } from "lucide-react";

export default function MyPage() {
  const { t } = useTranslation();

  return (
    <div className="p-6 lg:p-12 lg:px-16 max-w-[1600px] mx-auto space-y-12 lg:space-y-16 pb-40 lg:pb-0">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-3 lg:space-y-4">
          <h2 className="text-4xl lg:text-7xl font-black tracking-tight">
            {t("library.title")}
          </h2>
          <p className="text-muted-foreground text-lg lg:text-2xl font-medium max-w-3xl leading-relaxed">
            {t("library.desc")}
          </p>
        </div>
        <Badge
          variant="indigo"
          className="h-10 lg:h-14 px-8 lg:px-12 text-[11px] lg:text-[13px] tracking-[0.2em] font-black"
        >
          0 {t("library.synced")}
        </Badge>
      </div>

      <div className="h-[30rem] lg:h-[45rem] flex flex-col items-center justify-center border-2 border-dashed border-border rounded-[3rem] lg:rounded-[5rem] bg-card/10 p-12 text-center">
        <div className="w-20 h-20 lg:w-32 lg:h-32 rounded-[2rem] lg:rounded-[3rem] bg-card border border-border flex items-center justify-center mb-8 lg:mb-12 text-muted-foreground shadow-inner">
          <Layers className="w-10 h-10 lg:w-16 lg:h-16" />
        </div>
        <h3 className="text-2xl lg:text-4xl font-black text-muted-foreground mb-4 lg:mb-6">
          {t("library.emptyTitle")}
        </h3>
        <p className="text-muted-foreground/60 mb-10 lg:mb-16 text-lg lg:text-2xl max-w-xl font-medium leading-relaxed">
          {t("library.emptyDesc")}
        </p>
        <Button className="rounded-xl px-16 h-16 lg:h-20 text-xl lg:text-2xl font-black shadow-2xl">
          {t("library.emptyBtn")}
        </Button>
      </div>
    </div>
  );
}
