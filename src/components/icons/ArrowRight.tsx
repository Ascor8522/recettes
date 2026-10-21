export interface ArrowRightProps {
  class?: string;
}

export function ArrowRight({ class: className = "" }: ArrowRightProps) {
  return (
    <svg class={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}
