import { Placeholder as placeholder } from "@tiptap/extensions/placeholder";

export const Placeholder = placeholder.configure({
  emptyEditorClass: "is-editor-empty",
  placeholder: ({ node }) => {
    switch (node.type.name) {
      case "heading":
        return `Heading ${node.attrs.level}`;
      case "detailsSummary":
        return "Section title";
      case "codeBlock":
        // never show the placeholder when editing code
        return "";
      default:
        return "Write, or type '/' for commands";
    }
  },
  includeChildren: true,
});
