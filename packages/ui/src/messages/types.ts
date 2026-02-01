import en from "./en.json";
import zh from "./zh.json";

export const resources = {
  en: { translation: en },
  zh: { translation: zh },
} as const;

export type Language = keyof typeof resources;

export type Messages = typeof en;

type RecursiveKeyOf<T, K extends keyof T = keyof T> = K extends string | number
  ? T[K] extends Record<string, unknown>
    ? `${K}.${RecursiveKeyOf<T[K]>}`
    : K
  : never;

export type TxKeyPath = RecursiveKeyOf<Messages>;
