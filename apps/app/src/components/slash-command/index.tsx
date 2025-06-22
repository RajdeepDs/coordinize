import type { Editor, Range } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";
import type { ReactNode } from "react";

import { SeparatorHorizontal as HorizontalRuleIcon } from "lucide-react";

import { KeyboardShortcut } from "@coordinize/ui/components/keyboard-shortcut";

import { Icons } from "@coordinize/ui/lib/icons";
import { SuggestionItem, SuggestionRoot } from "./suggestion-list";

interface CommandItemProps {
  title: string;
  searchTerms?: string[];
  icon: ReactNode;
  command: (props: CommandProps) => void;
  kbd?: string;
}

interface CommandProps {
  editor: Editor;
  range: Range;
}

const COMMANDS: CommandItemProps[] = [
  {
    title: "Heading 1",
    searchTerms: ["title"],
    icon: <Icons.heading1 className="h-4 w-4" />,
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Heading 2",
    searchTerms: ["subtitle"],
    icon: <Icons.heading2 className="h-4 w-4" />,
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "Heading 3",
    searchTerms: ["subtitle"],
    icon: <Icons.heading3 className="h-4 w-4" />,
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    title: "Bullet List",
    searchTerms: ["unordered"],
    icon: <Icons.bulletList className="h-4 w-4" />,
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleList("bulletList", "listItem")
        .run();
    },
  },
  {
    title: "Numbered List",
    searchTerms: ["ordered"],
    icon: <Icons.numberedList className="h-4 w-4" />,
    command: ({ editor, range }: CommandProps) => {
      editor
        ?.chain()
        .focus()
        .deleteRange(range)
        .toggleList("orderedList", "listItem")
        .run();
    },
  },
  {
    title: "To-do List",
    searchTerms: ["todo", "task", "list", "check", "checkbox"],
    icon: <Icons.checkList className="h-4 w-4" />,
    command: ({ editor, range }: CommandProps) => {
      editor
        ?.chain()
        .focus()
        .deleteRange(range)
        .toggleList("taskList", "taskItem")
        .run();
    },
  },
  {
    title: "Quote",
    searchTerms: ["blockquote"],
    icon: <Icons.quote className="h-4 w-4" />,
    command: ({ editor, range }: CommandProps) =>
      editor.chain().focus().deleteRange(range).toggleWrap("blockquote").run(),
  },
  {
    title: "Code",
    searchTerms: ["codeblock"],
    icon: <Icons.codeBlock className="h-4 w-4" />,
    command: ({ editor, range }: CommandProps) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("codeBlock", "paragraph")
        .run(),
  },
  {
    title: "Divider",
    searchTerms: ["divider", "separator", "horizontal", "rule"],
    icon: <HorizontalRuleIcon className="h-4 w-4" />,
    command: ({ editor, range }: CommandProps) =>
      editor.chain().focus().deleteRange(range).setNode("horizontalRule").run(),
  },
];

interface SlashCommandProps {
  editor: Editor;
}

const pluginKey = new PluginKey("slashCommand");

export function SlashCommand({ editor }: SlashCommandProps) {
  return (
    <SuggestionRoot editor={editor} char="/" pluginKey={pluginKey}>
      {COMMANDS.map((item) => {
        return (
          <SuggestionItem
            editor={editor}
            value={item.title}
            keywords={item.searchTerms}
            key={item.title}
            onSelect={({ editor, range }) => {
              if (item.command instanceof Function) {
                item.command({ editor, range });
              }
            }}
          >
            <div className="-ml-1 flex h-6 w-6 items-center justify-center text-muted-foreground">
              {item.icon}
            </div>
            <span className="flex-1 pr-4 text-left font-medium text-sm">
              {item.title}
            </span>
            {item.kbd && <KeyboardShortcut shortcut={item.kbd} />}
          </SuggestionItem>
        );
      })}
    </SuggestionRoot>
  );
}
