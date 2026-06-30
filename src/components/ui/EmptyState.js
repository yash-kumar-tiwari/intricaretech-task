import { Inbox } from "lucide-react";
import Button from "./Button";

export default function EmptyState({
  icon: Icon,
  title = "No data found",
  description,
  actionLabel,
  onAction,
  size = "md",
  className = "",
}) {
  const IconComp = Icon || Inbox;

  const sizeStyles = {
    sm: { icon: 32, title: "text-sm", desc: "text-xs", gap: "gap-2", padding: "py-8" },
    md: { icon: 48, title: "text-base", desc: "text-sm", gap: "gap-3", padding: "py-12" },
    lg: { icon: 64, title: "text-lg", desc: "text-sm", gap: "gap-4", padding: "py-16" },
  };

  const s = sizeStyles[size] || sizeStyles.md;

  return (
    <div role="status" aria-live="polite" className={`flex flex-col items-center justify-center text-center ${s.padding} px-4 ${className}`}>
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[var(--color-border)] mb-2">
        <IconComp size={s.icon} className="text-[var(--color-text-muted)]" />
      </div>
      <h3 className={`${s.title} font-semibold text-[var(--color-text-primary)]`}>{title}</h3>
      {description && (
        <p className={`${s.desc} text-[var(--color-text-muted)] mt-1 max-w-sm`}>{description}</p>
      )}
      {actionLabel && onAction && (
        <div className="mt-4">
          <Button size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
