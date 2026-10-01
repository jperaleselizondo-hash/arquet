export const ARQUET_MARK_PATH =
  "M597 287 A30 30 0 0 1 657 287 L718 582 A78 78 0 0 0 780 708 L1000 893 A34 34 0 0 1 966 950 L697 857 A74 74 0 0 0 557 857 L288 950 A34 34 0 0 1 254 893 L475 708 A78 78 0 0 0 537 582 Z";

export default function ArquetMark({
  className = "",
  strokeWidth = 36,
  title,
}) {
  return (
    <svg
      className={`arquetMark ${className}`.trim()}
      viewBox="212 197 830 830"
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        d={ARQUET_MARK_PATH}
        pathLength="1"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
