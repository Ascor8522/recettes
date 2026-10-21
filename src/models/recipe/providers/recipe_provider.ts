import type { Recipe } from "@/models/recipe/index.ts";
import { Provider } from "@/models/recipe/providers/index.ts";

export abstract class BaseProvider<C, R> {
  public abstract name: Provider;

  public abstract doSearch(criteria: C): Promise<ProviderSearchResponse<R>>;

  public abstract customizeCriteria(criteria: CommonSearchCriteria): C;

  public abstract normalizeResults(results: R[]): CommonSearchResult[];
}

export interface CommonSearchCriteria {
  query: string;
  page: number;
  size?: number;
}

export type CommonSearchResult = Recipe;

export interface ProviderSearchResponse<R> {
  results: R[];
  hasMoreResults: boolean;
}
