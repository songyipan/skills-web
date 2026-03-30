"use client";

import { SkillItem } from "@/components/skill-hub";
import { useFavoriteSkills } from "@/hooks/favorites";
import { useGetUser } from "@/hooks/user";
import { Spinner, Button } from "@workspace/ui/components";
import { useTranslation } from "@workspace/ui/hooks";
import { Heart, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function StarPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session, status } = useSession();
  const githubId = session?.user
    ? String((session.user as { id?: string }).id)
    : "";

  const { data: userInfo, isPending: userInfoPending } = useGetUser({
    enabled: !!githubId,
    variables: {
      githubId,
    },
  });

  const { data: favoriteSkills, isPending: favoritesPending } =
    useFavoriteSkills({
      enabled: !!userInfo?.id,
      variables: {
        userId: userInfo?.id || "",
      },
    });

  const handleDetailClick = (skillId: string) => {
    router.push(`/skills/${skillId}`);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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

      <div className="rounded-[2.5rem] border border-border bg-card/20 p-6 shadow-2xl lg:rounded-[4rem] lg:p-8">
        {userInfoPending || favoritesPending ? (
          <div className="flex min-h-[320px] items-center justify-center">
            <Spinner />
          </div>
        ) : favoriteSkills?.length ? (
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground lg:text-[12px]">
              <Sparkles className="h-4 w-4 text-primary" />
              {favoriteSkills.length} {t("favorite.savedCount")}
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {favoriteSkills.map((favorite) => (
                <SkillItem
                  key={favorite.id}
                  showBadge={false}
                  skill={favorite.skill}
                  onSelect={() => handleDetailClick(favorite.skill.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-border bg-card/40 px-6 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
              <Heart className="h-7 w-7" />
            </div>
            <p className="mt-6 text-2xl font-black tracking-tight text-foreground">
              {t("favorite.emptyTitle")}
            </p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              {t("favorite.emptyDescription")}
            </p>
            <Button
              onClick={() => router.push("/explore")}
              className="mt-8 h-12 rounded-2xl px-6 font-black"
            >
              {t("favorite.explore")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
