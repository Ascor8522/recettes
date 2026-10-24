import { createFileRoute } from "@tanstack/solid-router";
import { SearchResults } from "@/components/SearchResults.tsx";
import { Route as RootRoute } from "@/routes/__root.tsx";
import type { Locale } from "@/utils/locales.ts";
import { translations } from "@/utils/locales.ts";

function validateSearch(search: Record<string, unknown>) {
  return {
    q: typeof search.q === "string" ? search.q : "",
  };
}

export const Route = createFileRoute("/search")({
  validateSearch,
  head: ({ matches }) => {
    const locale = (matches[0]?.loaderData as { locale?: Locale } | undefined)?.locale ?? "en";
    const text = translations[locale];

    return {
      meta: [
        { title: `${text.recipes} — recettes` },
        { name: "description", content: text.recipesDescription },
      ],
    };
  },
  component: Recipes,
});

function Recipes() {
  const search = Route.useSearch();
  const data = RootRoute.useLoaderData();
  const locale = () => data().locale;
  const text = () => translations[locale()];

  return (
    <>
      <p class="mb-4.5 text-[.72rem] font-semibold uppercase tracking-[.12em] text-gray-500 dark:text-gray-400">
        {text().recipes}
      </p>

      <main class="m-auto w-full max-w-280 py-17.5 max-[600px]:py-11">
        <h1
          class="m-0 text-[clamp(2.4rem,6vw,4rem)] font-semibold tracking-tighter"
          style="view-transition-name: page-title"
        >
          {text().recipes}
          {search().q && <> - {search().q}</>}
        </h1>
        <p class="my-4.5 mb-10.5 text-[.95rem] text-gray-500 dark:text-gray-400">
          {text().recipesIntro}
        </p>

        <SearchResults queryParam={search().q} locale={locale()} />
      </main>
    </>
  );
}
