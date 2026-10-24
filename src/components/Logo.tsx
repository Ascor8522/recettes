import { Link } from "@tanstack/solid-router";
import type { Locale } from "@/utils/locales.ts";
import { translations } from "@/utils/locales.ts";

export interface LogoProps {
  className?: string;
  locale: Locale;
}

export function Logo(props: LogoProps) {
  return (
    <Link
      class={`text-[1.18rem] font-bold tracking-[-.04em] ${props.className ?? ""}`}
      to="/"
      search={(previous) => ({ ...previous, lang: props.locale })}
      aria-label={`recettes — ${translations[props.locale].home}`}
    >
      recettes
      <span class="text-gray-500 dark:text-gray-400" aria-hidden="true">
        .
      </span>
    </Link>
  );
}
