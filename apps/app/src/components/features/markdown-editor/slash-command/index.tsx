import { CommandSeparator } from "@coordinize/ui/components/command";
import { KeyboardShortcut } from "@coordinize/ui/components/keyboard-shortcut";
import { Icons } from "@coordinize/ui/lib/icons";
import type { Range } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";
import type { Editor } from "@tiptap/react";
import type { ReactNode } from "react";
import { SuggestionItem, SuggestionRoot } from "./suggestion-list";

type CommandItemProps = {
  title: string;
  searchTerms?: string[];
  icon?: ReactNode;
  command?: (props: CommandProps) => void;
  kbd?: string;
  type?: "command" | "separator";
};

type CommandProps = {
  editor: Editor;
  range: Range;
};

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
    type: "separator",
    title: "Headings Separator",
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
        .chain()
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
        .chain()
        .focus()
        .deleteRange(range)
        .toggleList("taskList", "taskItem")
        .run();
    },
  },
  {
    type: "separator",
    title: "Lists Separator",
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
];

type SlashCommandProps = {
  editor: Editor;
};

const pluginKey = new PluginKey("slashCommand");

export function SlashCommand({ editor }: SlashCommandProps) {
  return (
    <SuggestionRoot char="/" editor={editor} pluginKey={pluginKey}>
      {COMMANDS.map((item) => {
        if (item.type === "separator") {
          return (
            <CommandSeparator
              className="my-1 h-px bg-border"
              key={item.title}
            />
          );
        }
        return (
          <SuggestionItem
            editor={editor}
            key={item.title}
            keywords={item.searchTerms}
            onSelect={({ editor: editorInstance, range }) => {
              if (item.command instanceof Function) {
                item.command({ editor: editorInstance, range });
              }
            }}
            value={item.title}
          >
            <div className="-ml-1 flex h-6 w-6 items-center justify-center text-muted-foreground">
              {item.icon}
            </div>
            <span className="flex-1 pr-4 text-left text-sm">{item.title}</span>
            {item.kbd && <KeyboardShortcut shortcut={item.kbd} />}
          </SuggestionItem>
        );
      })}
    </SuggestionRoot>
  );
}
