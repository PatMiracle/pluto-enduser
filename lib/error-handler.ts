import { AxiosError } from "axios";
import { toast } from "sonner";

export default function defaultErrorHandler(error: unknown) {
  let message = "An unexpected error occurred";
  let detail = "";

  // Axios error (network or API error)
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    // API returns { error: "...", detail: ... }
    if (data && typeof data === "object") {
      if ("error" in data && typeof (data as any).error === "string") {
        message = (data as any).error;
      } else if (
        "message" in data &&
        typeof (data as any).message === "string"
      ) {
        message = (data as any).message;
      }

      if ("detail" in data) {
        detail = (data as any).detail;
      }
    }

    // If no server message, fallback to Axios default
    if (!message && error.message) {
      message = error.message;
    }
  }

  // Standard JS Error
  else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(
    message,
    detail ? { description: formatDetail(detail) } : undefined,
  );

  console.error("API Error:", error);
}

function formatDetail(
  detail: string | string[] | Record<string, string | string[]>,
): string {
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.join("\n");

  if (detail && typeof detail === "object") {
    return Object.entries(detail)
      .map(([key, value]) => {
        if (Array.isArray(value)) return `${key}: ${value.join(", ")}`;
        return `${key}: ${value}`;
      })
      .join("\n");
  }

  return "";
}
