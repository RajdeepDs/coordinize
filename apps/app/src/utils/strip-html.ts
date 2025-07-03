// Utility function to strip HTML tags and decode basic HTML entities
export const stripHtml = (html: string): string => {
  const withoutTags = html.replace(/<[^>]*>/g, ' ');

  // Decode basic HTML entities
  const entityMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };

  return withoutTags
    .replace(/&[a-z0-9#]+;/gi, (entity) => {
      return entityMap[entity] || entity;
    })
    .trim();
};
