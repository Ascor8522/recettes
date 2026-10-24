/// <reference types="vite/client" />
import { LanguageSelect } from "@/components/LanguageSelect.tsx";
import { Logo } from "@/components/Logo.tsx";
import { ThemeToggle } from "@/components/ThemeToggle.tsx";
import { getAcceptLanguage } from "@/utils/locale.functions.ts";
import { resolveLocale, translations } from "@/utils/locales.ts";
import { QueryClientProvider } from "@tanstack/solid-query";
import type { QueryClient } from "@tanstack/solid-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import { Suspense, type JSX } from "solid-js";
import { HydrationScript } from "solid-js/web";
import appCss from "../app.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  validateSearch: (search: Record<string, unknown>) => ({
    lang: typeof search.lang === "string" ? search.lang : undefined,
  }),
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: async ({ deps }) => ({
    locale: resolveLocale(deps.lang, deps.lang ? null : await getAcceptLanguage()),
  }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "recettes" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  component: RootLayout,
  shellComponent: RootDocument,
});

function RootLayout() {
  const data = Route.useLoaderData();
  const context = Route.useRouteContext();
  const locale = () => data().locale;
  const text = () => translations[locale()];

  return (
    <QueryClientProvider client={context().queryClient}>
      <div class="flex min-h-screen flex-col bg-white px-[5vw] py-7 font-sans text-gray-800 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-50 max-[600px]:px-5 max-[600px]:py-5.5">
        <header class="flex w-full items-center justify-between">
          <Logo locale={locale()} />
          <div class="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSelect locale={locale()} />
          </div>
        </header>

        <Suspense>
          <Outlet />
        </Suspense>

        <footer class="flex items-center justify-between text-[.7rem] text-gray-500 dark:text-gray-400 max-[600px]:flex-wrap max-[600px]:items-start max-[600px]:gap-3.5">
          <p class="m-0">{text().everydayCooking}</p>
          <div class="flex gap-6 max-[600px]:gap-3.5">
            <Link
              class="hover:text-gray-800 dark:hover:text-gray-50"
              to="/search"
              search={(previous) => ({ ...previous, lang: locale(), q: "" })}
            >
              {text().recipes}
            </Link>
            <Link
              class="hover:text-gray-800 dark:hover:text-gray-50"
              to="/providers"
              search={(previous) => ({ ...previous, lang: locale() })}
            >
              {text().providers}
            </Link>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

function RootDocument({ children }: { children: JSX.Element }) {
  const data = Route.useLoaderData();

  return (
    <html lang={data().locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
