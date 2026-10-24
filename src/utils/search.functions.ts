import { createServerFn } from "@tanstack/solid-start";
import { searchRecipes } from "@/models/recipe/providers/index.ts";

export interface SearchInput {
  query: string;
  page: number;
}

export const getSearchResults = createServerFn({ method: "GET" })
  .validator((input: SearchInput) => ({
    query: input.query,
    page: Number.isInteger(input.page) && input.page >= 0 ? input.page : 0,
  }))
  .handler(({ data }) => searchRecipes(data));
