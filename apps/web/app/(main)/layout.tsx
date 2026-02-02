"use client";

import { Badge, Button } from "@workspace/ui/components";
import { useTranslation } from "@workspace/ui/hooks";
import { useRouter, usePathname } from "next/navigation";
import {
  Activity,
  Github,
  Languages,
  Layers,
  LayoutGrid,
  LogOut,
  Monitor,
  Moon,
  Search,
  Sun,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("/explore");

  const { t, lang, toggleLang } = useTranslation();

  useEffect(() => {
    setIsClient(true);
    if (pathname) {
      setActivePath(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem("skillhub-theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("skillhub-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("skillhub-theme", "light");
      }
      return next;
    });
  };

  const handleLogout = () => {
    router.push("/login");
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground flex flex-col lg:flex-row font-sans selection:bg-primary/30 ${lang === "zh" ? "lang-zh" : "lang-en"}`}
    >
      <aside
        className={`border-r border-border hidden lg:flex flex-col h-screen sticky top-0 bg-card/40 backdrop-blur-2xl z-50 transition-all duration-300 ${lang === "zh" ? "w-72" : "w-64"}`}
      >
        <div className="p-8 pb-10 flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_25px_oklch(var(--color-primary)/0.4)]">
            <Zap
              className="w-6 h-6 text-primary-foreground"
              fill="currentColor"
            />
          </div>
          <span className="font-black tracking-tighter text-2xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
            SkillHub
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-5 space-y-10">
          <div className="space-y-2">
            <h4
              className={`px-3 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-4 ${lang === "zh" ? "font-medium opacity-80" : ""}`}
            >
              {t("nav.discovery")}
            </h4>
            <Button
              variant="ghost"
              active={activePath === "/explore"}
              onClick={() => router.push("/explore")}
              className="w-full justify-start gap-4 h-12 text-base rounded-xl"
            >
              <LayoutGrid className="w-4 h-4" /> {t("nav.marketplace")}
            </Button>
            <Button
              variant="ghost"
              active={activePath === "/my"}
              onClick={() => router.push("/my")}
              className="w-full justify-start gap-4 h-12 text-base rounded-xl"
            >
              <Layers className="w-4 h-4" /> {t("nav.library")}
            </Button>
            <Button
              variant="ghost"
              active={activePath === "/star"}
              onClick={() => router.push("/star")}
              className="w-full justify-start gap-4 h-12 text-base rounded-xl"
            >
              <Activity className="w-4 h-4" /> {t("nav.activity")}
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 bg-muted/30 rounded-2xl border border-border flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <Monitor className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-foreground truncate uppercase tracking-tight">
                {t("nav.nexusCore")}
              </p>
              <Badge variant="indigo" className="mt-1 h-4 px-2 text-[8px]">
                {t("nav.linked")}
              </Badge>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-destructive text-[10px] font-black uppercase tracking-widest transition-colors border border-transparent hover:border-destructive/20 rounded-xl"
          >
            <LogOut className="w-3.5 h-3.5" />
            {t("nav.logout")}
          </button>
        </div>
      </aside>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border z-[100] flex items-center justify-around h-20 px-4">
        <button
          onClick={() => router.push("/explore")}
          className={`flex flex-col items-center gap-1 ${activePath === "/explore" ? "text-primary" : "text-muted-foreground"}`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {t("nav.marketplace")}
          </span>
        </button>
        <button
          onClick={() => router.push("/my")}
          className={`flex flex-col items-center gap-1 ${activePath === "/my" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {t("nav.library")}
          </span>
        </button>
        <button
          onClick={() => router.push("/star")}
          className={`flex flex-col items-center gap-1 ${activePath === "/star" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Activity className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {t("nav.activity")}
          </span>
        </button>
      </nav>

      <main className="flex-1 bg-gradient-to-b from-background to-card overflow-hidden flex flex-col relative pb-20 lg:pb-0">
        <header className="sticky top-0 h-20 border-b border-border flex items-center justify-between px-6 lg:px-12 bg-background/60 backdrop-blur-2xl z-[60] shrink-0">
          <div className="relative flex-1 lg:max-w-xl text-foreground">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("header.searchPlaceholder")}
              className="w-full bg-muted/20 border border-border rounded-2xl text-sm pl-12 pr-4 h-11 focus:border-primary/50 focus:outline-none transition-all placeholder:text-muted-foreground font-medium"
            />
          </div>
          <div className="flex items-center gap-3 lg:gap-5 ml-6">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDark}
              className="rounded-xl border-border bg-muted/20"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLang}
              className="gap-2 font-bold tracking-tight px-3 lg:px-5 h-10 rounded-xl"
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="text-[11px] uppercase">
                {lang === "zh" ? "中文" : "EN"}
              </span>
            </Button>
            <div className="hidden md:flex items-center gap-3 ml-2 border border-border rounded-2xl p-1 pr-4 bg-muted/20">
              <div className="w-8 h-8 rounded-xl bg-muted/40 flex items-center justify-center border border-border shadow-inner">
                <Github className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-[11px] font-black text-foreground/80 tracking-tight">
                Dev-882
              </span>
            </div>
          </div>
        </header>

        <div key={lang} className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
