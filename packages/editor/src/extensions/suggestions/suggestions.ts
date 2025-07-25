import { escapeForRegEx, type Range } from '@tiptap/core';
import type { ResolvedPos } from '@tiptap/pm/model';
import {
  type EditorState,
  Plugin,
  PluginKey,
  type Transaction,
} from '@tiptap/pm/state';
import { Decoration, DecorationSet, type EditorView } from '@tiptap/pm/view';
import type { Editor } from '@tiptap/react';

export interface Trigger {
  char: string;
  allowSpaces: boolean;
  allowedPrefixes: string[] | null;
  startOfLine: boolean;
  $position: ResolvedPos;
}

export type SuggestionMatch = {
  range: Range;
  query: string;
  text: string;
} | null;

export function defaultFindSuggestionMatch(config: Trigger): SuggestionMatch {
  const { char, allowSpaces, allowedPrefixes, startOfLine, $position } = config;

  const escapedChar = escapeForRegEx(char);
  const suffix = new RegExp(`\\s${escapedChar}$`);
  const prefix = startOfLine ? '^' : '';
  const regexp = allowSpaces
    ? new RegExp(`${prefix}${escapedChar}.*?(?=\\s${escapedChar}|$)`, 'gm')
    : new RegExp(`${prefix}(?:^)?${escapedChar}[^\\s${escapedChar}]*`, 'gm');

  const text = $position.nodeBefore?.isText && $position.nodeBefore.text;

  if (!text) {
    return null;
  }

  const textFrom = $position.pos - text.length;
  const match = Array.from(text.matchAll(regexp)).pop();

  if (!match || match.input === undefined || match.index === undefined) {
    return null;
  }

  // JavaScript doesn't have lookbehinds. This hacks a check that first character
  // is a space or the start of the line
  const matchPrefix = match.input.slice(
    Math.max(0, match.index - 1),
    match.index
  );
  const matchPrefixIsAllowed = new RegExp(
    `^[${allowedPrefixes?.join('')}\0]?$`
  ).test(matchPrefix);

  if (allowedPrefixes !== null && !matchPrefixIsAllowed) {
    return null;
  }

  // The absolute position of the match in the document
  const from = textFrom + match.index;
  let to = from + match[0].length;

  // Edge case handling; if spaces are allowed and we're directly in between
  // two triggers
  if (allowSpaces && suffix.test(text.slice(to - 1, to + 1))) {
    match[0] += ' ';
    to += 1;
  }

  const query = match[0].slice(char.length);

  // if the query is just a space, then don't return a suggestion
  if (query === ' ') {
    return null;
  }

  // If the $position is located within the matched substring, return that range
  if (from < $position.pos && to >= $position.pos) {
    return {
      range: {
        from,
        to,
      },
      query: match[0].slice(char.length),
      text: match[0],
    };
  }

  return null;
}

export interface SuggestionOptions<I = any, TSelected = any> {
  /**
   * The plugin key for the suggestion plugin.
   * @default 'suggestion'
   * @example 'mention'
   */
  pluginKey?: PluginKey;

  /**
   * The editor instance.
   * @default null
   */
  editor: Editor;

  /**
   * The character that triggers the suggestion.
   * @default '@'
   * @example '#'
   */
  char?: string;

  /**
   * Allow spaces in the suggestion query.
   * @default false
   * @example true
   */
  allowSpaces?: boolean;

  /**
   * Allow prefixes in the suggestion query.
   * @default [' ']
   * @example [' ', '@']
   */
  allowedPrefixes?: string[] | null;

  /**
   * Only match suggestions at the start of the line.
   * @default false
   * @example true
   */
  startOfLine?: boolean;

  /**
   * The tag name of the decoration node.
   * @default 'span'
   * @example 'div'
   */
  decorationTag?: string;

  /**
   * The class name of the decoration node.
   * @default 'suggestion'
   * @example 'mention'
   */
  decorationClass?: string;

  /**
   * A function that is called when a suggestion is selected.
   * @param props The props object.
   * @param props.editor The editor instance.
   * @param props.range The range of the suggestion.
   * @param props.props The props of the selected suggestion.
   * @returns void
   * @example ({ editor, range, props }) => { props.command(props.props) }
   */
  command?: (props: { editor: Editor; range: Range; props: TSelected }) => void;

  /**
   * A function that returns the suggestion items in form of an array.
   * @param props The props object.
   * @param props.editor The editor instance.
   * @param props.query The current suggestion query.
   * @returns An array of suggestion items.
   * @example ({ editor, query }) => [{ id: 1, label: 'John Doe' }]
   */
  items?: (props: { query: string; editor: Editor }) => I[] | Promise<I[]>;

  /**
   * The render function for the suggestion.
   * @returns An object with render functions.
   */
  render?: () => {
    onBeforeStart?: (props: SuggestionProps<I, TSelected>) => void;
    onStart?: (props: SuggestionProps<I, TSelected>) => void;
    onBeforeUpdate?: (props: SuggestionProps<I, TSelected>) => void;
    onUpdate?: (props: SuggestionProps<I, TSelected>) => void;
    onExit?: (props: SuggestionProps<I, TSelected>) => void;
    onKeyDown?: (props: SuggestionKeyDownProps) => boolean;
  };

  /**
   * A function that returns a boolean to indicate if the suggestion should be active.
   * @param props The props object.
   * @returns {boolean}
   */
  allow?: (props: {
    editor: Editor;
    state: EditorState;
    range: Range;
    isActive?: boolean;
  }) => boolean;
  findSuggestionMatch?: typeof defaultFindSuggestionMatch;
  apply?: (props: {
    transaction: Transaction;
    oldState: EditorState;
    state: EditorState;
  }) => void;
}

export interface SuggestionProps<I = any, TSelected = any> {
  /**
   * The editor instance.
   */
  editor: Editor;

  /**
   * The range of the suggestion.
   */
  range: Range;

  /**
   * The current suggestion query.
   */
  query: string;

  /**
   * The current suggestion text.
   */
  text: string;

  /**
   * The suggestion items array.
   */
  items: I[];

  /**
   * A function that is called when a suggestion is selected.
   * @param props The props object.
   * @returns void
   */
  command: (props: TSelected) => void;

  /**
   * The decoration node HTML element
   * @default null
   */
  decorationNode: Element | null;

  /**
   * The function that returns the client rect
   * @default null
   * @example () => new DOMRect(0, 0, 0, 0)
   */
  clientRect?: (() => DOMRect | null) | null;
}

export interface SuggestionKeyDownProps {
  view: EditorView;
  event: KeyboardEvent;
  range: Range;
}

export const SuggestionPluginKey = new PluginKey('suggestion');

/**
 * This utility allows you to create suggestions.
 * @see https://tiptap.dev/api/utilities/suggestion
 */
export function Suggestion<I = any, TSelected = any>({
  pluginKey = SuggestionPluginKey,
  editor,
  char = '@',
  allowSpaces = false,
  allowedPrefixes = [' '],
  startOfLine = false,
  decorationTag = 'span',
  decorationClass = 'suggestion',
  command = () => null,
  items = () => [],
  render = () => ({}),
  allow = () => true,
  findSuggestionMatch = defaultFindSuggestionMatch,
  apply,
}: SuggestionOptions<I, TSelected>) {
  let props: SuggestionProps<I, TSelected> | undefined;
  const renderer = render?.();

  const plugin: Plugin<any> = new Plugin({
    key: pluginKey,

    view() {
      return {
        update: async (view, prevState) => {
          const prev = this.key?.getState(prevState);
          const next = this.key?.getState(view.state);

          if (!(prev && next)) {
            return;
          }

          // See how the state changed
          const moved =
            prev.active && next.active && prev.range.from !== next.range.from;
          const started = !prev.active && next.active;
          const stopped = prev.active && !next.active;
          const changed = !(started || stopped) && prev.query !== next.query;

          const handleStart = started || (moved && changed);
          const handleChange = changed || moved;
          const handleExit = stopped || (moved && changed);

          // Cancel when suggestion isn't active
          if (!(handleStart || handleChange || handleExit)) {
            return;
          }

          const state = handleExit && !handleStart ? prev : next;
          const decorationNode = view.dom.querySelector(
            `[data-decoration-id="${state.decorationId}"]`
          );

          props = {
            editor,
            range: state.range,
            query: state.query,
            text: state.text,
            items: [],
            command: (commandProps) => {
              return command({
                editor,
                range: state.range,
                props: commandProps,
              });
            },
            decorationNode,
            // virtual node for popper.js or tippy.js
            // this can be used for building popups without a DOM node
            clientRect: decorationNode
              ? () => {
                  // because of `items` can be asynchrounous we’ll search for the current decoration node
                  const state = this.key?.getState(editor.state);
                  if (!state) return null;
                  const { decorationId } = state;
                  const currentDecorationNode = view.dom.querySelector(
                    `[data-decoration-id="${decorationId}"]`
                  );
                  return currentDecorationNode?.getBoundingClientRect() || null;
                }
              : null,
          };

          if (handleStart) {
            renderer?.onBeforeStart?.(props);
          }

          if (handleChange) {
            renderer?.onBeforeUpdate?.(props);
          }

          if (handleChange || handleStart) {
            props.items = await items({
              editor,
              query: state.query,
            });
          }

          if (handleExit) {
            renderer?.onExit?.(props);
          }

          if (handleChange) {
            renderer?.onUpdate?.(props);
          }

          if (handleStart) {
            renderer?.onStart?.(props);
          }
        },

        destroy: () => {
          if (!props) {
            return;
          }

          renderer?.onExit?.(props);
        },
      };
    },

    state: {
      // Initialize the plugin's internal state.
      init() {
        const state: {
          active: boolean;
          range: Range;
          query: null | string;
          text: null | string;
          composing: boolean;
          decorationId?: string | null;
        } = {
          active: false,
          range: {
            from: 0,
            to: 0,
          },
          query: null,
          text: null,
          composing: false,
        };

        return state;
      },

      // Apply changes to the plugin state from a view transaction.
      apply(transaction, prev, oldState, state) {
        const { isEditable } = editor;
        const { composing } = editor.view;
        const { selection } = transaction;
        const { empty, from } = selection;
        const next = { ...prev };

        apply?.({ transaction, oldState, state });

        next.composing = composing;

        // We can only be suggesting if the view is editable, and:
        //   * there is no selection, or
        //   * a composition is active (see: https://github.com/ueberdosis/tiptap/issues/1449)
        if (isEditable && (empty || editor.view.composing)) {
          // Reset active state if we just left the previous suggestion range
          if (
            (from < prev.range.from || from > prev.range.to) &&
            !composing &&
            !prev.composing
          ) {
            next.active = false;
          }

          // Try to match against where our cursor currently is
          const match = findSuggestionMatch({
            char,
            allowSpaces,
            allowedPrefixes,
            startOfLine,
            $position: selection.$from,
          });
          const decorationId = `id_${Math.floor(Math.random() * 0xff_ff_ff_ff)}`;

          // If we found a match, update the current state to show it
          if (
            match &&
            allow({
              editor,
              state,
              range: match.range,
              isActive: prev.active,
            })
          ) {
            next.active = true;
            next.decorationId = prev.decorationId
              ? prev.decorationId
              : decorationId;
            next.range = match.range;
            next.query = match.query;
            next.text = match.text;
          } else {
            next.active = false;
          }
        } else {
          next.active = false;
        }

        // Make sure to empty the range if suggestion is inactive
        if (!next.active) {
          next.decorationId = null;
          next.range = { from: 0, to: 0 };
          next.query = null;
          next.text = null;
        }

        return next;
      },
    },

    props: {
      // Call the keydown hook if suggestion is active.
      handleKeyDown(view, event) {
        const { active, range } = plugin.getState(view.state);

        if (!active) {
          return false;
        }

        return renderer?.onKeyDown?.({ view, event, range });
      },

      // Setup decorator on the currently active suggestion.
      decorations(state) {
        const { active, range, decorationId } = plugin.getState(state);

        if (!active) {
          return null;
        }

        return DecorationSet.create(state.doc, [
          Decoration.inline(range.from, range.to, {
            nodeName: decorationTag,
            class: decorationClass,
            'data-decoration-id': decorationId,
          }),
        ]);
      },
    },
  });

  return plugin;
}
