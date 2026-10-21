import { Auto } from "@/components/icons/Auto.tsx";
import { Moon } from "@/components/icons/Moon.tsx";
import { Sun } from "@/components/icons/Sun.tsx";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

type Theme = "auto" | "light" | "dark";
type ResolvedTheme = Exclude<Theme, "auto">;

function getPreferredTheme(): ResolvedTheme {
  return globalThis.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateTheme(theme: Theme) {
  document.body.dataset.theme = theme === "auto" ? getPreferredTheme() : theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = createSignal<Theme>("auto");

  onMount(() => {
    const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");
    const fn = () => updateTheme(theme());
    mediaQuery.addEventListener("change", fn);
    onCleanup(() => mediaQuery.removeEventListener("change", fn));
  });

  createEffect(() => updateTheme(theme()));

  const nextTheme = () =>
    (
      {
        auto: "light",
        light: "dark",
        dark: "auto",
      } as const
    )[theme()];

  return (
    <button
      class="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-50 cursor-pointer"
      type="button"
      aria-label={`Theme: ${theme()}. Switch to ${nextTheme()} theme`}
      title={`Theme: ${theme()}`}
      onClick={() => setTheme(nextTheme())}
    >
      {theme() === "auto" && <Auto class="w-4.5 stroke-current stroke-[1.7]" />}
      {theme() === "dark" && <Moon class="w-4.5 stroke-current stroke-[1.7]" />}
      {theme() === "light" && <Sun class="w-4.5 stroke-current stroke-[1.7]" />}
    </button>
  );
}
