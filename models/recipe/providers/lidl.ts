import { Difficulty } from "@/models/recipe/difficulty.ts";
import { Provider } from "@/models/recipe/providers/index.ts";
import {
  BaseProvider,
  CommonSearchCriteria,
  CommonSearchResult,
  ProviderSearchResponse,
} from "@/models/recipe/providers/recipe_provider.ts";

export class LidlRecipeProvider
  extends BaseProvider<LidlSearchCriteria, LidlSearchResult> {
  private static readonly API_URL =
    "https://recipes-core-api-stackit.recipes.lidl/api/v1/search/recipes/teasers";

  public name = Provider.LIDL;

  public override doSearch(
    criteria: LidlSearchCriteria,
  ): Promise<ProviderSearchResponse<LidlSearchResult>> {
    return fetch(
      this.buildSearchUrl(criteria),
      { headers: { "Accept-Language": "fr-BE" } },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Lidl recipe search failed (${response.status})`);
        }
        return response.json() as Promise<{
          total: number;
          page_number: number;
          recipes_per_page: number;
          total_amount_of_pages: number;
          indexUsed: string;
          recipes?: LidlSearchResult[];
          facets: {
            collections: [];
            courses: [];
            diets: [];
            difficulties: [];
            foodTypes: [];
            regions: [];
            chefs: [];
            smartTools: [];
            traditionalTools: [];
          };
        }>;
      })
      .then(({ recipes, page_number, total_amount_of_pages }) => ({
        results: recipes ?? [],
        hasMoreResults: page_number < total_amount_of_pages,
      }));
  }

  protected buildSearchUrl(
    { q, page, size, sortBy, locale: _locale, ...rest }: LidlSearchCriteria,
  ): string {
    const query = new URLSearchParams();
    if (q) query.set("q", q);
    if (page !== undefined) query.set("page", String(page + 1));
    if (size !== undefined) query.set("size", String(size));
    if (sortBy) query.set("sortBy", sortBy);

    for (
      const [name, values] of Object.entries(rest) as [
        string,
        string[] | undefined,
      ][]
    ) {
      if (values?.length) query.set(name, values.join(","));
    }

    return `${LidlRecipeProvider.API_URL}?${query}`;
  }

  public override customizeCriteria(
    criteria: CommonSearchCriteria,
  ): LidlSearchCriteria {
    return {
      q: criteria.query,
      page: criteria.page,
      size: criteria.size,
    };
  }

  public override normalizeResults(
    results: LidlSearchResult[],
  ): CommonSearchResult[] {
    const difficulties = {
      1: Difficulty.Easy,
      2: Difficulty.Medium,
      3: Difficulty.Hard,
    };
    return results
      .map((recipe) => {
        return {
          title: recipe.name,
          coverImageUrl:
            `https://cdn.recipes.lidl/images-v2/${recipe.imageInfo.prefix}/${recipe.imageInfo.name}`,
          provider: Provider.LIDL,
          time: {
            type: "exact",
            amount: { minutes: recipe.preparationTime + recipe.cookingTime },
          },
          difficulty: difficulties[recipe.difficulty],
          originalRecipeUrl: `https://recipes.lidl.be/recipes/${recipe.slug}`,
        };
      });
  }
}

export interface LidlSearchCriteria {
  locale?: string;
  q?: string;
  page?: number;
  size?: number;
  courses?: string[];
  foodTypes?: string[];
  regions?: string[];
  collections?: string[];
  diets?: string[];
  smartTools?: string[];
  sortBy?: LidlSort;
  chefs?: string[];
}

export interface LidlSearchResult {
  id: string;
  name: string;
  slug: string;
  preparationTime: number;
  cookingTime: number;
  difficulty: 1 | 2 | 3;
  imageInfo: {
    name: string;
    prefix: string;
  };
}

export type LidlSort =
  | "difficulty"
  | "total_time"
  | "newest"
  | "relevance";
