"use client";

import { useTranslation } from "@workspace/ui/hooks";

export default function StarPage() {
  const { t } = useTranslation();

  return (
    <div className="p-6 lg:p-12 lg:px-16 max-w-[1600px] mx-auto space-y-12 lg:space-y-16 pb-40 lg:pb-0">
      <div className="space-y-3 lg:space-y-4">
        <h2 className="text-4xl lg:text-7xl font-black tracking-tight">
          {t("activity.title")}
        </h2>
        <p className="text-muted-foreground text-lg lg:text-2xl font-medium max-w-3xl leading-relaxed">
          {t("activity.desc")}
        </p>
      </div>

      <div className="bg-card/40 border border-border rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-2xl">
        <div className="p-32 lg:p-56 text-center opacity-40">
          <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-xl lg:text-3xl">
            {t("activity.empty")}
          </p>
        </div>
      </div>
    </div>
  );
}
