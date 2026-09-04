import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  total: number;
  totalPages: number;
  limit?: number;
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  total,
  totalPages,
  limit = 5,
  page,
  setPage,
}: PaginationProps) {
  const startIndex = total === 0 ? 0 : (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, total);

  function getPaginationPages(current: number, total: number) {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  }

  if (total === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border border-brand-border bg-brand-card px-6 py-4 mt-6 rounded-xl shadow-sm gap-4 sm:gap-0">
      {/* Result */}
      <div className="text-sm text-brand-text/80">
        Showing{" "}
        <span className="font-semibold text-brand-heading">{startIndex}</span>{" "}
        to <span className="font-semibold text-brand-heading">{endIndex}</span>{" "}
        of <span className="font-semibold text-brand-heading">{total}</span>{" "}
        results
      </div>

      <nav aria-label="Pagination" className="inline-flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          disabled={page <= 1}
          onClick={() => setPage(Math.max(page - 1, 1))}
          className="inline-flex items-center justify-center h-9 px-3.5 text-sm font-medium border border-brand-border text-brand-text bg-brand-card hover:bg-brand-accent-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
        >
          <ChevronLeft className="size-4 mr-1" />
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="hidden md:inline-flex items-center gap-1 px-1">
          {getPaginationPages(page, totalPages).map((p, idx) =>
            p === "..." ? (
              <span
                key={`dots-${idx}`}
                className="px-2 py-1 text-sm text-brand-text/40 select-none"
              >
                •••
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p as number)}
                className={`inline-flex items-center justify-center size-9 text-sm font-semibold rounded-lg border transition-all duration-150 cursor-pointer ${
                  page === p
                    ? "bg-brand-accent text-white border-brand-accent shadow-xs scale-105"
                    : "border-brand-border text-brand-text bg-brand-card hover:bg-brand-accent-bg"
                }`}
              >
                {p}
              </button>
            ),
          )}
        </div>

        {/* Next Button */}
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(Math.min(page + 1, totalPages))}
          className="inline-flex items-center justify-center h-9 px-3.5 text-sm font-medium rounded-lg border border-brand-border text-brand-text bg-brand-card hover:bg-brand-accent-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="size-4 ml-1" />
        </button>
      </nav>
    </div>
  );
}
