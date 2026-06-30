"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Users, X, Search, CheckCircle } from "lucide-react";
import {
  addLookalike,
  removeLookalike,
  setCampaignType,
} from "@/features/campaign/campaignSlice";
import { lookalikeResults } from "@/features/campaign/mockData";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

export default function LookalikeSection({ onComplete }) {
  const dispatch = useDispatch();
  const selected = useSelector((s) => s.campaigns.selectedLookalike);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearch] = useState("");

  const filtered = lookalikeResults.filter(
    (r) => r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (item) => {
    dispatch(addLookalike(item));
    setModalOpen(false);
    setSearch("");
  };

  const handleRemove = (id) => dispatch(removeLookalike(id));

  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((item) => (
            <Badge key={item.id} variant="info" className="flex items-center gap-1.5 pr-1">
              {item.name}
              <button onClick={() => handleRemove(item.id)} className="ml-0.5 rounded-full p-0.5 hover:bg-white/20">
                <X size={10} />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <Button size="sm" variant="secondary" icon={Users} onClick={() => setModalOpen(true)}>
          {selected.length > 0 ? "Add More" : "Select Audience List"}
        </Button>
        {selected.length > 0 && (
          <Button size="sm" onClick={() => { dispatch(setCampaignType("leads")); onComplete(); }} icon={CheckCircle}>
            Confirm Selection
          </Button>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Lookalike Audiences" size="lg" backdropBlur>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Select a lookalike list for this campaign</p>

        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search audiences..."
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[5px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] py-2.5 pl-9 pr-3 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-xs focus:border-[var(--color-primary)] transition-colors"
            autoFocus
          />
        </div>

        {filtered.length === 0 ? (
          <div className="py-14 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
              <Users size={32} className="text-[var(--color-primary)]" />
            </div>
            <p className="text-base font-semibold text-[var(--color-text-primary)] mb-1">You don&apos;t have any leads</p>
            <p className="text-sm text-[var(--color-text-muted)] mb-5">Create a lead list to start running campaigns</p>
            <Button onClick={() => setModalOpen(false)}>Create a List</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pb-2">
            {filtered.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ scale: 1.02 }}
                onClick={() => handleSelect(item)}
                className="flex items-start gap-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left transition-all hover:border-[var(--color-primary)]/40 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                  <Users size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{item.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{item.description}</p>
                  <p className="text-[11px] text-[var(--color-success)] font-medium mt-1">{item.size.toLocaleString()}+ Users in the List</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-end gap-3 border-t border-[var(--color-border)] pt-4">
          <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
          {filtered.length > 0 && <Button size="sm" onClick={() => setModalOpen(false)}>Select List</Button>}
        </div>
      </Modal>
    </motion.div>
  );
}
