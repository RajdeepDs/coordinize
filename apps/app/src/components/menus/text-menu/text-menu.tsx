import { useTextMenuContentType } from "@/hooks/use-text-menu-content-type";
import { Button } from "@coordinize/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@coordinize/ui/components/popover";
import { Icons } from "@coordinize/ui/lib/icons";
import { Toggle } from "@coordinize/ui/toggle";
import type { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { ContentTypeDropdown } from "../components/text-menu-content-type";

interface TextMenuProps {
  editor: Editor;
}
export function TextMenu({ editor }: TextMenuProps) {
  if (!editor) {
    return null;
  }

  const blockOptions = useTextMenuContentType(editor);
  return (
    <BubbleMenu
      editor={editor}
      options={{
        placement: "bottom",
        flip: true,
        offset: 8,
      }}
    >
      <div className="flex cursor-default items-center gap-1 rounded-lg border bg-background p-0.5 text-foreground shadow">
        <ContentTypeDropdown options={blockOptions} />
        <Toggle
          size={"sm"}
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().toggleBold().focus().run();
          }}
        >
          <Icons.bold />
        </Toggle>
        <Toggle
          size={"sm"}
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().toggleItalic().focus().run();
          }}
        >
          <Icons.italic />
        </Toggle>
        <Toggle
          size={"sm"}
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().toggleUnderline().focus().run();
          }}
        >
          <Icons.underline />
        </Toggle>
        <Toggle
          size={"sm"}
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().toggleStrike().focus().run();
          }}
        >
          <Icons.strikethrough />
        </Toggle>
        <Toggle
          size={"sm"}
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().toggleBlockquote().focus().run();
          }}
        >
          <Icons.quote />
        </Toggle>
        <Toggle
          size={"sm"}
          onClick={(e) => {
            e.stopPropagation();
            editor.chain().toggleCode().focus().run();
          }}
        >
          <Icons.code />
        </Toggle>
        <Popover>
          <PopoverTrigger asChild>
            <Toggle size={"sm"}>
              <Icons.unorderedList />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent
            className="flex w-[160px] flex-col items-start justify-start gap-0.5 p-1"
            sideOffset={6}
          >
            <Button
              size={"sm"}
              variant={"ghost"}
              className="w-full justify-start"
              onClick={(e) => {
                e.stopPropagation();
                editor
                  .chain()
                  .focus()
                  .toggleList("bulletList", "listItem")
                  .run();
              }}
            >
              <Icons.unorderedList />
              <span>List</span>
            </Button>
            <Button
              size={"sm"}
              variant={"ghost"}
              className="w-full justify-start"
              onClick={(e) => {
                e.stopPropagation();
                editor
                  .chain()
                  .focus()
                  .toggleList("orderedList", "listItem")
                  .run();
              }}
            >
              <Icons.orderedList />
              <span>Numbered List</span>
            </Button>
            <Button
              size={"sm"}
              variant={"ghost"}
              className="w-full justify-start"
              onClick={(e) => {
                e.stopPropagation();
                editor.chain().focus().toggleList("taskList", "listItem").run();
              }}
            >
              <Icons.checkList />
              <span>Checklist</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </BubbleMenu>
  );
}
