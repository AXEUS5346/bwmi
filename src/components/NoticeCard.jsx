import { Link } from 'react-router-dom';

/**
 * NZ-style notice / circular / news display.
 *
 * Props:
 *   notice  – { id, date, title, category, important }
 *   variant – "card" | "list-item" (default "list-item")
 */

const CATEGORY_STYLES = {
  Notification: 'bg-blue-50 text-blue-700',
  Circular: 'bg-purple-50 text-purple-700',
  Amendment: 'bg-amber-50 text-amber-700',
  Update: 'bg-green-50 text-green-700',
};

function CategoryBadge({ category, size = 'sm' }) {
  const base =
    'inline-block rounded-full font-medium uppercase tracking-wide';
  const sizing = size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs';
  const color = CATEGORY_STYLES[category] || 'bg-slate-100 text-slate-600';

  return (
    <span className={`${base} ${sizing} ${color}`}>{category}</span>
  );
}

export default function NoticeCard({ notice, variant = 'list-item' }) {
  const { id, date, title, category, important } = notice;

  /* ───────────────────── list-item variant ───────────────────── */

  if (variant === 'list-item') {
    return (
      <div
        className="
          border-b border-slate-200 py-3
          transition-colors duration-150
          hover:bg-slate-50
        "
      >
        {/* Top row: category pill + date */}
        <div className="mb-1 flex items-center gap-2">
          <CategoryBadge category={category} size="xs" />
          <span className="text-xs text-slate-400">{date}</span>

          {important && (
            <span
              className="inline-block h-2 w-2 rounded-full bg-amber-500"
              title="Important"
              aria-label="Important notice"
            />
          )}
        </div>

        {/* Title */}
        <Link
          to={`/notices/${id}`}
          className="
            text-sm font-semibold text-mcaNavy
            transition-colors duration-150
            hover:text-mcaTeal hover:underline
          "
        >
          {title}
        </Link>
      </div>
    );
  }

  /* ───────────────────── card variant ───────────────────── */

  return (
    <div
      className="
        flex flex-col gap-3 rounded-lg border border-slate-200 bg-white
        p-5 shadow-sm
        transition-all duration-200
        hover:border-mcaTeal hover:shadow-md
      "
    >
      {/* Category badge */}
      <CategoryBadge category={category} />

      {/* Title */}
      <h3 className="text-base font-semibold text-mcaNavy">{title}</h3>

      {/* Date */}
      <span className="text-xs text-slate-400">{date}</span>

      {important && (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
          Important
        </span>
      )}

      {/* Read more */}
      <Link
        to={`/notices/${id}`}
        className="
          mt-1 text-sm font-medium text-mcaTeal
          transition-colors duration-150
          hover:text-mcaTeal/80 hover:underline
        "
      >
        Read more&nbsp;&rarr;
      </Link>
    </div>
  );
}
