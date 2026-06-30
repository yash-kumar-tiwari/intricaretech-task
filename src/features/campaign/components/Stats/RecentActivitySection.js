"use client";

import { Play, MessageCircle, Send, Users, PauseCircle, Activity, ExternalLink } from "lucide-react";
import Card from "@/components/ui/Card";

const timelineIconMap = {
  Play: (props) => <Play {...props} />,
  MessageCircle: (props) => <MessageCircle {...props} />,
  Send: (props) => <Send {...props} />,
  UserCheck: (props) => <Users {...props} />,
  PauseCircle: (props) => <PauseCircle {...props} />,
};

export default function RecentActivitySection({ activities }) {
  return (
    <Card className="p-5 rounded-xl border-[var(--color-border)]">
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-5">
        Recent Campaign Activity
      </h3>
      <div className="space-y-0">
        {activities.map((activity, idx) => {
          const IconComp = timelineIconMap[activity.icon] || Activity;
          const isLast = idx === activities.length - 1;
          return (
            <div key={idx} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full shrink-0"
                  style={{ backgroundColor: `${activity.color}15` }}
                >
                  <IconComp
                    size={14}
                    style={{ color: activity.color }}
                  />
                </div>
                {!isLast && (
                  <div
                    className="w-px flex-1 bg-[var(--color-border)]"
                    style={{ minHeight: 32 }}
                  />
                )}
              </div>
              <div className={`${isLast ? "" : "pb-5"}`}>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {activity.time}
                </p>
                <p className="text-sm font-semibold text-[var(--color-text-primary)] mt-0.5">
                  {activity.message}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {activity.actor}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <button className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline font-medium">
        Open Activity Log <ExternalLink size={10} />
      </button>
    </Card>
  );
}
