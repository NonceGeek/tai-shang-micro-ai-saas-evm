import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING_MATCH":
      return "status-pending-match";
    case "AWAITING_ACCEPTANCE":
      return "status-awaiting-acceptance";
    case "IN_PROGRESS":
      return "status-in-progress";
    case "COMPLETED":
      return "status-completed";
    case "REJECTED":
      return "status-rejected";
    case "TIMEOUT":
      return "status-timeout";
    case "NO_MATCH_FOUND":
      return "status-no-match-found";
    case "EXPIRED":
      return "status-expired";
    default:
      return "status-default";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "PENDING_MATCH":
      return "Pending Match";
    case "AWAITING_ACCEPTANCE":
      return "Awaiting Acceptance";
    case "IN_PROGRESS":
      return "In Progress";
    case "COMPLETED":
      return "Completed";
    case "REJECTED":
      return "Rejected";
    case "TIMEOUT":
      return "Timeout";
    case "NO_MATCH_FOUND":
      return "No Match Found";
    case "EXPIRED":
      return "Expired";
    default:
      return status;
  }
};

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ||'https://ai-saas-hyperhack.deno.dev';
}
