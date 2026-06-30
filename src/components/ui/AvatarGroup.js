const sizeConfig = {
  sm: { avatar: "h-6 w-6 text-[9px] ring-1", overlap: "-ml-1.5", icon: 10 },
  md: { avatar: "h-8 w-8 text-xs ring-2", overlap: "-ml-2", icon: 12 },
  lg: { avatar: "h-10 w-10 text-sm ring-2", overlap: "-ml-2.5", icon: 14 },
  xl: { avatar: "h-12 w-12 text-base ring-2", overlap: "-ml-3", icon: 16 },
};

const colors = [
  "bg-[var(--color-primary)]",
  "bg-[var(--color-success)]",
  "bg-[var(--color-warning)]",
  "bg-[var(--color-danger)]",
  "bg-[var(--color-text-primary)]",
  "bg-[#8BA6FF]",
];

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function AvatarGroup({
  users = [],
  max = 4,
  size = "md",
  showCount = true,
  className = "",
}) {
  const s = sizeConfig[size] || sizeConfig.md;
  const visible = users.slice(0, max);
  const overflow = users.length - max;

  return (
    <div className={`flex items-center ${className}`}>
      {visible.map((user, i) => (
        <div
          key={user.id || i}
          className={[
            s.avatar,
            s.overlap,
            "rounded-full border-[var(--color-surface)] flex items-center justify-center font-semibold shrink-0",
            colors[i % colors.length],
            "text-white",
            i === 0 && "ml-0",
          ]
            .filter(Boolean)
            .join(" ")}
          title={user.name || user.email}
          aria-label={user.name || user.email}
        >
          {user.src ? (
            <img src={user.src} alt={user.name} className="rounded-full object-cover w-full h-full" />
          ) : (
            getInitials(user.name || user.email || "?")
          )}
        </div>
      ))}
      {overflow > 0 && showCount && (
        <div
          className={[
            s.avatar,
            s.overlap,
            "rounded-full border-[var(--color-surface)] bg-[var(--color-border)] text-[var(--color-text-body)] flex items-center justify-center font-semibold shrink-0",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
