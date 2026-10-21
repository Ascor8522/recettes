import { LidlRecipeProvider } from "@/models/recipe/providers/lidl.ts";
import {
  BaseProvider,
  CommonSearchCriteria,
} from "@/models/recipe/providers/recipe_provider.ts";

export enum Provider {
  LIDL = "LIDL",
  COLRUYT = "COLRUYT",
  DELHAIZE = "DELHAIZE",
  CARREFOUR = "CARREFOUR",
  SPAR = "SPAR",
  LOUIS_DELHAIZE = "LOUIS_DELHAIZE",
}

export interface ProviderInfo {
  name: string;
  logo: string;
  color: string;
  recipesUrl: string;
  fetcher?: BaseProvider<unknown, unknown>;
}

export const providerMetadata: Record<Provider, ProviderInfo> = {
  [Provider.LIDL]: {
    name: "Lidl",
    logo: "/logos/lidl.svg",
    color: "#f2d400",
    recipesUrl: "https://recipes.lidl.com/",
    fetcher: new LidlRecipeProvider(),
  },
  [Provider.COLRUYT]: {
    name: "Colruyt",
    logo: "/logos/colruyt.svg",
    color: "#f28c28",
    recipesUrl: "https://www.colruyt.be/fr/recettes",
  },
  [Provider.DELHAIZE]: {
    name: "Delhaize",
    logo: "/logos/delhaize.svg",
    color: "#d9363e",
    recipesUrl: "https://www.delhaize.be/fr/recettes",
  },
  [Provider.CARREFOUR]: {
    name: "Carrefour",
    logo: "/logos/carrefour.svg",
    color: "#1476d4",
    recipesUrl: "https://www.carrefour.be/fr/recettes",
  },
  [Provider.SPAR]: {
    name: "Spar",
    logo: "/logos/spar.svg",
    color: "#2f9e44",
    recipesUrl: "https://www.monspar.be/recettes",
  },
  [Provider.LOUIS_DELHAIZE]: {
    name: "Louis Delhaize",
    logo: "/logos/louis-delhaize.svg",
    color: "#93c01f",
    recipesUrl:
      "https://louisdelhaize.be/recettes-et-chroniques/recettes-louis-delhaize/",
  },
};

export async function searchRecipes(
  criteria: CommonSearchCriteria,
) {
  const fetchers = Object.values(providerMetadata)
    .map(({ fetcher }) => fetcher)
    .filter((fetcher): fetcher is BaseProvider<unknown, unknown> => !!fetcher);
  const promises = fetchers.map(async (fetcher) => {
    const providerCriteria = fetcher.customizeCriteria(criteria);
    const { results, hasMoreResults } = await fetcher.doSearch(
      providerCriteria,
    );
    return {
      recipes: fetcher.normalizeResults(results),
      hasMoreResults,
    };
  });
  const results = await Promise.allSettled(
    promises,
  );

  const successfulResults = results.flatMap((result) =>
    result.status === "fulfilled" ? [result.value] : []
  );

  return {
    recipes: successfulResults.flatMap(({ recipes }) => recipes),
    hasMoreResults: successfulResults.some(({ hasMoreResults }) =>
      hasMoreResults
    ),
  };
}
