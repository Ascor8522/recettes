import { Meta, Title } from "@solidjs/meta";
import { SearchBar } from "@/components/SearchBar.tsx";
import { Search } from "@/components/icons/Search.tsx";
import { getCurrentLocale, translations } from "@/utils/locales.ts";

export default function Home() {
  const locale = getCurrentLocale();
  const text = translations[locale];

  return (
    <>
      <Title>{text.homeTitle}</Title>
      <Meta name="description" content={text.homeDescription} />

      <main class="mx-auto flex w-full max-w-170 flex-1 flex-col justify-center text-center">
        <h1
          class="m-0 text-[clamp(2.4rem,6vw,4rem)] font-semibold tracking-tighter"
          style="view-transition-name: page-title"
        >
          {text.searchLabel}
        </h1>

        <p class="mx-auto my-4.5 mb-8.5 text-[.95rem] leading-normal text-gray-500 dark:text-gray-400 max-[600px]:leading-6">
          {text.searchIntro}
        </p>

        <SearchBar action="/search" method="get" buttonLabel={text.searchButton}>
          <label class="sr-only" for="recipe-search">
            {text.searchButton}
          </label>
          <Search class="mr-3.5 w-5 shrink-0 stroke-gray-500 dark:stroke-gray-400" />
          <input
            class="min-w-0 flex-1 border-0 leading-10 bg-transparent text-[.92rem] text-gray-800 outline-none placeholder:text-gray-500 dark:text-gray-50 dark:placeholder:text-gray-400"
            id="recipe-search"
            name="q"
            type="search"
            placeholder={text.searchPlaceholder}
            autocomplete="off"
          />
          <input type="hidden" name="lang" value={locale} />
        </SearchBar>
      </main>
    </>
  );
}
