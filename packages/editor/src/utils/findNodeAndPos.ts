import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import type { EditorState } from "@tiptap/pm/state";

export function findNodeAndPos(
  state: EditorState,
  match: (node: ProseMirrorNode) => boolean,
) {
  let result: { pos: number; node: ProseMirrorNode } | undefined;

  state.doc.descendants((node, pos) => {
    if (match(node)) {
      result = { pos, node };
      return false;
    }
    return true;
  });
  return result;
}
