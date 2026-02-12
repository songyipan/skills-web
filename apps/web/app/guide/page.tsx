"use client";
import { useGetWebInfo } from "@/hooks/website-info/use-get-info";
import { ViewContainer } from "@workspace/ui/components";

import { useEffect } from "react";
import { Spinner } from "@workspace/ui/components";
import Markdown from "react-markdown";

export default function GuidePage() {
  const { webInfo, loading, getWebInfo } = useGetWebInfo();

  useEffect(() => {
    getWebInfo("usage-guide");
  }, []);

  return (
    <ViewContainer>
      <div className="min-h-screen max-w-6xl mx-auto px-4 py-2 sm:py-12 sm:px-6 lg:px-8">
        {loading ? (
          <Spinner />
        ) : (
          <article className="prose prose-xs sm:prose-sm dark:prose-invert max-w-none prose-table:border-collapse prose-table:w-full prose-th:bg-muted prose-th:p-2 prose-td:p-2 prose-tr:border-b prose-tr:border-border prose-thead:bg-muted prose-th:font-semibold">
            <Markdown>{webInfo?.mainContent || ""}</Markdown>
          </article>
        )}
      </div>
    </ViewContainer>
  );
}
