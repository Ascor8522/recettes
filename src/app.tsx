import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { LanguageSelect } from "@/components/LanguageSelect.tsx";
import { Logo } from "@/components/Logo.tsx";
import { ThemeToggle } from "@/components/ThemeToggle.tsx";
import { getCurrentLocale, translations } from "@/utils/locales.ts";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => {
        const locale = getCurrentLocale();
        const text = translations[locale];

        return (
          <MetaProvider>
            <Title>recettes</Title>
            <div class="flex min-h-screen flex-col bg-white px-[5vw] py-7 font-sans text-gray-800 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-50 max-[600px]:px-5 max-[600px]:py-5.5">
              <header class="flex w-full items-center justify-between">
                <Logo locale={locale} />
                <div class="flex items-center gap-2">
                  <ThemeToggle />
                  <LanguageSelect locale={locale} />
                </div>
              </header>

              <Suspense>{props.children}</Suspense>

              <footer class="flex items-center justify-between text-[.7rem] text-gray-500 dark:text-gray-400 max-[600px]:flex-wrap max-[600px]:items-start max-[600px]:gap-3.5">
                <p class="m-0">{text.everydayCooking}</p>
                <div class="flex gap-6 max-[600px]:gap-3.5">
                  <a class="hover:text-gray-800 dark:hover:text-gray-50" href="/search">
                    {text.recipes}
                  </a>
                  <a class="hover:text-gray-800 dark:hover:text-gray-50" href="/providers">
                    {text.providers}
                  </a>
                </div>
              </footer>
            </div>
          </MetaProvider>
        );
      }}
    >
      <FileRoutes />
    </Router>
  );
}
