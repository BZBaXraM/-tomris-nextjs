export function StudioStar({ className = "" }: { className?: string }) {
  return (
    <svg className={`studio-star ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d="M50 3V97M3 50H97M17 17L83 83M17 83L83 17" stroke="currentColor" strokeWidth="6" />
    </svg>
  );
}
