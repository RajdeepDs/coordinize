import type { Editor, Range } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { SuggestionItem, SuggestionRoot } from "@/components/suggestion-lists";
import { Label } from "@coordinize/ui/components/label";
import { Icons } from "@coordinize/ui/lib/icons";

export const ADD_ATTACHMENT_SHORTCUT = "mod+shift+u";

interface CommandItemProps {
  title: string;
  searchTerms?: string[];
  icon: ReactNode;
  command: "upload-file" | ((props: CommandProps) => void);
  kbd?: string;
}

interface CommandProps {
  editor: Editor;
  range: Range;
}

const COMMANDS: CommandItemProps[] = [
  {
    title: "Text",
    searchTerms: ["paragraph"],
    icon: <Icons.search />,
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "To-do List",
    searchTerms: ["todo", "task", "list", "check", "checkbox"],
    icon: <Icons.checkList />,
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
    kbd: "[ ]",
  },
  {
    title: "Heading 1",
    searchTerms: ["title"],
    icon: <Icons.help />,
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
    kbd: "#",
  },
  {
    title: "Heading 2",
    searchTerms: ["subtitle"],
    icon: <Icons.help />,
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
    kbd: "##",
  },
  {
    title: "Heading 3",
    searchTerms: ["subtitle"],
    icon: <Icons.help />,
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
    kbd: "###",
  },
  {
    title: "Bullet List",
    searchTerms: ["unordered"],
    icon: <Icons.unorderedList />,
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
    kbd: "-",
  },
  {
    title: "Numbered List",
    searchTerms: ["ordered"],
    icon: <Icons.orderedList />,
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
    kbd: "1.",
  },
  {
    title: "Quote",
    searchTerms: ["blockquote"],
    icon: <Icons.quote />,
    command: ({ editor, range }: CommandProps) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .run(),
    kbd: ">",
  },
  {
    title: "Code",
    searchTerms: ["codeblock"],
    icon: <Icons.code />,
    command: ({ editor, range }: CommandProps) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    kbd: "```",
  },
  {
    title: "Divider",
    searchTerms: ["divider", "separator", "horizontal", "rule"],
    icon: <Icons.ChevronRight />,
    command: ({ editor, range }: CommandProps) =>
      editor.chain().focus().deleteRange(range).setHorizontalRule().run(),
    kbd: "---",
  },
];

type Props = Pick<ComponentPropsWithoutRef<typeof SuggestionRoot>, "editor">;

const pluginKey = new PluginKey("slashCommand");

export function SlashCommand({ editor }: Props) {
  return (
    <SuggestionRoot>
      {COMMANDS.map((item) => {
        return (
          <SuggestionItem key={item.title}>
            <div className="-ml-1 flex h-6 w-6 items-center justify-center text-secondary">
              {item.icon}
            </div>
            <Label className="flex-1 pr-4 text-left font-medium text-sm">
              {item.title}
            </Label>
            {item.kbd && <p>{item.kbd}</p>}
          </SuggestionItem>
        );
      })}
    </SuggestionRoot>
  );
}
