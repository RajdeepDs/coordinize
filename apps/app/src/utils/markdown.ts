import type { JSONContent } from "@tiptap/react";

export const EMPTY_HTML = "<p></p>";
export const EMPTY_JSON: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};
