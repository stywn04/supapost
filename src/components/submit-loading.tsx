import { MoreHorizontal } from "lucide-react";

export function SubmitLoading() {
  return (
    <div className="w-full flex items-center justify-center animate-pulse">
      <MoreHorizontal />
    </div>
  );
}
