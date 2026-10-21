import { Pagination } from "@/components/Pagination.tsx";
import { RecipeCard } from "@/components/RecipeCard.tsx";
import type { Recipe } from "@/models/recipe/index.ts";
import type { Locale } from "@/utils/locales.ts";
import { Partial } from "fresh/runtime";

export interface SearchResultsProps {
  recipes: Recipe[];
  pageParam: number;
  queryParam: string;
  hasMoreResults: boolean;
  locale: Locale;
}

export function SearchResults(
  { recipes, pageParam, queryParam, hasMoreResults, locale }:
    SearchResultsProps,
) {
  return (
    <>
      <div class="grid grid-cols-3 gap-4 max-[600px]:grid-cols-2 max-[480px]:grid-cols-1">
        <Partial
          name="recipe-list"
          mode={pageParam === 0 ? "replace" : "append"}
          key={pageParam === 0 ? undefined : `${pageParam}-${queryParam}`}
        >
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} locale={locale} key={recipe.title} />
          ))}
        </Partial>
      </div>

      <Partial name="pagination">
        {hasMoreResults && (
          <Pagination
            locale={locale}
            url={`/search?q=${encodeURIComponent(queryParam)}&page=${
              pageParam + 1
            }`}
            partialUrl={`/partials/search?q=${
              encodeURIComponent(queryParam)
            }&page=${pageParam + 1}`}
          />
        )}
      </Partial>
    </>
  );
}
