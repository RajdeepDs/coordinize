import type { Editor } from "@tiptap/react";
import type React from "react";

export type MenuProps = {
  editor: Editor;
  appendTo?: React.RefObject<HTMLElement>;
  shouldHide?: boolean;
};
