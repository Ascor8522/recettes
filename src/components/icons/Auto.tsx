export interface AutoProps {
  class?: string;
}

export function Auto({ class: className = "" }: AutoProps) {
  return (
    <svg class={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="15" rx="2" />
      <path d="M8 22h8m-4-3v3" />
    </svg>
  );
}
