import {
  isMarkActiveInRange,
  isNodeActiveInRange,
  Suggestion,
} from "@coordinize/editor";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@coordinize/ui/components/popover";
import { cn } from "@coordinize/ui/lib/utils";
import type { Range } from "@tiptap/core";
import { type EditorState, PluginKey } from "@tiptap/pm/state";
import type { Editor } from "@tiptap/react";
import { Command } from "cmdk";
import * as React from "react";
import { v4 as uuid } from "uuid";

// Context for sharing range reference between components
const SuggestionRangeContext = React.createContext<
  React.RefObject<Range | null>
>({ current: null });
const useSuggestionRange = () => React.useContext(SuggestionRangeContext);

// Context for sharing query information
const SuggestionQueryContext = React.createContext<string>("");
const SuggestionEmptyContext = React.createContext<boolean>(true);

export const useSuggestionQuery = () =>
  React.useContext(SuggestionQueryContext);
export const useSuggestionEmpty = () =>
  React.useContext(SuggestionEmptyContext);

interface Measurable {
  getBoundingClientRect: () => DOMRect;
}

const DEFAULT_ALLOWED_PREFIXES = [" ", "("];

export interface SuggestionRootProps {
  children: React.ReactNode;
  editor: Editor;
  pluginKey?: PluginKey;
  char: string;
  contentClassName?: string;
  listClassName?: string;
  startOfLine?: boolean;
  allow?: (props: {
    editor: Editor;
    state: EditorState;
    range: Range;
    isActive?: boolean;
  }) => boolean;
  allowedPrefixes?: string[];
  allowSpaces?: boolean;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  modal?: boolean;
  filter?: (value: string, search: string) => number;
  onControlledQueryChange?: (query: string) => void;
}

export function SuggestionRoot({
  children,
  editor,
  pluginKey,
  char,
  contentClassName,
  listClassName,
  startOfLine,
  allow,
  allowedPrefixes = DEFAULT_ALLOWED_PREFIXES,
  allowSpaces,
  align = "start",
  side = "bottom",
  modal = true,
  filter,
  onControlledQueryChange,
}: SuggestionRootProps) {
  const [open, setOpen] = React.useState(false);

  const commandRef = React.useRef<HTMLDivElement>(null);
  const virtualAnchorRef = React.useRef<Measurable>({
    getBoundingClientRect: () => new DOMRect(),
  });
  const rangeRef = React.useRef<Range | null>(null);
  const [query, setQuery] = React.useState("");

  const allowRef = React.useRef(allow);
  const openRef = React.useRef(open);

  const updateQuery = (query: string, range: Range | null) => {
    setQuery(query);
    onControlledQueryChange?.(query);
    rangeRef.current = range;
  };

  const updateRef = React.useRef(updateQuery);

  allowRef.current = allow;
  openRef.current = open;
  updateRef.current = updateQuery;

  const dismissedPositionsRef = React.useRef<number[]>([]);

  const isCharAtPos = (state: EditorState, pos: number) => {
    const from = pos;
    const to = pos + char.length;
    if (from < 0 || to > state.doc.content.size) {
      return false;
    }
    return state.doc.textBetween(from, to) === char;
  };

  function close() {
    if (
      rangeRef.current?.from &&
      !dismissedPositionsRef.current.includes(rangeRef.current.from) &&
      isCharAtPos(editor.state, rangeRef.current.from)
    ) {
      dismissedPositionsRef.current.push(rangeRef.current.from);
    }
    setOpen(false);
    updateRef.current("", null);
  }

  React.useLayoutEffect(() => {
    if (!editor || editor.isDestroyed) {
      return;
    }

    function updateAnchorRect(node: Element | null) {
      if (!(node && node instanceof HTMLElement)) {
        return;
      }

      const bounds = node.getBoundingClientRect();
      virtualAnchorRef.current = {
        getBoundingClientRect: () => bounds,
      };
    }

    const key = pluginKey ?? new PluginKey(`suggestion-${uuid()}`);

    const plugin = Suggestion({
      pluginKey: key,
      editor,
      char,
      startOfLine,
      allow: (props) => {
        const propsAllow =
          !allowRef.current ||
          (typeof allowRef.current === "function" && allowRef.current(props));
        return (
          propsAllow &&
          !dismissedPositionsRef.current.includes(props.range.from) &&
          !isMarkActiveInRange(props.state, "code", props.range) &&
          !isNodeActiveInRange(props.state, "codeBlock", props.range)
        );
      },
      apply: ({ transaction, state }) => {
        if (!(transaction.docChanged && dismissedPositionsRef.current.length)) {
          return;
        }

        const mapping = transaction.mapping;

        dismissedPositionsRef.current = dismissedPositionsRef.current
          .map((pos) => mapping.map(pos))
          .filter((pos) => isCharAtPos(state, pos));
      },
      allowedPrefixes,
      allowSpaces,
      items: () => [],
      render: () => {
        return {
          onStart: ({ decorationNode, query, range }) => {
            updateAnchorRect(decorationNode);
            setOpen(true);
            updateRef.current(query, range);
          },
          onUpdate: ({ decorationNode, query, range }) => {
            updateAnchorRect(decorationNode);
            updateRef.current(query, range);
          },
          onExit: close,
          onKeyDown: ({ event }) => {
            if (!openRef.current) {
              return false;
            }

            if (event.key === "Escape") {
              close();
              event.preventDefault();
              event.stopPropagation();
              return true;
            }

            if (event.key === "Enter" || event.key === "Tab") {
              const selectedItem = document.querySelector(
                '[cmdk-item][data-selected="true"]'
              ) as HTMLElement;
              if (selectedItem) {
                selectedItem.click();
                event.preventDefault();
                event.stopPropagation();
                return true;
              }
              close();
              event.preventDefault();
              event.stopPropagation();
              return true;
            }

            if (event.key === "ArrowUp" || event.key === "ArrowDown") {
              if (commandRef.current) {
                commandRef.current.focus();

                const syntheticEvent = new KeyboardEvent("keydown", {
                  key: event.key,
                  code: event.code,
                  keyCode: event.keyCode,
                  which: event.which,
                  bubbles: true,
                  cancelable: true,
                });

                commandRef.current.dispatchEvent(syntheticEvent);
              }

              event.preventDefault();
              event.stopPropagation();
              return true;
            }

            return false;
          },
        };
      },
    });

    editor.registerPlugin(plugin, (newPlugin, plugins) => [
      newPlugin,
      ...plugins,
    ]);
    return () => {
      editor.unregisterPlugin(key);
    };
  }, [editor, pluginKey, startOfLine, char, allowSpaces]);

  return (
    <Popover
      modal={modal}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          close();
        }
      }}
      open={open}
    >
      <PopoverAnchor virtualRef={virtualAnchorRef} />
      {open && (
        <PopoverContent
          align={align}
          className={cn(
            "flex max-h-full w-[14rem] scroll-p-1 flex-col gap-0.5 overflow-y-auto overflow-x-hidden rounded-lg border border-input bg-popover p-0 shadow-md outline-none focus:outline-none",
            contentClassName
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
          side={side}
        >
          <Command
            className="flex h-full w-full flex-col overflow-hidden bg-popover text-popover-foreground focus:outline-none"
            filter={filter}
            loop
            ref={commandRef}
            shouldFilter={!onControlledQueryChange}
            tabIndex={0}
          >
            <Command.Input className="hidden" value={query} />
            <Command.List
              className={cn(
                "flex flex-col overflow-y-auto overflow-x-hidden p-1 outline-none focus:outline-none",
                listClassName
              )}
            >
              <SuggestionQueryContext.Provider value={query}>
                <SuggestionEmptyContext.Provider value={!query}>
                  <SuggestionRangeContext.Provider value={rangeRef}>
                    {children}
                  </SuggestionRangeContext.Provider>
                </SuggestionEmptyContext.Provider>
              </SuggestionQueryContext.Provider>
              <Command.Empty>
                <span>No results</span>
              </Command.Empty>
            </Command.List>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
}

export interface SuggestionItemProps
  extends React.PropsWithChildren,
    Omit<React.ComponentPropsWithoutRef<typeof Command.Item>, "onSelect"> {
  editor: Editor;
  onSelect: (props: { editor: Editor; range: Range }) => void;
  value?: string;
  keywords?: string[];
}

export function SuggestionItem({
  children,
  editor,
  onSelect,
  className,
  value,
  keywords,
  ...props
}: SuggestionItemProps) {
  const range = useSuggestionRange();

  return (
    <Command.Item
      keywords={keywords}
      value={value}
      {...props}
      className={cn(
        "relative flex cursor-default select-none items-center gap-3 rounded px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      onSelect={() => {
        if (!range.current) {
          return;
        }
        onSelect({ editor, range: range.current });
      }}
    >
      {children}
    </Command.Item>
  );
}

export interface SuggestionsProps<T> {
  editor: Editor;
  pluginKey?: PluginKey;
  char: string;
  suggestions: T[];
  getKey: (item: T) => string | number;
  renderSuggestion: (item: T, active: boolean) => React.ReactNode;
  onSelect: (item: T, range: Range, editor: Editor) => void;
  filterSuggestions?: (query: string, all: T[]) => T[];
  allow?: (props: {
    editor: Editor;
    state: EditorState;
    range: Range;
    isActive?: boolean;
  }) => boolean;
  startOfLine?: boolean;
  allowedPrefixes?: string[];
  allowSpaces?: boolean;
  modal?: boolean;
  className?: string;
  contentClassName?: string;
  listClassName?: string;
  emptyContent?: React.ReactNode;
}

export function Suggestions<T>({
  editor,
  pluginKey,
  char,
  suggestions,
  getKey,
  renderSuggestion,
  onSelect,
  filterSuggestions = (query, all) =>
    all.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(query.toLowerCase())
    ),
  allow,
  startOfLine,
  allowedPrefixes = DEFAULT_ALLOWED_PREFIXES,
  allowSpaces,
  modal = true,
  contentClassName,
  listClassName,
  emptyContent,
}: SuggestionsProps<T>) {
  const query = useSuggestionQuery();
  const filtered = filterSuggestions(query, suggestions);

  return (
    <SuggestionRoot
      allow={allow}
      allowedPrefixes={allowedPrefixes}
      allowSpaces={allowSpaces}
      char={char}
      contentClassName={contentClassName}
      editor={editor}
      listClassName={listClassName}
      modal={modal}
      pluginKey={pluginKey}
      startOfLine={startOfLine}
    >
      {filtered.length === 0 ? (
        <Command.Empty>{emptyContent ?? <div>No results</div>}</Command.Empty>
      ) : (
        filtered.map((item) => (
          <SuggestionItem
            editor={editor}
            key={getKey(item)}
            onSelect={({ editor: editorInstance, range }) => {
              onSelect(item, range, editorInstance);
            }}
          >
            {renderSuggestion(item, false)}{" "}
          </SuggestionItem>
        ))
      )}
    </SuggestionRoot>
  );
}
