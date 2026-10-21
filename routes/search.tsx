import { SearchResults } from "@/components/SearchResults.tsx";
import { searchRecipes } from "@/models/recipe/providers/index.ts";
import { translations } from "@/utils/locales.ts";
import { define } from "@/utils/utils.ts";
import { page } from "fresh";
import { Head, Partial } from "fresh/runtime";

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

export default define.page<typeof handler>(function Recipes(ctx) {
  const { locale } = ctx.state;
  const text = translations[locale];
  const { recipes, hasMoreResults } = ctx.data;
  const pageParam = Number(ctx.url.searchParams.get("page") ?? "0");
  const queryParam = ctx.url.searchParams.get("q") ?? "";

  return (
    <>
      <Head>
        <title>{text.recipes} — recettes</title>
        <meta
          name="description"
          content={text.recipesDescription}
        />
      </Head>

      <p class="mb-4.5 text-[.72rem] font-semibold uppercase tracking-[.12em] text-gray-500 dark:text-gray-400">
        {text.recipes}
      </p>

      <main class="m-auto w-full max-w-280 py-17.5 max-[600px]:py-11">
        <h1
          class="m-0 text-[clamp(2.4rem,6vw,4rem)] font-semibold tracking-tighter"
          style="view-transition-name: page-title"
        >
          {text.recipes}
          {!!queryParam && <>- {queryParam}</>}
        </h1>
        <p class="my-4.5 mb-10.5 text-[.95rem] text-gray-500 dark:text-gray-400">
          {text.recipesIntro}
        </p>

        <Partial name="search">
          <SearchResults
            recipes={recipes}
            pageParam={pageParam}
            queryParam={queryParam}
            hasMoreResults={hasMoreResults}
            locale={locale}
          />
        </Partial>
      </main>
    </>
  );
});
