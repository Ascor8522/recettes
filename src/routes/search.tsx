import { Meta, Title } from "@solidjs/meta";
import { createAsync, query } from "@solidjs/router";
import { Show } from "solid-js";
import { SearchResults } from "@/components/SearchResults.tsx";
import { searchRecipes } from "@/models/recipe/providers/index.ts";
import { getCurrentLocale, getCurrentUrl, translations } from "@/utils/locales.ts";

const getSearchResults = query(async (queryParam: string, pageParam: number) => {
  "use server";
  return await searchRecipes({ query: queryParam, page: pageParam });
}, "search-recipes");

function getPageParam(value: string | null): number {
  const page = Number(value ?? "0");
  return Number.isInteger(page) && page >= 0 ? page : 0;
}

export default function Recipes() {
  const locale = getCurrentLocale();
  const text = translations[locale];
  const searchParams = getCurrentUrl().searchParams;
  const queryParam = searchParams.get("q") ?? "";
  const pageParam = getPageParam(searchParams.get("page"));
  const results = createAsync(() => getSearchResults(queryParam, pageParam));

  return (
    <>
      <Title>{text.recipes} — recettes</Title>
      <Meta name="description" content={text.recipesDescription} />

      <p class="mb-4.5 text-[.72rem] font-semibold uppercase tracking-[.12em] text-gray-500 dark:text-gray-400">
        {text.recipes}
      </p>

      <main class="m-auto w-full max-w-280 py-17.5 max-[600px]:py-11">
        <h1
          class="m-0 text-[clamp(2.4rem,6vw,4rem)] font-semibold tracking-tighter"
          style="view-transition-name: page-title"
        >
          {text.recipes}
          {queryParam && <> - {queryParam}</>}
        </h1>
        <p class="my-4.5 mb-10.5 text-[.95rem] text-gray-500 dark:text-gray-400">
          {text.recipesIntro}
        </p>

        <Show when={results()}>
          {(result) => (
            <SearchResults
              recipes={result().recipes}
              pageParam={pageParam}
              queryParam={queryParam}
              hasMoreResults={result().hasMoreResults}
              locale={locale}
            />
          )}
        </Show>
      </main>
    </>
  );
}
