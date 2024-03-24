import { MoreHorizontal } from "lucide-react";

export function LoadingSkeleton() {
  return (
    <div className="w-full flex items-center justify-center py-10 animate-pulse">
      <MoreHorizontal />
    </div>
  );
}
