import { FieldError } from "react-hook-form";

export function ErrorField({ error }: { error: FieldError | undefined }) {
  return error ? <span className="text-red-700">{error.message}</span> : null;
}
