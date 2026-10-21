import { Difficulty } from "@/models/recipe/difficulty.ts";
import { Provider } from "@/models/recipe/providers/index.ts";
import { Time } from "@/models/time.ts";

export interface Recipe {
  title: string;
  coverImageUrl: string;
  provider: Provider;
  time: Time;
  difficulty: Difficulty;
  originalRecipeUrl: string;
}
