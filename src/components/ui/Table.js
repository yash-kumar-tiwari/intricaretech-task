"use client";

import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

function SkeletonRow({ columns }) {
  return (
    <tr className="border-b border-[var(--color-border)]">
      {columns.map((col, i) => (
        <td key={col.key || i} className="px-4 py-3">
          <div className="h-4 bg-[var(--color-border)] rounded animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
        </td>
      ))}
    </tr>
  );
}

export default function Table({
  columns = [],
  data = [],
  renderRow,
  onRowClick,
  sortKey: externalSortKey,
  sortDirection: externalSortDir,
  onSort,
  loading = false,
  loadingRows = 5,
  emptyState,
  stickyHeader = false,
  className = "",
  rowClassName = "",
  "aria-label": ariaLabel = "Table",
}) {
  const [internalSortKey, setInternalSortKey] = useState(null);
  const [internalSortDir, setInternalSortDir] = useState("asc");

  const isControlled = externalSortKey !== undefined;
  const sortKey = isControlled ? externalSortKey : internalSortKey;
  const sortDir = isControlled ? externalSortDir : internalSortDir;

  const handleSort = (colKey) => {
    if (!colKey) return;
    if (isControlled) {
      onSort?.(colKey, sortKey === colKey && sortDir === "asc" ? "desc" : "asc");
    } else {
      if (internalSortKey === colKey) {
        setInternalSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setInternalSortKey(colKey);
        setInternalSortDir("asc");
      }
    }
  };

  const sorted = (() => {
    if (loading || !sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = typeof aVal === "number" ? aVal - bVal : String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });
  })();

  const SortIcon = ({ colKey }) => {
    if (!colKey) return null;
    if (sortKey !== colKey) return <ArrowUpDown size={12} className="text-[var(--color-text-muted)] ml-1 shrink-0" />;
    return sortDir === "asc"
      ? <ArrowUp size={12} className="text-[var(--color-primary)] ml-1 shrink-0" />
      : <ArrowDown size={12} className="text-[var(--color-primary)] ml-1 shrink-0" />;
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse" aria-label={ariaLabel}>
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={[
                  "px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap",
                  col.sortable && "cursor-pointer select-none hover:text-[var(--color-primary)] transition-colors",
                  stickyHeader && "sticky top-0 bg-[var(--color-surface)]",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ width: col.width }}
                onClick={() => col.sortable && handleSort(col.key)}
                aria-sort={
                  sortKey === col.key
                    ? sortDir === "asc" ? "ascending" : "descending"
                    : undefined
                }
                tabIndex={col.sortable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (col.sortable && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    handleSort(col.key);
                  }
                }}
              >
                <span className="inline-flex items-center">
                  {col.label}
                  {col.sortable && <SortIcon colKey={col.key} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: loadingRows }).map((_, i) => (
              <SkeletonRow key={i} columns={columns} />
            ))
          ) : sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12">
                {emptyState || (
                  <div className="text-center text-sm text-[var(--color-text-muted)]">No data found</div>
                )}
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => (
              <tr
                key={row.id || i}
                className={[
                  "border-b border-[var(--color-border)] transition-theme",
                  onRowClick ? "cursor-pointer hover:bg-[var(--color-surface-secondary)]" : "hover:bg-[var(--color-surface-secondary)]",
                  rowClassName,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onRowClick?.(row)}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={(e) => {
                  if (onRowClick && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onRowClick(row);
                  }
                }}
              >
                {renderRow ? (
                  renderRow(row)
                ) : (
                  columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm text-[var(--color-text-body)]">
                      {row[col.key]}
                    </td>
                  ))
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
