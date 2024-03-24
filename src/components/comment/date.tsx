import { DateTime } from "luxon";

export function CommentDate({ created_at }: { created_at: string }) {
  return (
    <section className="text-sm text-zinc-700 flex justify-end mt-2">
      <span>{DateTime.fromISO(created_at).toRelative()}</span>
    </section>
  );
}
