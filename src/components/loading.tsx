import { MoreHorizontal } from "lucide-react";

export function Loading() {
  return (
    <div className="w-full flex items-center justify-center py-16 animate-pulse">
      <MoreHorizontal />
    </div>
  );
}
