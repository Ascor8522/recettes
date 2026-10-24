export interface ChipProps {
  label: string;
  value: string | number;
}

export function Chip(props: ChipProps) {
  return (
    <div class="flex items-center gap-1.25 rounded-full border border-gray-300 px-2 py-1 dark:border-gray-700">
      <dt class="text-[.62rem] text-gray-500 dark:text-gray-400">{props.label}</dt>
      <dd class="m-0 text-[.7rem] font-semibold whitespace-nowrap">{props.value}</dd>
    </div>
  );
}
