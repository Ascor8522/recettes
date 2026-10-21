import type { APIEvent } from "@solidjs/start/server";
import { searchRecipes } from "@/models/recipe/providers/index.ts";

function getPageParam(value: string | null): number {
  const page = Number(value ?? "0");
  return Number.isInteger(page) && page >= 0 ? page : 0;
}

export async function GET({ request }: APIEvent) {
  const url = new URL(request.url);
  const result = await searchRecipes({
    query: url.searchParams.get("q") ?? "",
    page: getPageParam(url.searchParams.get("page")),
  });
  return Response.json(result);
}
