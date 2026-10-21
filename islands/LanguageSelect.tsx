import {
  type Locale,
  supportedLocales,
  translations,
} from "@/utils/locales.ts";

export interface LanguageSelectProps {
  locale: Locale;
}

export default function LanguageSelect({ locale }: LanguageSelectProps) {
  function changeLanguage(event: Event) {
    const select = event.currentTarget as HTMLSelectElement;
    const url = new URL(globalThis.location.href);
    url.searchParams.set("lang", select.value);
    globalThis.location.assign(url);
  }

  return (
    <label class="relative flex items-center">
      <span class="sr-only">{translations[locale].language}</span>
      <select
        class="h-9 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white px-3 pr-7 text-xs font-semibold text-gray-600 outline-none transition-colors hover:border-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-500"
        value={locale}
        onChange={changeLanguage}
        aria-label={translations[locale].language}
      >
        {supportedLocales.map((supportedLocale) => (
          <option value={supportedLocale} key={supportedLocale}>
            {translations[supportedLocale as Locale].localeName}
          </option>
        ))}
      </select>
      <span
        class="pointer-events-none absolute right-3 border-b-2 border-r-2 border-gray-500 p-1 -translate-y-0.5 rotate-45 dark:border-gray-400"
        aria-hidden="true"
      />
    </label>
  );
}
