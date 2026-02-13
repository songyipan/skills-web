"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSkillDetail } from "@/hooks/explore/useSkills";
import { use, useMemo } from "react";
import { Spinner, ViewContainer } from "@workspace/ui/components";

function stripFrontmatter(content: string): string {
  return content;
}

export default function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, isPending } = useSkillDetail({
    enabled: !!id,
    variables: { id },
  });

  const markdownContent = useMemo(() => {
    return stripFrontmatter(data?.mainContent || "*No content available*");
  }, [data?.mainContent]);

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

Please install the skills-cli package to use the skill.

\`\`\`bash
npm i skills-cli
\`\`\`

Execute this command in the project root directory:

\`\`\`bash
npx skills-cli ${data?.name || ""}
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
