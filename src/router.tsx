import { QueryClient } from "@tanstack/solid-query";
import { createRouter } from "@tanstack/solid-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
      },
    },
  });

  return createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
  });
}

declare module "@tanstack/solid-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
