import { useCallback, useMemo, useState } from "react";

import { AppView, Category, Skill } from "../types";
import { useTranslation } from "./useTranslation";

interface UseSkillLibraryProps {
  skills: Skill[];
  initialInstalledIds?: string[];
  userId?: number | null;
  onInstall?: (skillId: string, skillName: string) => Promise<void>;
  onUninstall?: (skillId: string) => Promise<void>;
}

export function useSkillLibrary({
  skills,
  initialInstalledIds = [],
  userId = null,
  onInstall,
  onUninstall,
}: UseSkillLibraryProps) {
  const [currentView, setCurrentView] = useState<AppView>("explore");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [installedIds, setInstalledIds] = useState<Set<string>>(
    new Set(initialInstalledIds)
  );
  const [isLoading, setIsLoading] = useState(false);
  const { t, t_raw } = useTranslation();

  const filteredSkills = useMemo(() => {
    const base =
      currentView === "explore"
        ? skills.filter((s) => installedIds.has(s.id))
        : skills;

    return base.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;

      const localizedName = t_raw(`skills.${skill.id}.name`).toLowerCase();
      const localizedDesc = t_raw(`skills.${skill.id}.desc`).toLowerCase();
      const q = searchQuery.toLowerCase();

      const matchesSearch =
        localizedName.includes(q) || localizedDesc.includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [skills, currentView, installedIds, selectedCategory, searchQuery, t]);

  const toggleInstall = useCallback(
    async (id: string) => {
      const skill = skills.find((s) => s.id === id);
      if (!skill) return;

      const isCurrentlyInstalled = installedIds.has(id);

      setInstalledIds((prev) => {
        const next = new Set(prev);
        if (isCurrentlyInstalled) next.delete(id);
        else next.add(id);
        return next;
      });

      if ((onInstall || onUninstall) && userId) {
        setIsLoading(true);
        try {
          if (isCurrentlyInstalled && onUninstall) {
            await onUninstall(id);
          } else if (!isCurrentlyInstalled && onInstall) {
            await onInstall(id, skill.name);
          }
        } catch (error) {
          console.error("Failed to toggle skill:", error);
          setInstalledIds((prev) => {
            const next = new Set(prev);
            if (isCurrentlyInstalled) next.add(id);
            else next.delete(id);
            return next;
          });
        } finally {
          setIsLoading(false);
        }
      }
    },
    [skills, installedIds, userId, onInstall, onUninstall]
  );

  const installedSkillsList = useMemo(
    () => skills.filter((s) => installedIds.has(s.id)),
    [skills, installedIds]
  );

  return {
    currentView,
    setCurrentView,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredSkills,
    installedSkillsList,
    toggleInstall,
    isInstalled: (id: string) => installedIds.has(id),
    isLoading,
  };
}
