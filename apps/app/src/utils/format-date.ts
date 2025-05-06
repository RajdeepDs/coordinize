import { format } from "date-fns";

// format date to month, day
export function formatDate(date: Date): string {
  return format(date, "MMM d");
}

// format date to month, year
export function formatDateToMonthYear(date: Date): string {
  return format(date, "MMM yyyy");
}
