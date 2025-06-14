import { TextStyle } from "@tiptap/extension-text-style";
import {
  CodeBlock,
  Column,
  Columns,
  Details,
  DetailsContent,
  DetailsSummary,
  Document,
  Dropcursor,
  Focus,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  Link,
  Placeholder,
  StarterKit,
  Subscript,
  Superscript,
  TaskItem,
  TaskList,
  Typography,
} from "./extensions";

export const markdownExtensions = () => [
  Document,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Heading.configure({
    levels: [1, 2, 3],
  }),
  HorizontalRule,
  StarterKit,
  Details.configure({
    persist: true,
    HTMLAttributes: {
      class: "details",
    },
  }),
  DetailsContent,
  DetailsSummary,
  CodeBlock,
  TextStyle,
  FontSize,
  HorizontalRule,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Subscript,
  Superscript,
  Typography,
  Placeholder,
  Focus,
  Dropcursor.configure({
    width: 2,
    class: "ProseMirror-dropcursor border-black",
  }),
  Column,
  Columns,
];
