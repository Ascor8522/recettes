import { Locale } from "@/utils/locales.ts";
import { createDefine } from "fresh";

export const define = createDefine<State>();

export interface State {
  locale: Locale;
}
