import type { Locale } from "@/utils/locales.ts";
import { translations } from "@/utils/locales.ts";

export interface LogoProps {
  className?: string;
  locale: Locale;
}

export function Logo({ className = "", locale }: LogoProps) {
  return (
    <a
      class={`text-[1.18rem] font-bold tracking-[-.04em] ${className}`}
      href="/"
      aria-label={`recettes — ${translations[locale].home}`}
    >
      recettes
      <span class="text-gray-500 dark:text-gray-400" aria-hidden="true">
        .
      </span>
    </a>
  );
}
