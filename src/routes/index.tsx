import { SearchBar } from "@/components/SearchBar.tsx";
import { Route as RootRoute } from "@/routes/__root.tsx";
import type { Locale } from "@/utils/locales.ts";
import { translations } from "@/utils/locales.ts";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
  head: ({ matches }) => {
    const locale = (matches[0]?.loaderData as { locale?: Locale } | undefined)?.locale ?? "en";
    const text = translations[locale];

    return {
      meta: [{ title: text.homeTitle }, { name: "description", content: text.homeDescription }],
    };
  },
  component: Home,
});

function Home() {
  const data = RootRoute.useLoaderData();
  const locale = () => data().locale;
  const text = () => translations[locale()];

  return (
    <>
      <main class="mx-auto flex w-full max-w-170 flex-1 flex-col justify-center text-center">
        <h1
          class="m-0 text-[clamp(2.4rem,6vw,4rem)] font-semibold tracking-tighter"
          style="view-transition-name: page-title"
        >
          {text().searchLabel}
        </h1>

        <p class="mx-auto my-4.5 mb-8.5 text-[.95rem] leading-normal text-gray-500 dark:text-gray-400 max-[600px]:leading-6">
          {text().searchIntro}
        </p>

        <SearchBar />
      </main>
    </>
  );
}
