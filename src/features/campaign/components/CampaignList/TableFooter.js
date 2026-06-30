export default function TableFooter({
  filteredCount,
  selectedCount,
  onClearSelection,
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
      <span>
        {selectedCount > 0
          ? `${selectedCount} of ${filteredCount} selected`
          : `${filteredCount} campaigns`}
      </span>
      {selectedCount > 0 && (
        <button
          onClick={onClearSelection}
          className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors font-medium"
        >
          Clear selection
        </button>
      )}
    </div>
  );
}
