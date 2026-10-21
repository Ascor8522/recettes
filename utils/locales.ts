import de from "../locales/de.json" with { type: "json" };
import en from "../locales/en.json" with { type: "json" };
import fr from "../locales/fr.json" with { type: "json" };
import nl from "../locales/nl.json" with { type: "json" };

interface Translations {
  localeName: string;
  homeTitle: string;
  homeDescription: string;
  searchLabel: string;
  searchIntro: string;
  searchPlaceholder: string;
  searchButton: string;
  everydayCooking: string;
  recipes: string;
  recipesDescription: string;
  recipesIntro: string;
  providers: string;
  providersTitle: string;
  providersDescription: string;
  providersLabel: string;
  providersIntro: string;
  backToSearch: string;
  searchRecipes: string;
  time: string;
  difficulty: string;
  viewOriginalRecipe: string;
  loadMore: string;
  available: string;
  notSupportedYet: string;
  home: string;
  pagination: string;
  language: string;
}

export const translations = {
  fr,
  nl,
  de,
  en,
} satisfies Record<string, Translations>;

export const supportedLocales = Object.keys(translations);

export type Locale = keyof typeof translations;

export function getLocale(request: Request): Locale {
  const defaultLang = "en";
  const langParam = new URL(request.url).searchParams.get("lang");
  const acceptHeader = request.headers.get("accept-language")?.replace(
    "*",
    defaultLang,
  );

  return (langParam ?? acceptHeader ?? defaultLang)
    .split(",")
    .map((part) => part.split(";q="))
    .map(([lang, q]) => [lang, q ? Number(q) : 1] as const)
    .sort(([, a], [, b]) => b - a)
    .filter((t): t is [Locale, number] => supportedLocales.includes(t[0]))
    .map(([lang]) => lang)
    .shift()!;
}
