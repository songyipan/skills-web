"use client";

import { Button, Card } from "@workspace/ui/components";
import { useTranslation } from "@workspace/ui/hooks";
import { Github, Loader2, Lock, ShieldCheck, Zap } from "lucide-react";
import React from "react";

interface LoginPageProps {
  onLogin: () => void;
  isConnecting?: boolean;
  isAuthorized?: boolean;
}

export function LoginPage({
  onLogin,
  isConnecting,
  isAuthorized,
}: LoginPageProps) {
  const { t, isClient } = useTranslation();

  if (!isClient) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#09090b] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-[#09090b] flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full" />
      <div
        className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-[420px] space-y-10 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.5)] rotate-3">
            <Zap className="w-10 h-10 text-white fill-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter text-white">
              {t("auth.title")}
            </h1>
            <p className="text-zinc-500 font-medium text-lg">
              {t("auth.subtitle")}
            </p>
          </div>
        </div>

        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl space-y-6">
          <div className="space-y-4">
            <Button
              variant="primary"
              onClick={() => {
                onLogin();
              }}
              disabled={isConnecting || isAuthorized}
              className={`w-full h-16 rounded-2xl flex items-center justify-center gap-4 text-lg font-black transition-all border-none ${
                isAuthorized
                  ? "bg-green-600 text-white"
                  : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.4)]"
              }`}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                  <span className="animate-pulse text-white">
                    {t("auth.connecting")}
                  </span>
                </>
              ) : isAuthorized ? (
                <>
                  <ShieldCheck className="w-6 h-6 animate-bounce text-white" />
                  <span className="text-white">{t("auth.authorized")}</span>
                </>
              ) : (
                <>
                  <Github className="w-6 h-6 fill-current text-white" />
                  <span className="text-white">{t("auth.githubBtn")}</span>
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 py-2">
              <Lock className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                {t("auth.secure")}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800/50">
            <p className="text-[11px] leading-relaxed text-zinc-500 font-medium">
              {t("auth.agree")}
            </p>
          </div>
        </Card>

        <div className="flex items-center justify-center gap-6 opacity-30">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
            Global Registry
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>
      </div>

      <footer className="absolute bottom-10 left-0 right-0 text-center opacity-20">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
          Powered by Neural Core v3.2
        </span>
      </footer>
    </div>
  );
}
