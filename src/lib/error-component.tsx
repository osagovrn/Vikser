import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "Обновите страницу. Если не откроется, позвоните +7 (473) 255-28-25.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message && /[а-яё]/i.test(error.message))
    return error.message;
  if (typeof error === "string" && /[а-яё]/i.test(error)) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main
      className={
        "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center " +
        "bg-[#05060a] text-[#f4f6fb]"
      }
    >
      <span className="text-red-500" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="text-lg font-semibold">Страница не открылась</h1>
      <p className="max-w-md text-sm break-words text-[#9aa3b5]">{errorMessage(error)}</p>
    </main>
  );
}
