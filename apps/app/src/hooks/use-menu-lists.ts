import { type Editor, useEditorState } from '@tiptap/react';
import { useMemo } from 'react';

export const useTextMenuLists = (editor: Editor) => {
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      bulletList: ctx.editor?.isActive('bulletList'),
      orderedList: ctx.editor?.isActive('orderedList'),
      taskList: ctx.editor?.isActive('taskList'),
    }),
  });

  return useMemo(
    () => [
      {
        type: 'item',
        label: 'List',
        icon: 'bulletList',
        onClick: () => {
          editor?.chain().focus().toggleList('bulletList', 'listItem').run();
        },
        isActive: () => state.bulletList,
      },
      {
        type: 'item',
        label: 'Numbered list',
        icon: 'numberedList',
        onClick: () => {
          editor?.chain().focus().toggleList('orderedList', 'listItem').run();
        },
        isActive: () => state.orderedList,
      },
      {
        type: 'item',
        label: 'Checklist',
        icon: 'checkList',
        onClick: () => {
          editor?.chain().focus().toggleList('taskList', 'taskItem').run();
        },
        isActive: () => state.taskList,
      },
    ],
    [state, editor]
  );
};
