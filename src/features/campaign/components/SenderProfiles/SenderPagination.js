"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SenderPagination({ currentPage, totalPages, onPageChange, start, end, total }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4">
      <span className="text-xs text-[var(--color-text-muted)]">
        Showing {start}–{end} of {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center justify-center h-8 w-8 rounded text-sm text-[var(--color-text-body)] hover:bg-[var(--color-border)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`flex items-center justify-center h-8 min-w-[32px] rounded text-sm font-medium transition-colors ${
              p === currentPage ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-body)] hover:bg-[var(--color-border)]"
            }`}
            aria-label={`Page ${p}`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center justify-center h-8 w-8 rounded text-sm text-[var(--color-text-body)] hover:bg-[var(--color-border)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
