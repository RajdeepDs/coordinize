'use client';

import '@coordinize/ui/editor';

import { markdownExtensions } from '@coordinize/editor';
import { cn } from '@coordinize/ui/lib/utils';
import {
  type Editor,
  EditorContent,
  type Extensions,
  useEditor,
} from '@tiptap/react';
import { useDebouncedCallback } from 'use-debounce';
import { EditorBubbleMenu } from '@/components/features/markdown-editor/editor-bubble-menu';
import { SlashCommand } from '@/components/features/markdown-editor/slash-command';
import { EMPTY_HTML } from '@/utils/markdown';

interface MarkdownEditorProps {
  id?: string;
  placeholder?: string;
  content?: string;
  minHeight?: string;
  maxHeight?: string;
  textSize?: 'sm' | 'base';
  containerClasses?: string;
  onChangeDebounced?: (html: string) => void;
  onChangeDebounceMs?: number;
  onEmptyDidChange?: (isEmpty: boolean) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  editable?: boolean;
}

export function MarkdownEditor(props: MarkdownEditorProps) {
  const {
    id = '',
    placeholder,
    content,
    maxHeight,
    minHeight,
    textSize,
    containerClasses = 'px-3 py-2.5',
    onChangeDebounced,
    onChangeDebounceMs = 300,
    onEmptyDidChange,
    editable = true,
  } = props;

  const onChangeDebouncedInner = useDebouncedCallback(
    (editorInstance: Editor) => {
      onChangeDebounced?.(editorInstance.getHTML());
    },
    onChangeDebounceMs
  );

  const editor = useEditor(
    {
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: false,
      editorProps: {
        attributes: {
          id,
          class: cn(
            'prose editing w-full max-w-full select-auto overflow-hidden focus:outline-none',
            {
              'text-sm': textSize === 'sm',
            },
            containerClasses
          ),
          style: [
            minHeight && `min-height: ${minHeight}`,
            maxHeight && `max-height: ${maxHeight}`,
          ]
            .filter(Boolean)
            .join('; '),
        },
      },
      editable,
      parseOptions: {
        preserveWhitespace: true,
      },
      extensions: markdownExtensions({
        placeholder,
      }) as Extensions,
      content,
      onUpdate: ({ editor: editorInstance }) => {
        const htmlContent = editorInstance.getHTML();

        onEmptyDidChange?.(htmlContent === EMPTY_HTML);

        onChangeDebouncedInner(editorInstance as Editor);
      },
    },
    []
  );

  if (!editor) {
    return null;
  }

  return (
    <>
      <EditorContent
        editor={editor}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
      <EditorBubbleMenu editor={editor} />
      {editor && <SlashCommand editor={editor} />}
    </>
  );
}
