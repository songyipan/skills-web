"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSkillDetail } from "@/hooks/explore/useSkills";
import { use, useMemo } from "react";
import { Button, Spinner, ViewContainer } from "@workspace/ui/components";
import { Heart, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/hooks/user";
import { useFavoriteStatus } from "@/hooks/favorites";
import { favoriteSkill, unfavoriteSkill } from "@/app/actions/skills";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "@workspace/ui/hooks";

function stripFrontmatter(content: string): string {
  return content;
}

export default function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { t } = useTranslation();
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const githubId = session?.user
    ? String((session.user as { id?: string }).id)
    : "";

  const { data, isPending } = useSkillDetail({
    enabled: !!id,
    variables: { id },
  });

  const { data: userInfo, isPending: userInfoPending } = useGetUser({
    enabled: !!githubId,
    variables: {
      githubId,
    },
  });

  const { data: favorited = false, isPending: favoriteStatusPending } =
    useFavoriteStatus({
      enabled: !!userInfo?.id && !!id,
      variables: {
        userId: userInfo?.id || "",
        skillId: id,
      },
    });

  const favoriteMutation = useMutation({
    mutationFn: async () => {
      if (!userInfo?.id) {
        throw new Error("User not found");
      }

      if (favorited) {
        return unfavoriteSkill(userInfo.id, id);
      }

      return favoriteSkill(userInfo.id, id);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["favorite-status"] }),
        queryClient.invalidateQueries({ queryKey: ["favorite-skills"] }),
      ]);
    },
  });

  const markdownContent = useMemo(() => {
    return stripFrontmatter(data?.mainContent || "*No content available*");
  }, [data?.mainContent]);

  const handleFavoriteToggle = async () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (!userInfo?.id || favoriteMutation.isPending) {
      return;
    }

    await favoriteMutation.mutateAsync();
  };

  return (
    <ViewContainer>
      <div className="min-h-screen max-w-6xl mx-auto px-4 py-2 sm:py-12 sm:px-6 lg:px-8">
        {isPending ? (
          <Spinner />
        ) : (
          <div className=" flex w-full  gap-40  ">
            <div className=" flex-4/6 ">
              <article className="prose prose-xs sm:prose-sm dark:prose-invert max-w-none prose-table:border-collapse prose-table:w-full prose-th:bg-muted prose-th:p-2 prose-td:p-2 prose-tr:border-b prose-tr:border-border prose-thead:bg-muted prose-th:font-semibold">
                <Markdown remarkPlugins={[remarkGfm]}>
                  {`# ${data?.name || ""}
Execute this command in the project root directory:

\`\`\`bash
npx skills-cli --add ${data?.name || ""}
\`\`\`
              `}
                </Markdown>
              </article>

              <div className="mt-4">
                {/* <div className=" mb-4 h-1 w-full border-b border-gray-200 dark:border-gray-700"></div> */}
                <article className="prose prose-xs sm:prose-sm dark:prose-invert max-w-none prose-table:border-collapse prose-table:w-full prose-th:bg-muted prose-th:p-2 prose-td:p-2 prose-tr:border-b prose-tr:border-border prose-thead:bg-muted prose-th:font-semibold">
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {markdownContent}
                  </Markdown>
                </article>
              </div>
            </div>

            <div className=" flex-1/12 pt-40">
              <div className="rounded-[1.75rem] border border-border bg-card/40 p-4 backdrop-blur-sm">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-muted-foreground">
                  {t("favorite.panelLabel")}
                </p>
                <Button
                  variant={favorited ? "indigo" : "outline"}
                  onClick={handleFavoriteToggle}
                  disabled={
                    userInfoPending ||
                    favoriteStatusPending ||
                    favoriteMutation.isPending
                  }
                  className={`mt-4 h-12 w-full rounded-2xl text-sm font-black tracking-tight ${
                    favorited
                      ? "border-primary/20 bg-primary/10 text-primary"
                      : ""
                  }`}
                >
                  {userInfoPending ||
                  favoriteStatusPending ||
                  favoriteMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Heart
                      className={`h-4 w-4 ${
                        favorited ? "fill-current text-primary" : ""
                      }`}
                    />
                  )}
                  {session?.user
                    ? userInfoPending
                      ? t("favorite.loading")
                      : favorited
                        ? t("favorite.added")
                        : t("favorite.add")
                    : t("favorite.login")}
                </Button>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t("favorite.panelDescription")}
                </p>
              </div>

              <div className="text-lg font-bold  flex flex-col gap-4">
                <div className="flex flex-col gap-3 text-[10px] lg:text-[12px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                  <p>Download volume</p>
                  <p className=" font-bold text-2xl">{data?.downloads || 0}</p>
                </div>
              </div>

              <div className=" flex items-center gap-3.5 mt-6 ">
                {data?.user.image && (
                  <img
                    src={data.user.image}
                    className="w-7 h-7 rounded-full"
                    alt=""
                  />
                )}
                <p className="text-[13px] lg:text-[15px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                  {data?.user.username || ""}
                </p>
              </div>

              <div className=" mt-6 flex  flex-col gap-3.5 ">
                <p>First Seen</p>
                <p className="text-[13px] lg:text-[15px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                  {data?.createdAt
                    ? new Date(data?.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ViewContainer>
  );
}
