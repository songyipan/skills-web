"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  PaginationNav,
  Spinner,
} from "@workspace/ui/components";
import { useTranslation } from "@workspace/ui/hooks";
import { SkillItem } from "@/components/skill-hub";

import { useEffect, useMemo, useState } from "react";

import { RefreshCcw } from "lucide-react";
import { Skill, UserApiKey } from "@repo/db";
import { copyText } from "@workspace/utils";
import {
  getApiKeyService,
  updateApiKeyService,
} from "@/modules/apiKey/apiKey.service";
import { toast, Toaster } from "sonner";
import { genApiKey } from "@/lib/utils/genApiKey";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/hooks/user";
import { useSkillsList } from "@/hooks/explore";
import { SkillsEmpty } from "./components/skills-empty";

const PAGE_SIZE = 12;

export default function MyPage() {
  const [apiKey, setApiKey] = useState<UserApiKey>({} as UserApiKey);
  const [githubId, setGithubId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: userInfo, isPending: userInfoPending } = useGetUser({
    enabled: !!githubId,
    variables: {
      githubId,
    },
  });

  const { data: skillsData, isPending: skillsListPending } = useSkillsList({
    enabled: !!userInfo?.id,
    variables: {
      userId: userInfo?.id,
      page: currentPage,
      pageSize: PAGE_SIZE,
    },
  });

  const router = useRouter();

  const { data: session, status } = useSession();

  const { t } = useTranslation();

  const getApiKey = async () => {
    try {
      if (session?.user) {
        const githubId = String((session.user as any).id);
        setGithubId(githubId);
        console.log(githubId, "githubId");
        const res = await getApiKeyService({
          githubId,
        });
        setApiKey(res || ({} as UserApiKey));
      }
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

  const handleGuideClick = () => {
    router.push("/guide");
  };

  const handleDetailClick = (id: string) => {
    router.push(`/skills/${id}`);
  };

  useEffect(() => {
    getApiKey();
  }, [session?.user]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-12 lg:px-16 max-w-[1600px] mx-auto space-y-12 lg:space-y-10 pb-40 lg:pb-0">
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

      <div className="l flex flex-col items-center justify-center border-2 border-dashed border-border rounded-[2rem] bg-card/10 p-6 text-center">
        {skillsListPending ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Spinner />
          </div>
        ) : skillsData?.data.length === 0 ? (
          <SkillsEmpty handleGuideClick={handleGuideClick} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              {skillsData?.data.map((skill: Skill) => (
                <SkillItem
                  key={skill.id}
                  showBadge={false}
                  skill={skill}
                  onSelect={() => handleDetailClick(skill.id)}
                />
              ))}
            </div>

            <PaginationNav
              currentPage={currentPage}
              totalPages={skillsData?.totalPages || 1}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
