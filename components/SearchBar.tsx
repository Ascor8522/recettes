import { ArrowRight } from "@/components/icons/ArrowRight.tsx";
import type { ComponentChildren } from "preact";

export interface SearchBarProps {
  action: string;
  method: "get" | "post";
  buttonLabel: string;
  children: ComponentChildren;
}

export function SearchBar(
  { action, method, buttonLabel, children }: SearchBarProps,
) {
  return (
    <form
      class="flex h-16.5 w-full items-center rounded-[7px] border border-gray-300 bg-white px-2 py-1.75 pl-5.25 text-left dark:border-gray-700 dark:bg-gray-900 max-[600px]:h-auto max-[600px]:min-h-15 max-[600px]:pl-4.25"
      action={action}
      method={method}
    >
      {children}
      <button
        class="flex h-12.5 items-center gap-3 rounded-[5px] border border-gray-300 bg-gray-800 px-5 pl-5.75 text-[.82rem] font-bold text-white transition-opacity hover:opacity-80 dark:border-gray-700 dark:bg-gray-50 dark:text-gray-950 max-[600px]:h-11.5 max-[600px]:w-12.25 max-[600px]:justify-center max-[600px]:px-0 cursor-pointer"
        type="submit"
        aria-label={buttonLabel}
      >
        <span>{buttonLabel}</span>
        <ArrowRight class="w-4.25 stroke-current stroke-[1.8]" />
      </button>
    </form>
  );
}
