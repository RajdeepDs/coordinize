import { buildMenuItems } from "@/utils/build-menu";
import { Icons } from "@coordinize/ui/lib/icons";
import type { Editor } from "@tiptap/core";
import { BubbleMenu, findParentNode, isList } from "@tiptap/react";
import Link from "next/link";
import { memo, useCallback, useRef, useState } from "react";
import { BubbleMenuButton } from "./bubble-menu-button";
import { BubbleMenuSeparator } from "./bubble-menu-separator";
import { type AnyEvent, LinkEditor, isValidUrl } from "./link-editor";

interface Props {
  editor: Editor | null;
  canComment?: boolean;
  enableHeaders?: boolean;
  enableLists?: boolean;
  enableBlockquote?: boolean;
  enableUnderline?: boolean;
  enableCodeBlock?: boolean;
  // BubbleMenu uses Tippy under the hood. Use this to append to a different element other than the editor's parent
  tippyAppendTo?: () => HTMLElement | null;
}

export const EditorBubbleMenu = memo(function EditorBubbleMemo({
  editor,
  canComment = false,
  enableHeaders = true,
  enableLists = true,
  enableBlockquote = true,
  enableUnderline = true,
  enableCodeBlock = true,
  tippyAppendTo,
}: Props) {
  const [linkEditorOpen, setLinkEditorOpen] = useState(false);
  const [url, setUrl] = useState(editor?.getAttributes("link").href ?? "");

  const containerRef = useRef<HTMLDivElement>(null);

  const openLinkEditor = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();
      setUrl(editor?.getAttributes("link").href ?? "");
      setLinkEditorOpen(true);
    },
    [editor],
  );

  const closeLinkEditor = useCallback(() => {
    setLinkEditorOpen(false);
    editor?.chain().focus().run();
  }, [editor]);

  function saveLink() {
    if (url) {
      const href = url.includes("://") ? url : `https://${url}`;

      editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    } else {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    }

    closeLinkEditor();
  }

  function removeLink(e: AnyEvent) {
    e.stopPropagation();
    editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    closeLinkEditor();
  }

  if (!editor) return null;

  const paragraphItems = buildMenuItems([
    {
      type: "item",
      label: "Regular text",
      onSelect: (e) => {
        e.stopPropagation();
        editor.chain().setParagraph().focus().run();
      },
      className: "font-normal",
      kbd: "mod+alt+0",
    },
    {
      type: "item",
      label: "Heading 1",
      onSelect: (e) => {
        e.stopPropagation();
        editor
          .chain()
          .splitNearHardBreaks()
          .setHeading({ level: 1 })
          .focus()
          .run();
      },
      className: "font-bold !text-lg",
      kbd: "mod+alt+1",
    },
    {
      type: "item",
      label: "Heading 2",
      onSelect: (e) => {
        e.stopPropagation();
        editor
          .chain()
          .splitNearHardBreaks()
          .setHeading({ level: 2 })
          .focus()
          .run();
      },
      className: "font-bold",
      kbd: "mod+alt+2",
    },
    {
      type: "item",
      label: "Heading 3",
      onSelect: (e) => {
        e.stopPropagation();
        editor
          .chain()
          .splitNearHardBreaks()
          .setHeading({ level: 3 })
          .focus()
          .run();
      },
      className: "font-semibold",
      kbd: "mod+alt+3",
    },
  ]);

  const listItems = buildMenuItems([
    {
      type: "item",
      label: "List",
      leftSlot: <Icons.unorderedList />,
      onSelect: (e) => {
        e.stopPropagation();
        editor.chain().toggleBulletList().focus().run();
      },
      kbd: "mod+shift+7",
    },
    {
      type: "item",
      label: "Numbered",
      leftSlot: <Icons.orderedList />,
      onSelect: (e) => {
        e.stopPropagation();
        editor.chain().toggleOrderedList().focus().run();
      },
      kbd: "mod+shift+8",
    },
    {
      type: "item",
      label: "Checklist",
      leftSlot: <Icons.checkList />,
      onSelect: (e) => {
        e.stopPropagation();
        editor.chain().toggleTaskList().focus().run();
      },
      kbd: "mod+shift+9",
    },
  ]);

  const parentContainer = tippyAppendTo?.() ?? undefined;
  return (
    <div
      className="absolute"
      onKeyDownCapture={(e) => {
        if (e.key !== "Escape") return;
        e.stopPropagation();
        closeLinkEditor();
      }}
    >
      <BubbleMenu
        pluginKey={"bubbleMenuText"}
        editor={editor}
        tippyOptions={{
          onHidden: closeLinkEditor,
          maxWidth: "auto",
          appendTo: parentContainer,
          popperOptions: {
            // prefer top; allow flipping to the bottom to avoid getting clipped.
            // if the popover is completely off-screen it will be hidden by CSS in editor.css.
            placement: "top",
            modifiers: [
              {
                name: "flip",
                options: {
                  fallbackPlacements: ["top", "bottom"],
                  boundary: parentContainer,
                },
              },
            ],
          },
        }}
        updateDelay={50}
      >
        <div
          ref={containerRef}
          className="dark flex cursor-default items-center gap-1 rounded-lg bg-background p-1 text-primary shadow-lg dark:shadow-[inset_0px_1px_0px_rgb(255_255_255_/_0.04),_inset_0px_0px_0px_1px_rgb(255_255_255_/_0.02),_0px_1px_2px_rgb(0_0_0_/_0.4),_0px_2px_4px_rgb(0_0_0_/_0.08),_0px_0px_0px_0.5px_rgb(0_0_0_/_0.24)]"
        >
          {linkEditorOpen ? (
            <>
              <LinkEditor
                url={url}
                onChangeUrl={setUrl}
                onSaveLink={saveLink}
                onRemoveLink={removeLink}
              />
            </>
          ) : (
            <>
              {editor.isEditable && (
                <>
                  {enableHeaders && (
                    <BubbleMenuButton
                      onClick={(e) => {
                        e.stopPropagation();
                        editor.chain().toggleBold().focus().run();
                      }}
                      isActive={editor.isActive("bold")}
                      icon={<Icons.bold className="size-4" />}
                      tooltip="Bold"
                      shortcut="mod+b"
                    />
                  )}

                  <BubbleMenuButton
                    onClick={(e) => {
                      e.stopPropagation();
                      editor.chain().toggleItalic().focus().run();
                    }}
                    isActive={editor.isActive("italic")}
                    icon={<Icons.italic className="size-4" />}
                    tooltip="Italic"
                    shortcut="mod+i"
                  />
                  {enableUnderline && (
                    <BubbleMenuButton
                      onClick={(e) => {
                        e.stopPropagation();
                        editor.chain().toggleUnderline().focus().run();
                      }}
                      isActive={editor.isActive("underline")}
                      icon={<Icons.underline className="size-4" />}
                      tooltip="Underline"
                      shortcut="mod+u"
                    />
                  )}
                  <BubbleMenuButton
                    onClick={(e) => {
                      e.stopPropagation();
                      editor.chain().toggleStrike().focus().run();
                    }}
                    isActive={editor.isActive("strike")}
                    icon={<Icons.strikethrough className="size-4" />}
                    tooltip="Strikethrough"
                    shortcut="mod+shift+s"
                  />
                  <BubbleMenuSeparator />
                  {enableBlockquote && (
                    <BubbleMenuButton
                      onClick={(e) => {
                        e.stopPropagation();

                        const selection = editor.state.selection;
                        const parentList = findParentNode((node) =>
                          isList(
                            node.type.name,
                            editor.extensionManager.extensions,
                          ),
                        )(selection);
                        let chain = editor.chain();

                        // fully collapse nested lists
                        if (parentList) {
                          for (let i = 0; i < parentList.depth; i++) {
                            chain = chain.liftListItem("listItem");
                          }
                        }

                        chain.toggleBlockquote().focus().run();
                      }}
                      isActive={editor.isActive("blockquote")}
                      icon={<Icons.quote className="size-4" />}
                      tooltip="Quote"
                      shortcut="mod+shift+b"
                    />
                  )}
                  {/* {enableLists && (
                    <DropdownMenu
                      align="start"
                      items={listItems}
                      trigger={
                        <BubbleMenuButton
                          onClick={blurEditor}
                          icon={listIcon(editor)}
                          tooltip="List"
                          dropdown
                        />
                      }
                      desktop={{
                        container: containerRef.current,
                        width: "w-50",
                      }}
                    />
                  )} */}
                  <BubbleMenuButton
                    onClick={(e) => {
                      e.stopPropagation();
                      editor.chain().toggleCode().focus().run();
                    }}
                    isActive={editor.isActive("code")}
                    icon={<Icons.code className="size-4" />}
                    tooltip="Code"
                    shortcut="mod+e"
                  />

                  {enableCodeBlock && (
                    <BubbleMenuButton
                      onClick={(e) => {
                        e.stopPropagation();
                        editor.chain().toggleCodeBlock().focus().run();
                      }}
                      isActive={editor.isActive("codeBlock")}
                      icon={<Icons.codeBlock className="size-4" />}
                      tooltip="Code block"
                      shortcut="mod+alt+c"
                    />
                  )}

                  <BubbleMenuSeparator />

                  <BubbleMenuButton
                    onClick={openLinkEditor}
                    isActive={editor.isActive("link")}
                    icon={<Icons.link className="size-4" />}
                    tooltip="Link"
                    shortcut="mod+k"
                  />
                </>
              )}
              {/* Add comments */}
            </>
          )}
        </div>
      </BubbleMenu>
      <BubbleMenu
        pluginKey="bubbleMenuLink"
        editor={editor}
        tippyOptions={{
          onHidden: closeLinkEditor,
          maxWidth: "auto",
          appendTo: parentContainer,
        }}
        shouldShow={({ editor, from, to }) => {
          // only show the bubble menu for links.
          return from === to && editor.isActive("link");
        }}
      >
        <div className="dark flex gap-1 rounded-lg bg-black p-1 text-primary dark:bg-elevated">
          {linkEditorOpen ? (
            <LinkEditor
              url={url}
              onChangeUrl={setUrl}
              onSaveLink={saveLink}
              onRemoveLink={removeLink}
            />
          ) : (
            <>
              <button
                type="button"
                onClick={openLinkEditor}
                className="flex w-7 flex-none rounded p-1 hover:bg-quaternary"
              >
                <Icons.pen />
              </button>
              <button
                type="button"
                onClick={removeLink}
                className="flex w-7 flex-none rounded p-1 hover:bg-quaternary"
              >
                <Icons.trash />
              </button>
              {!!url && isValidUrl(url) && (
                <Link
                  href={url}
                  target="_blank"
                  className={
                    "flex h-7 w-7 flex-none items-center justify-center rounded p-1 hover:bg-quaternary"
                  }
                >
                  <Icons.externalLink />
                </Link>
              )}
            </>
          )}
        </div>
      </BubbleMenu>
    </div>
  );
});
