"use client";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@workspace/ui/components";
import { useTranslation } from "@workspace/ui/hooks";
import { Layers } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { RefreshCcw } from "lucide-react";
import { UserApiKey } from "@repo/db";
import { copyText } from "@workspace/utils";
import {
  getApiKeyService,
  updateApiKeyService,
} from "@/modules/apiKey/apiKey.service";
import { toast, Toaster } from "sonner";
import { genApiKey } from "@/lib/utils/genApiKey";

export default function MyPage() {
  const [isUpload, setIsUpload] = useState(false);
  const [apiKey, setApiKey] = useState<UserApiKey>({} as UserApiKey);

  const { t } = useTranslation();

  const getApiKey = async () => {
    try {
      const res = await getApiKeyService({ userId: apiKey.userId });
      setApiKey(res || ({} as UserApiKey));
    } catch (error) {
      toast.error("Get apiKey failed");
    }
  };

  const handleResetApiKey = async () => {
    const loadingId = toast.loading("Resetting apiKey...");
    try {
      const res = await updateApiKeyService({
        id: apiKey.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        apiKey: genApiKey(),
      });
      await copyText(res?.apiKey || "");
      toast.dismiss(loadingId);
      toast.success("Reset apiKey success", {
        duration: 3000,
      });
      setApiKey(res || ({} as UserApiKey));
    } catch (error) {
      toast.dismiss(loadingId);
      toast.error("Reset apiKey failed", {
        duration: 3000,
      });
    }
  };

  const apiKeyString = useMemo(() => {
    return (
      apiKey.apiKey?.substring(12, 20) +
        "****" +
        apiKey.apiKey?.substring(24) || ""
    );
  }, [apiKey.apiKey]);

  useEffect(() => {
    getApiKey();
  }, []);

  const handleSubmit = async () => {};

  return (
    <div className="p-6 lg:p-12 lg:px-16 max-w-[1600px] mx-auto space-y-12 lg:space-y-16 pb-40 lg:pb-0">
      <div className="flex flex-row">
        <Card className=" w-full flex-row ">
          <CardHeader>
            <CardTitle>Api Key</CardTitle>
            <CardDescription className=" mt-1.5 ">
              {t("library.desc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <div className="bg-muted px-4 py-3 rounded-xl flex flex-row items-center justify-between">
              <p>{apiKeyString}</p>
              <div
                onClick={handleResetApiKey}
                className="  flex flex-row items-center justify-center gap-2"
              >
                <RefreshCcw className="  w-4 h-4 text-muted-foreground/60 cursor-pointer" />
                <p className="  text-sm text-muted-foreground/60 cursor-pointer">
                  {t("library.refresh")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
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
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
