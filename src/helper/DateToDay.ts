// utils/dateHelpers.ts

export function getDayName(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" }); // e.g., "Friday"
  }
  