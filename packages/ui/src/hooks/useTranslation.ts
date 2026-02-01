import { useCallback, useEffect,useState } from "react";

import en from "../messages/en.json";
import type { Language, Messages,TxKeyPath } from "../messages/types";
import zh from "../messages/zh.json";

const messages: Record<Language, Messages> = { en, zh };

export function useTranslation() {
  const [lang, setLang] = useState<Language>("zh");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("skillhub-lang");
    if (saved === "en" || saved === "zh") {
      setLang(saved);
    } else {
      const browserLang = navigator.language.startsWith("zh") ? "zh" : "en";
      setLang(browserLang);
    }
  }, []);

  const t = useCallback(
    <K extends TxKeyPath>(key: K): string => {
      const keys = (key as string).split(".");
      let result: Record<string, unknown> = messages[lang];
      for (const k of keys) {
        if (result && typeof result === "object" && k in result) {
          result = result[k] as Record<string, unknown>;
        } else {
          return key;
        }
      }
      return typeof result === "string" ? result : key;
    },
    [lang]
  );

  const t_raw = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let result: Record<string, unknown> = messages[lang];
      for (const k of keys) {
        if (result && typeof result === "object" && k in result) {
          result = result[k] as Record<string, unknown>;
        } else {
          return key;
        }
      }
      return typeof result === "string" ? result : key;
    },
    [lang]
  );

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "zh" : "en";
      localStorage.setItem("skillhub-lang", next);
      return next;
    });
  }, []);

  return { t, t_raw, lang, toggleLang, isClient };
}

export function getTranslation(path: string, lang: Language): string {
  const keys = path.split(".");
  let result: Record<string, unknown> = messages[lang];
  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key] as Record<string, unknown>;
    } else {
      return path;
    }
  }
  return typeof result === "string" ? result : path;
}
