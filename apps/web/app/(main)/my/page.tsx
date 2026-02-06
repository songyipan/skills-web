"use client";

import {  Button } from "@workspace/ui/components";
import { useTranslation } from "@workspace/ui/hooks";
import { Layers } from "lucide-react";
import { useState } from "react";
import { UploadSkills } from "./components/upload-skills";
import * as z from "zod";
import { skillSchema } from "@/modules/skills/skills.schema";

import { createSkill } from "@/app/actions/skills";

export default function MyPage() {
  const [isUpload, setIsUpload] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = async (data: z.infer<typeof skillSchema>) => {
    await createSkill({
      name: data.name,
      desc: data.desc,
      githubUrl: data.githubUrl,
      userId: "12",
    });
  };

  return (
    <div className="p-6 lg:p-12 lg:px-16 max-w-[1600px] mx-auto space-y-12 lg:space-y-16 pb-40 lg:pb-0">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
     
     
      </div>

      <div className=" l flex flex-col items-center justify-center border-2 border-dashed border-border rounded-[3rem] lg:rounded-[5rem] bg-card/10 p-12 text-center">
        {!isUpload && (
          <div className="  flex flex-col items-center ">
            <div className="w-20 h-20 lg:w-32 lg:h-32 rounded-[2rem] lg:rounded-[3rem] bg-card border border-border flex items-center justify-center mb-8 lg:mb-12 text-muted-foreground shadow-inner">
              <Layers className="w-10 h-10 lg:w-16 lg:h-16" />
            </div>
            <h3 className="text-2xl font-black text-muted-foreground mb-4 lg:mb-6">
              {t("library.emptyTitle")}
            </h3>
            <p className="text-muted-foreground/60  mb-6  text-lg  max-w-xl font-medium leading-relaxed">
              {t("library.emptyDesc")}
            </p>

            <Button onClick={() => setIsUpload(true)} className="rounded-xl ">
              {t("library.emptyBtn")}
            </Button>
          </div>
        )}

        {isUpload && (
          <div className="flex w-full flex-col items-center justify-center">
            <UploadSkills handleSubmit={handleSubmit} />
          </div>
        )}
      </div>
    </div>
  );
}
