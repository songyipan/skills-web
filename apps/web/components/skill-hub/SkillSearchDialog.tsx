"use client";

import Fuse from "fuse.js";
import { Badge, Button } from "@workspace/ui/components";
import { useTranslation } from "@workspace/ui/hooks";
import { Skill } from "@repo/db";
import { ArrowRight, CornerDownLeft, Search, Sparkles, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, {
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { useSkillsList } from "@/hooks/explore/useSkillsList";
import { useSearchStore } from "@/lib/store/searchStore";

const SEARCH_PAGE_SIZE = 120;
const SEARCH_RESULTS_LIMIT = 8;
const SEARCH_ANIMATION_DURATION_MS = 220;

function getSkillPreview(skill: Skill) {
  return skill.desc || skill.mainContent?.slice(0, 140) || "";
}

function getMatchedSkills(skills: Skill[], query: string) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return skills.slice(0, SEARCH_RESULTS_LIMIT);
  }

  const lowerCaseQuery = normalizedQuery.toLowerCase();

  if (normalizedQuery.length < 2) {
    return skills
      .filter((skill) =>
        [skill.name, skill.desc, skill.mainContent]
          .filter(Boolean)
          .some((field) => field?.toLowerCase().includes(lowerCaseQuery)),
      )
      .slice(0, SEARCH_RESULTS_LIMIT);
  }

  const searchEngine = new Fuse(skills, {
    keys: [
      { name: "name", weight: 0.5 },
      { name: "desc", weight: 0.35 },
      { name: "mainContent", weight: 0.15 },
    ],
    threshold: 0.34,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  return searchEngine
    .search(normalizedQuery)
    .slice(0, SEARCH_RESULTS_LIMIT)
    .map((entry) => entry.item);
}

export function SkillSearchDialog() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const { search, setSearch } = useSearchStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim());

  const { data: skillsPage, isLoading } = useSkillsList({
    variables: { page: 1, pageSize: SEARCH_PAGE_SIZE },
    enabled: isMounted,
  });

  const skills = skillsPage?.data ?? [];
  const matchedSkills = getMatchedSkills(skills, deferredQuery);
  const hasQuery = query.trim().length > 0;
  const showInitialState = !hasQuery && matchedSkills.length > 0;
  const showEmptyState = hasQuery && !isLoading && matchedSkills.length === 0;

  const openSearch = useEffectEvent(() => {
    setQuery(search);
    setIsMounted(true);
    window.requestAnimationFrame(() => {
      setIsVisible(true);
    });
  });

  const closeSearch = useEffectEvent(() => {
    setIsVisible(false);
  });

  const openExploreResults = useEffectEvent(() => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      closeSearch();
      startTransition(() => {
        if (search) {
          setSearch("");
        }

        if (pathname !== "/explore") {
          router.push("/explore");
        }
      });

      return;
    }

    closeSearch();

    startTransition(() => {
      setSearch(normalizedQuery);

      if (pathname !== "/explore") {
        router.push("/explore");
      }
    });
  });

  const openSkillDetail = useEffectEvent((skillId: string) => {
    closeSearch();

    startTransition(() => {
      router.push(`/skills/${skillId}`);
    });
  });

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || isVisible) {
      return;
    }

    const closeTimer = window.setTimeout(() => {
      setIsMounted(false);
    }, SEARCH_ANIMATION_DURATION_MS);

    return () => {
      window.clearTimeout(closeTimer);
    };
  }, [isMounted, isVisible]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shouldOpenSearch =
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k" &&
        !event.repeat;

      if (shouldOpenSearch) {
        event.preventDefault();
        openSearch();
        return;
      }

      if (event.key === "Escape" && isMounted) {
        event.preventDefault();
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeSearch, isMounted, openSearch]);

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className="group relative flex h-11 w-full items-center rounded-2xl border border-border bg-muted/20 px-4 text-left text-sm text-foreground transition-all hover:border-primary/30 hover:bg-muted/40"
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
        <span className="ml-3 min-w-0 flex-1 truncate font-medium">
          {search || t("header.searchTriggerPlaceholder")}
        </span>
        <span className="ml-4 hidden rounded-lg border border-border bg-background/70 px-2 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground lg:inline-flex">
          {t("header.searchShortcut")}
        </span>
      </button>

      {isMounted ? (
        <div
          className={`fixed inset-0 z-[120] flex items-start justify-center px-4 pb-6 pt-20 transition-all duration-200 sm:px-6 ${
            isVisible
              ? "pointer-events-auto bg-black/72 opacity-100 backdrop-blur-xl"
              : "pointer-events-none bg-black/0 opacity-0 backdrop-blur-none"
          }`}
          onClick={closeSearch}
        >
          <div
            className={`w-full max-w-3xl overflow-hidden rounded-[2rem] border border-border bg-background/95 shadow-[0_30px_120px_rgba(0,0,0,0.45)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "-translate-y-4 scale-[0.97] opacity-0"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-border bg-card/80 px-5 py-5 sm:px-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-[0_0_25px_oklch(var(--color-primary)/0.2)]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black tracking-tight text-foreground">
                    {t("header.searchTitle")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("header.searchDescription")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeSearch}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form
                className="relative mt-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  openExploreResults();
                }}
              >
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.currentTarget.value)}
                  placeholder={t("header.searchDialogPlaceholder")}
                  className="h-14 w-full rounded-2xl border border-border bg-background/80 pl-12 pr-28 text-sm font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40"
                />
                {hasQuery ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground sm:flex">
                    <CornerDownLeft className="h-3.5 w-3.5" />
                    {t("header.searchSubmitHint")}
                  </div>
                )}
              </form>
            </div>

            <div className="max-h-[min(60vh,560px)] overflow-y-auto px-5 py-5 sm:px-6">
              {isLoading && skills.length === 0 ? (
                <div className="flex min-h-56 items-center justify-center text-sm text-muted-foreground">
                  {t("header.searchLoading")}
                </div>
              ) : showEmptyState ? (
                <div className="flex min-h-56 flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-border bg-card/30 px-6 text-center">
                  <p className="text-base font-black tracking-tight text-foreground">
                    {t("header.searchEmptyTitle")}
                  </p>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    {t("header.searchEmptyDescription")}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-muted-foreground">
                      {showInitialState
                        ? t("header.searchLatest")
                        : t("header.searchResults")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {matchedSkills.length} {t("header.searchResultCount")}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {matchedSkills.map((skill) => (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => openSkillDetail(skill.id)}
                        className="group flex w-full items-start gap-4 rounded-[1.5rem] border border-border bg-card/35 px-4 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card/75"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-inner">
                          <Search className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-base font-black tracking-tight text-foreground transition-colors group-hover:text-primary">
                              {skill.name}
                            </p>
                            <Badge
                              variant="indigo"
                              className="h-5 px-2 text-[8px] font-black uppercase tracking-[0.18em]"
                            >
                              {t("header.searchSkillBadge")}
                            </Badge>
                          </div>
                          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                            {getSkillPreview(skill)}
                          </p>
                          <p className="mt-3 text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground/85">
                            {t("header.searchCreatedAt")}{" "}
                            {new Date(skill.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-border bg-card/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-xs text-muted-foreground">
                {t("header.searchFooter")}
              </p>
              <Button
                variant="outline"
                onClick={openExploreResults}
                className="h-11 gap-2 rounded-2xl border-primary/20 px-5 font-black tracking-tight"
              >
                {hasQuery
                  ? t("header.searchOpenResults")
                  : t("header.searchExplore")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
