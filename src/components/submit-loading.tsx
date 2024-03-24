import { MoreHorizontal } from "lucide-react";

export function SubmitLoading() {
  return (
    <div className="flex items-center justify-center animate-pulse">
      <MoreHorizontal />
    </div>
  );
}
