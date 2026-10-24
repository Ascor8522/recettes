import { providerMetadata } from "@/models/recipe/providers/index.ts";
import { Route as RootRoute } from "@/routes/__root.tsx";
import type { Locale } from "@/utils/locales.ts";
import { translations } from "@/utils/locales.ts";
import { createFileRoute } from "@tanstack/solid-router";
import { For } from "solid-js";

export const Route = createFileRoute("/providers")({
  head: ({ matches }) => {
    const locale = (matches[0]?.loaderData as { locale?: Locale } | undefined)?.locale ?? "en";
    const text = translations[locale];

    return {
      meta: [
        { title: text.providersTitle },
        { name: "description", content: text.providersDescription },
      ],
    };
  },
  component: Providers,
});

function Providers() {
  const data = RootRoute.useLoaderData();
  const locale = () => data().locale;
  const text = () => translations[locale()];

  return (
    <main class="m-auto w-full max-w-210 py-17.5 max-[600px]:py-11">
      <p class="mb-4.5 text-[.72rem] font-semibold uppercase tracking-[.12em] text-gray-500 dark:text-gray-400">
        {text().providersLabel}
      </p>
      <h1
        class="m-0 text-[clamp(2.4rem,6vw,4rem)] font-semibold tracking-tighter"
        style="view-transition-name: page-title"
      >
        {text().providers}
      </h1>
      <p class="my-4.5 mb-10.5 text-[.95rem] text-gray-500 dark:text-gray-400">
        {text().providersIntro}
      </p>

      <div class="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
        <For each={Object.values(providerMetadata)}>
          {(provider) => (
            <div class="flex min-h-47.5 flex-col justify-between rounded-[7px] border border-gray-300 p-6 text-gray-800 dark:border-gray-700 dark:text-gray-50">
              <img
                class={
                  provider.fetcher
                    ? "block h-24 w-full object-contain object-center"
                    : "block h-24 w-full object-contain object-center grayscale-75 opacity-70"
                }
                src={provider.logo}
                alt={provider.name}
              />
              <a
                class="text-[.8rem] font-semibold text-gray-500 underline underline-offset-2 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-50"
                href={provider.recipesUrl}
                target="_blank"
                rel="noreferrer"
              >
                {provider.name}
              </a>
              <span
                class={
                  provider.fetcher
                    ? "text-[.72rem] font-semibold text-green-600 dark:text-green-400"
                    : "text-[.72rem] font-semibold text-gray-400 dark:text-gray-500"
                }
              >
                {provider.fetcher ? text().available : text().notSupportedYet}
              </span>
            </div>
          )}
        </For>
      </div>
    </main>
  );
}
