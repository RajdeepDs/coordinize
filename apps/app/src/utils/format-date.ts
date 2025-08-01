import { format } from 'date-fns';

// format date to relative time (e.g., "5m ago", "2h ago", "3d ago")
export function formatDate(date: Date | string): string {
  // Convert string to Date if needed
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Validate the date
  if (!dateObj || Number.isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  // Handle future dates or negative values
  if (diffInSeconds < 0) {
    return format(dateObj, 'MMM d');
  }

  if (diffInSeconds < 60) {
    // Show "now" instead of "0s ago" for very recent posts
    if (diffInSeconds < 5) {
      return 'now';
    }
    return `${diffInSeconds}s ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  // For dates older than a week, show the formatted date
  return format(dateObj, 'MMM d');
}

// format date to month, day (original function preserved)
export function formatDateToMonthDay(date: Date): string {
  return format(date, 'MMM d');
}

// format date to month, year
export function formatDateToMonthYear(date: Date): string {
  return format(date, 'MMM yyyy');
}
