import { Pause, Play } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default function StatusBadge({ status }) {
  const isActive = status === "active";

  return (
    <Badge variant={isActive ? "success" : "error"}>
      {isActive ? <Pause size={11} /> : <Play size={11} />}
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}
