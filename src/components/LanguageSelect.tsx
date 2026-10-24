import type { FileRouteTypes } from "@/routeTree.gen.ts";
import { type Locale, supportedLocales, translations } from "@/utils/locales.ts";
import { useNavigate, useRouterState } from "@tanstack/solid-router";
import { For } from "solid-js";

export interface LanguageSelectProps {
  locale: Locale;
}

export function LanguageSelect(props: LanguageSelectProps) {
  const navigate = useNavigate({ from: "/" });
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const changeLanguage = (event: Event) => {
    const select = event.currentTarget as HTMLSelectElement;
    void navigate({
      to: pathname() as FileRouteTypes["fullPaths"],
      search: (previous) => ({ ...previous, lang: select.value as Locale }),
      resetScroll: false,
    });
  };

  return (
    <label class="relative flex items-center">
      <select
        class="h-9 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white px-3 pr-7 text-xs font-semibold text-gray-600 outline-none transition-colors hover:border-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-500"
        value={props.locale}
        onChange={changeLanguage}
        aria-label={translations[props.locale].language}
      >
        <For each={supportedLocales}>
          {(supportedLocale) => (
            <option value={supportedLocale}>{translations[supportedLocale].localeName}</option>
          )}
        </For>
      </select>
      <span
        class="pointer-events-none absolute right-3 border-b-2 border-r-2 border-gray-500 p-1 -translate-y-0.5 rotate-45 dark:border-gray-400"
        aria-hidden="true"
      />
    </label>
  );
}
