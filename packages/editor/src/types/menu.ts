import type { Editor } from "@tiptap/react";
import type React from "react";

export interface MenuProps {
  editor: Editor;
  appendTo?: React.RefObject<HTMLElement>;
  shouldHide?: boolean;
}
