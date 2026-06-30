"use client";

import { Search, Users } from "lucide-react";
import Modal from "@/components/ui/Modal";

export default function LookalikeSearchModal({
  isOpen,
  onClose,
  query,
  onQueryChange,
  results,
  selectedIds,
  onToggleSelect,
}) {
  const filtered = results.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) &&
      !selectedIds.includes(r.id)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Search Lookalike Audience">
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9692A4]" />
        <input
          type="text"
          placeholder="Search audiences..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full rounded-[5px] border border-[#D8D6DE] py-2.5 pl-9 pr-3 text-sm text-[#444050] outline-none focus:border-[#3666EE] transition-colors"
          autoFocus
        />
      </div>
      <div className="max-h-64 space-y-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-[#9692A4] py-8">No results found</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-md px-3 py-2.5 hover:bg-[#F8F8F8] transition-colors cursor-pointer"
              onClick={() => onToggleSelect(item)}
              role="button"
              tabIndex={0}
            >
              <div>
                <p className="text-sm font-medium text-[#5E5873]">{item.name}</p>
                <p className="text-xs text-[#9692A4]">{item.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-[#9692A4]" />
                <span className="text-xs text-[#9692A4]">{item.size.toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}
