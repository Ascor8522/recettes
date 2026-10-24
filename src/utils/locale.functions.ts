import { createServerFn } from "@tanstack/solid-start";
import { getRequestHeader } from "@tanstack/solid-start/server";

export const getAcceptLanguage = createServerFn({ method: "GET" }).handler(
  () => getRequestHeader("accept-language") ?? "",
);
