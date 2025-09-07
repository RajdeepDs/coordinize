import slugify from "@sindresorhus/slugify";
import { env } from "@/env";

export const WEB_URL: string = env.NEXT_PUBLIC_WEB_URL;

/**
 * Converts a string to URL-friendly slug format
 * @param str - The string to convert
 * @returns The slugified string
 */
export function toSlug(str: string): string {
  return slugify(str);
}
