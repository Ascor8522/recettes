import type { Locale } from "@/utils/locales.ts";
import { translations } from "@/utils/locales.ts";

export interface PaginationProps {
  url: string;
  partialUrl: string;
  locale: Locale;
}

export function Pagination({ url, partialUrl, locale }: PaginationProps) {
  return (
    <nav
      class="mt-8 flex justify-center"
      aria-label={translations[locale].pagination}
    >
      <form
        action={url}
        method="get"
        f-partial={partialUrl}
      >
        <button
          class="rounded border border-gray-300 px-5 py-2.5 text-sm font-semibold hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900 cursor-pointer"
          type="submit"
        >
          {translations[locale].loadMore}
        </button>
      </form>
    </nav>
  );
}
