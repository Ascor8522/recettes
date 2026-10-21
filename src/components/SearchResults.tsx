import { Pagination } from "@/components/Pagination.tsx";
import { RecipeCard } from "@/components/RecipeCard.tsx";
import type { Recipe } from "@/models/recipe/index.ts";
import type { Locale } from "@/utils/locales.ts";
import { translations } from "@/utils/locales.ts";
import { For, Show, createSignal } from "solid-js";

export interface SearchResultsProps {
  recipes: Recipe[];
  pageParam: number;
  queryParam: string;
  hasMoreResults: boolean;
  locale: Locale;
}

export function SearchResults(props: SearchResultsProps) {
  const [recipes, setRecipes] = createSignal(props.recipes);
  const [page, setPage] = createSignal(props.pageParam);
  const [hasMoreResults, setHasMoreResults] = createSignal(props.hasMoreResults);
  const [loading, setLoading] = createSignal(false);
  const [loadError, setLoadError] = createSignal(false);

  async function loadMore() {
    if (loading() || !hasMoreResults()) return;

    const nextPage = page() + 1;
    const params = new URLSearchParams({
      q: props.queryParam,
      page: String(nextPage),
    });

    setLoading(true);
    setLoadError(false);
    try {
      const response = await fetch(`/api/search?${params}`);
      if (!response.ok) throw new Error("Recipe search failed");

      const result = (await response.json()) as {
        recipes: Recipe[];
        hasMoreResults: boolean;
      };
      setRecipes((current) => [...current, ...result.recipes]);
      setPage(nextPage);
      setHasMoreResults(result.hasMoreResults);

      const url = new URL(window.location.href);
      url.searchParams.set("page", String(nextPage));
      window.history.replaceState(null, "", url);
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div class="grid grid-cols-3 gap-4 max-[600px]:grid-cols-2 max-[480px]:grid-cols-1">
        <For each={recipes()}>
          {(recipe) => <RecipeCard recipe={recipe} locale={props.locale} />}
        </For>
      </div>

      <Show when={loadError()}>
        <p class="mt-4 text-center text-sm text-red-600" role="alert">
          {translations[props.locale].loadMoreError}
        </p>
      </Show>
      <Show when={hasMoreResults()}>
        <Pagination locale={props.locale} loading={loading()} onClick={loadMore} />
      </Show>
    </>
  );
}
