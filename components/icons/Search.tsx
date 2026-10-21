export interface IconProps {
  class?: string;
}

export function Search({ class: className = "" }: IconProps) {
  return (
    <svg
      class={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 5 5" />
    </svg>
  );
}
