import type { Locale } from "@/utils/locales.ts";
import { translations } from "@/utils/locales.ts";

export interface PaginationProps {
  locale: Locale;
  loading: boolean;
  onClick: () => void;
}

export function Pagination({ locale, loading, onClick }: PaginationProps) {
  return (
    <nav class="mt-8 flex justify-center" aria-label={translations[locale].pagination}>
      <button
        class="rounded border border-gray-300 px-5 py-2.5 text-sm font-semibold hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900 cursor-pointer disabled:cursor-wait disabled:opacity-60"
        type="button"
        disabled={loading}
        onClick={onClick}
      >
        {translations[locale].loadMore}
      </button>
    </nav>
  );
}
