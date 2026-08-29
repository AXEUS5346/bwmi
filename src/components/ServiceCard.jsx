import { Link } from 'react-router-dom';

/**
 * NZ-style dual-link service tile.
 *
 * Props:
 *   service – { id, label, desc, icon, color, cols, learnHow, doItNow }
 *   variant – "tile" (home-page grid) | "list" (sidebar / compact)
 */

export default function ServiceCard({ service, variant = 'tile' }) {
  const {
    id,
    label,
    desc,
    icon,
    color = '#002b5c',
    cols = 1,
    learnHow,
    doItNow,
  } = service;

  /* ───────────────────────── tile variant ───────────────────────── */

  if (variant === 'tile') {
    const colSpan =
      cols === 2
        ? 'sm:col-span-2'
        : cols === 3
          ? 'sm:col-span-2 lg:col-span-3'
          : '';

    return (
      <div
        className={`
          group relative flex flex-col justify-between
          rounded-xl border border-slate-200 bg-white p-6 shadow-sm
          transition-all duration-200
          hover:border-mcaTeal hover:shadow-md
          ${colSpan}
        `}
      >
        {/* Icon */}
        <div className="mb-4 flex items-center justify-center">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full text-white text-lg"
            style={{ backgroundColor: color }}
          >
            <i className={`fa-solid ${icon}`} aria-hidden="true" />
          </span>
        </div>

        {/* Label */}
        <h3 className="mb-1 text-center text-lg font-semibold text-mcaNavy">
          {label}
        </h3>

        {/* Description */}
        <p className="mb-6 text-center text-sm text-slate-500">{desc}</p>

        {/* Dual links */}
        <div className="mt-auto flex flex-col items-center gap-3">
          <Link
            to={learnHow || `/help/${id}`}
            className="text-sm font-medium text-mcaTeal transition-colors hover:text-mcaTeal/80 hover:underline"
          >
            Learn how&nbsp;&rarr;
          </Link>

          <Link
            to={doItNow || `/${id}`}
            className="inline-block rounded-lg bg-mcaNavy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-mcaNavy/90"
          >
            File now&nbsp;&rarr;
          </Link>
        </div>
      </div>
    );
  }

  /* ───────────────────────── list variant ───────────────────────── */

  return (
    <div
      className="
        flex items-center gap-4 rounded-lg border border-slate-200 bg-white
        px-4 py-3 shadow-sm transition-all duration-200
        hover:border-mcaTeal hover:shadow-md
      "
    >
      {/* Icon */}
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-sm"
        style={{ backgroundColor: color }}
      >
        <i className={`fa-solid ${icon}`} aria-hidden="true" />
      </span>

      {/* Label & description */}
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold text-mcaNavy">{label}</h4>
        {desc && (
          <p className="truncate text-xs text-slate-500">{desc}</p>
        )}
      </div>

      {/* Single arrow link */}
      <Link
        to={doItNow || `/${id}`}
        className="shrink-0 text-sm font-medium text-mcaTeal transition-colors hover:text-mcaTeal/80 hover:underline"
        aria-label={`View all ${label}`}
      >
        View all&nbsp;&rarr;
      </Link>
    </div>
  );
}
