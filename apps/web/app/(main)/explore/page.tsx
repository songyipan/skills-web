"use client";

import {
  ViewContainer,
  Spinner,
  PaginationNav,
} from "@workspace/ui/components";
import { useTranslation } from "@workspace/ui/hooks";

import { Sparkles } from "lucide-react";
import { SkillItem } from "@/components/skill-hub";

import { useSkillsList } from "@/hooks/explore/useSkillsList";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/lib/store/searchStore";
import { Skill } from "@repo/db";
import { useEffect, useState } from "react";

const PAGE_SIZE = 12;

export default function ExplorePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { search } = useSearchStore();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: pages, isLoading: loading } = useSkillsList({
    variables: { page: currentPage, pageSize: PAGE_SIZE, search },
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleDetailClick = (id: string) => {
    router.push(`/skills/${id}`);
  };

  return (
    <ViewContainer>
      <div className="p-6 lg:p-12 lg:px-16 max-w-[1600px] mx-auto space-y-12 lg:space-y-6 pb-40 lg:pb-0">
        <div className="flex flex-col gap-6 border-b border-border pb-8">
          <div className="flex items-center gap-3 text-[10px] lg:text-[12px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            <Sparkles className="w-4 h-4 text-primary" />
            {search ? (
              <>
                {pages?.total || 0} {t("categories.onlineSuffix")} for &ldquo;
                {search}&rdquo;
              </>
            ) : (
              <>
                {pages?.total || 0} {t("categories.onlineSuffix")}
              </>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Spinner />
          </div>
        ) : pages?.data.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px] text-muted-foreground">
            {search ? `No skills found for "${search}"` : "No skills available"}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              {pages?.data.map((skill: Skill) => (
                <SkillItem
                  key={skill.id}
                  skill={skill}
                  onSelect={() => handleDetailClick(skill.id)}
                />
              ))}
            </div>

            <PaginationNav
              currentPage={currentPage}
              totalPages={pages?.totalPages || 1}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </ViewContainer>
  );
}
