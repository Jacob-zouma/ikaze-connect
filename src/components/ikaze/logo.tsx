export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand">
      <svg
        className="brand-icon"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 9v22M16 9v22M18 20 29 9M18 20l11 11"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="31" cy="9" r="4" className="logo-node" />
        <circle cx="31" cy="31" r="4" className="logo-node" />
      </svg>
      {!compact && (
        <span>
          IKAZE
          <span className="brand-connect">
            CONNECT<span className="brand-dot">.</span>
          </span>
        </span>
      )}
    </span>
  );
}
