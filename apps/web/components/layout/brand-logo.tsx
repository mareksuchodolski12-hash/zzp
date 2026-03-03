interface BrandLogoProps {
  inverted?: boolean;
}

export function BrandLogo({ inverted = false }: BrandLogoProps) {
  const iconClasses = inverted
    ? 'text-blue-300'
    : 'text-primary';

  const primaryTextClasses = inverted
    ? 'text-white'
    : 'text-gray-900';

  const secondaryTextClasses = inverted
    ? 'text-gray-400'
    : 'text-gray-600';

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border ${
          inverted ? 'border-blue-900/70 bg-blue-950/40' : 'border-blue-100 bg-blue-50'
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-4.5 w-4.5 ${iconClasses}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3L4.5 6V11.2C4.5 16.3 7.6 20.9 12 22C16.4 20.9 19.5 16.3 19.5 11.2V6L12 3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.2 8L9.8 12H12.4L10.8 16L14.2 12H11.6L13.2 8Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="inline-flex items-baseline gap-1 leading-none">
        <span className={`text-2xl font-extrabold tracking-tight ${primaryTextClasses}`}>ZZP</span>
        <span className={`text-2xl font-semibold tracking-tight ${secondaryTextClasses}`}>Website</span>
      </span>
    </span>
  );
}
