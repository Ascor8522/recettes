export interface MoonProps {
  class?: string;
}

export function Moon({ class: className = "" }: MoonProps) {
  return (
    <svg class={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" />
    </svg>
  );
}
