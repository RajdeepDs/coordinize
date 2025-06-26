import { BubbleMenu, type Editor, isNodeSelection } from "@tiptap/react";
import { useRef } from "react";

import { useTextMenuBlocks } from "@/hooks/use-menu-block";
import { useTextMenuLists } from "@/hooks/use-menu-lists";
import { useTextmenuStates } from "@/hooks/use-menu-states";
import { Icons } from "@coordinize/ui/lib/icons";
import { BubbleMenuButton } from "./bubble-menu-button";
import { BubbleMenuDropdown } from "./bubble-menu-dropdown";
import { BubbleMenuSeparator } from "./bubble-menu-separator";

interface EditorBubbleMenuProps {
  editor: Editor;
}

const blockConfig = {
  heading1: {
    icon: <Icons.heading1 />,
    tooltip: "Heading 1",
  },
  heading2: {
    icon: <Icons.heading2 />,
    tooltip: "Heading 2",
  },
  heading3: {
    icon: <Icons.heading3 />,
    tooltip: "Heading 3",
  },
  paragraph: {
    icon: <Icons.regularText />,
    tooltip: "Regular text",
  },
} as const;

function getBlockConfig(editor: Editor) {
  if (editor.isActive("heading", { level: 1 })) return blockConfig.heading1;
  if (editor.isActive("heading", { level: 2 })) return blockConfig.heading2;
  if (editor.isActive("heading", { level: 3 })) return blockConfig.heading3;
  return blockConfig.paragraph;
}

function blockIcon(editor: Editor) {
  return getBlockConfig(editor).icon;
}

function blockTooltip(editor: Editor) {
  return getBlockConfig(editor).tooltip;
}

const listConfig = {
  orderedList: {
    icon: <Icons.numberedList />,
    tooltip: "Numbered list",
  },
  taskList: {
    icon: <Icons.checkList />,
    tooltip: "Task list",
  },
  bulletList: {
    icon: <Icons.bulletList />,
    tooltip: "Bullet list",
  },
} as const;

function getListConfig(editor: Editor) {
  if (editor.isActive("orderedList")) return listConfig.orderedList;
  if (editor.isActive("taskList")) return listConfig.taskList;
  return listConfig.bulletList;
}

function listIcon(editor: Editor) {
  return getListConfig(editor).icon;
}

function listTooltip(editor: Editor) {
  return getListConfig(editor).tooltip;
}

export function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const states = useTextmenuStates(editor);
  const listOptions = useTextMenuLists(editor);
  const blockOptions = useTextMenuBlocks(editor);

  if (!editor) {
    return null;
  }

  // Use the editor's DOM element for better positioning reference
  if (editor?.options?.element && !editorRef.current) {
    editorRef.current = editor.options.element as HTMLDivElement;
  }

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor, state }) => {
        const { selection } = state;
        const { empty } = selection;

        if (
          !editor.isEditable ||
          editor.isActive("image") ||
          empty ||
          isNodeSelection(selection)
        ) {
          // don't show bubble menu if:
          // - the editor is not editable
          // - the selected node is an image
          // - the selection is empty
          // - the selection is a node selection (for drag handles)
          return false;
        }
        return true;
      }}
      pluginKey="bubbleMenuText"
      tippyOptions={{
        placement: "top",
        offset: [0, 10],
        zIndex: 99,
        arrow: false,
        animation: "shift-away",
        moveTransition: "transform 0.2s ease-in-out",
        popperOptions: {
          modifiers: [
            { name: "flip", enabled: true },
            {
              name: "preventOverflow",
              enabled: true,
              options: { padding: 16 },
            },
          ],
        },
      }}
      updateDelay={0}
    >
      <div
        ref={containerRef}
        className="shadow/5 flex cursor-default items-center gap-2 rounded-md border bg-background p-1 text-foreground"
      >
        <BubbleMenuDropdown
          items={blockOptions}
          menuIcon={blockIcon(editor)}
          tooltip={blockTooltip(editor)}
        />

        <BubbleMenuSeparator />

        <BubbleMenuButton
          icon={<Icons.bold />}
          tooltip="Bold"
          tooltipShortcut="mod+b"
          onClick={() => {
            editor.chain().focus().toggleMark("bold").run();
          }}
          isActive={states.isBold}
        />
        <BubbleMenuButton
          icon={<Icons.italic />}
          tooltip="Italic"
          tooltipShortcut="mod+i"
          onClick={() => {
            editor.chain().focus().toggleMark("italic").run();
          }}
          isActive={states.isItalic}
        />
        <BubbleMenuButton
          icon={<Icons.underline />}
          tooltip="Underline"
          tooltipShortcut="mod+u"
          onClick={() => {
            editor.chain().focus().toggleMark("underline").run();
          }}
          isActive={states.isUnderline}
        />
        <BubbleMenuButton
          icon={<Icons.strike />}
          tooltip="Strikethrough"
          tooltipShortcut="mod+shift+s"
          onClick={() => {
            editor.chain().focus().toggleMark("strike").run();
          }}
          isActive={states.isStrike}
        />
        <BubbleMenuButton
          icon={<Icons.quote />}
          tooltip="Quote"
          tooltipShortcut="mod+shift+b"
          onClick={() => {
            editor.chain().focus().toggleWrap("blockquote").run();
          }}
          isActive={states.isQuote}
        />
        <BubbleMenuButton
          icon={<Icons.inlineCode />}
          tooltip="Inline code"
          tooltipShortcut="mod+e"
          onClick={() => {
            editor.chain().focus().toggleMark("code").run();
          }}
          isActive={states.isInlineCode}
        />
        <BubbleMenuButton
          icon={<Icons.codeBlock />}
          tooltip="Code block"
          tooltipShortcut="mod+alt+c"
          onClick={() => {
            editor.chain().focus().toggleNode("codeBlock", "paragraph").run();
          }}
          isActive={states.isCodeBlock}
        />

        <BubbleMenuDropdown
          items={listOptions}
          menuIcon={listIcon(editor)}
          tooltip={listTooltip(editor)}
        />
      </div>
    </BubbleMenu>
  );
}
