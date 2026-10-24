import { RecipeCard } from "@/components/RecipeCard.tsx";
import type { Locale } from "@/utils/locales.ts";
import { translations } from "@/utils/locales.ts";
import { getSearchResults } from "@/utils/search.functions.ts";
import { createInfiniteQuery } from "@tanstack/solid-query";
import { For, Show } from "solid-js";

export interface SearchResultsProps {
  queryParam: string;
  locale: Locale;
}

export function SearchResults(props: SearchResultsProps) {
  const results = createInfiniteQuery(() => ({
    queryKey: ["recipes", props.queryParam],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getSearchResults({
        data: { query: props.queryParam, page: pageParam },
      }),
    getNextPageParam: (lastPage, pages) => (lastPage.hasMoreResults ? pages.length : undefined),
  }));

  return (
    <>
      <div class="grid grid-cols-3 gap-4 max-[600px]:grid-cols-2 max-[480px]:grid-cols-1">
        <For each={results.data?.pages.flatMap((page) => page.recipes) ?? []}>
          {(recipe) => <RecipeCard recipe={recipe} locale={props.locale} />}
        </For>
      </div>

      <Show when={results.isFetchNextPageError}>
        <p class="mt-4 text-center text-sm text-red-600" role="alert">
          {translations[props.locale].loadMoreError}
        </p>
      </Show>
      <Show when={results.hasNextPage}>
        <nav class="mt-8 flex justify-center" aria-label={translations[props.locale].pagination}>
          <button
            class="rounded border border-gray-300 px-5 py-2.5 text-sm font-semibold hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900 cursor-pointer disabled:cursor-wait disabled:opacity-60"
            type="button"
            disabled={results.isFetchingNextPage}
            onClick={() => results.fetchNextPage()}
          >
            {translations[props.locale].loadMore}
          </button>
        </nav>
      </Show>
    </>
  );
}
