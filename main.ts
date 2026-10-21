import { getLocale } from "@/utils/locales.ts";
import { define, State } from "@/utils/utils.ts";
import { App, staticFiles } from "fresh";

export const app = new App<State>();

app.use(define.middleware((ctx) => {
  ctx.state.locale = getLocale(ctx.req);
  return ctx.next();
}));

app.use(staticFiles());

app.fsRoutes();
