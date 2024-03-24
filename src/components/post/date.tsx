import { DateTime } from "luxon";
export async function PostDate({ created_at }: { created_at: string }) {
  return (
    <div>
      <span>{DateTime.fromISO(created_at).toRelative()}</span>
    </div>
  );
}
