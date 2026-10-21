import { SearchResults } from "@/components/SearchResults.tsx";
import { searchRecipes } from "@/models/recipe/providers/index.ts";
import { define } from "@/utils/utils.ts";
import { page, type RouteConfig } from "fresh";

export const handler = define.handlers({
  async GET(ctx) {
    const pageParam = Number(ctx.url.searchParams.get("page") ?? "0");
    const queryParam = ctx.url.searchParams.get("q") ?? "";

    return page({
      ...(await searchRecipes({
        query: queryParam,
        page: pageParam,
      })),
    });
  },
});

export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default define.page<typeof handler>(function Results(ctx) {
  const { recipes, hasMoreResults } = ctx.data;
  const pageParam = Number(ctx.url.searchParams.get("page") ?? "0");
  const queryParam = ctx.url.searchParams.get("q") ?? "";
  const { locale } = ctx.state;

  return (
    <SearchResults
      recipes={recipes}
      pageParam={pageParam}
      queryParam={queryParam}
      hasMoreResults={hasMoreResults}
      locale={locale}
    />
  );
});
