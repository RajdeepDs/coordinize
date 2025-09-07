import { TextStyle } from "@tiptap/extension-text-style";
import {
  CodeBlock,
  Document,
  Dropcursor,
  Focus,
  Heading,
  Highlight,
  HorizontalRule,
  Placeholder,
  StarterKit,
  Subscript,
  Superscript,
  TaskItem,
  TaskList,
  Typography,
  Underline,
} from "./extensions";

export const markdownExtensions = ({
  placeholder,
}: {
  placeholder?: string;
}) => [
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
  Underline,
  CodeBlock,
  TextStyle,
  HorizontalRule,
  Highlight.configure({ multicolor: true }),
  Subscript,
  Superscript,
  Typography,
  Placeholder.configure({
    placeholder,
  }),
  Focus,
  Dropcursor.configure({
    width: 2,
    class: "ProseMirror-dropcursor border-black",
  }),
];
