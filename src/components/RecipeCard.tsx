import { Chip } from "@/components/Chip.tsx";
import { ArrowRight } from "@/components/icons/ArrowRight.tsx";
import type { Recipe } from "@/models/recipe/index.ts";
import { providerMetadata } from "@/models/recipe/providers/index.ts";
import { formatTime } from "@/models/time.ts";
import type { Locale } from "@/utils/locales.ts";
import { translations } from "@/utils/locales.ts";

export interface RecipeCardProps {
  recipe: Recipe;
  locale: Locale;
}

export function RecipeCard(props: RecipeCardProps) {
  const providerInfo = providerMetadata[props.recipe.provider];

  return (
    <article class="overflow-hidden rounded-[7px] border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div class="aspect-2/1 w-full bg-gray-200 dark:bg-gray-800">
        <img
          class="block h-full w-full object-cover"
          src={props.recipe.coverImageUrl}
          alt=""
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          sizes="(max-width: 480px) 100vw, (max-width: 600px) 50vw, 33vw"
        />
      </div>
      <div class="flex flex-col gap-2 p-4">
        <div class="flex min-h-8 items-center gap-2.25">
          <img
            class="h-4 w-4 shrink-0 object-contain"
            src={providerInfo.logo}
            alt={providerInfo.name}
          />
          <h2 class="m-0 text-base font-semibold leading-tight tracking-[-.02em]">
            {props.recipe.title}
          </h2>
        </div>

        <dl class="flex gap-3 flex-wrap">
          <Chip
            label={translations[props.locale].time}
            value={formatTime(props.recipe.time, props.locale)}
          />
          <Chip label={translations[props.locale].difficulty} value={props.recipe.difficulty} />
        </dl>

        <br />

        <a
          class="flex items-center gap-2.5 self-end text-[.78rem] font-semibold hover:text-gray-500 dark:hover:text-gray-400"
          href={props.recipe.originalRecipeUrl}
          target="_blank"
          rel="noreferrer"
        >
          {translations[props.locale].viewOriginalRecipe}
          <ArrowRight class="w-4 stroke-current stroke-[1.8]" />
        </a>
      </div>
    </article>
  );
}
