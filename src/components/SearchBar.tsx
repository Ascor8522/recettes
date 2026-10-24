import { useNavigate } from "@tanstack/solid-router";
import { ArrowRight } from "@/components/icons/ArrowRight.tsx";
import { Search } from "@/components/icons/Search.tsx";
import { Route as RootRoute } from "@/routes/__root.tsx";
import { translations } from "@/utils/locales.ts";
import { createSignal } from "solid-js";

export function SearchBar() {
  const navigate = useNavigate({ from: "/" });
  const rootData = RootRoute.useLoaderData();
  const locale = () => rootData().locale;
  const text = () => translations[locale()];
  const [query, setQuery] = createSignal("");

  function showResults() {
    void navigate({
      to: "/search",
      search: (previous) => ({
        ...previous,
        lang: locale(),
        q: query(),
      }),
    });
  }

  return (
    <div class="flex h-16.5 w-full items-center rounded-[7px] border border-gray-300 bg-white px-2 py-1.75 pl-5.25 text-left dark:border-gray-700 dark:bg-gray-900 max-[600px]:h-auto max-[600px]:min-h-15 max-[600px]:pl-4.25">
      <label class="sr-only" for="recipe-search">
        {text().searchButton}
      </label>
      <Search class="mr-3.5 w-5 shrink-0 stroke-gray-500 dark:stroke-gray-400" />
      <input
        class="min-w-0 flex-1 border-0 leading-10 bg-transparent text-[.92rem] text-gray-800 outline-none placeholder:text-gray-500 dark:text-gray-50 dark:placeholder:text-gray-400"
        id="recipe-search"
        type="search"
        placeholder={text().searchPlaceholder}
        autocomplete="off"
        value={query()}
        onInput={(event) => setQuery(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            showResults();
          }
        }}
      />
      <button
        class="flex h-12.5 items-center gap-3 rounded-[5px] border border-gray-300 bg-gray-800 px-5 pl-5.75 text-[.82rem] font-bold text-white transition-opacity hover:opacity-80 dark:border-gray-700 dark:bg-gray-50 dark:text-gray-950 max-[600px]:h-11.5 max-[600px]:w-12.25 max-[600px]:justify-center max-[600px]:px-0 cursor-pointer"
        type="button"
        aria-label={text().searchButton}
        onClick={showResults}
      >
        <span>{text().searchButton}</span>
        <ArrowRight class="w-4.25 stroke-current stroke-[1.8]" />
      </button>
    </div>
  );
}
