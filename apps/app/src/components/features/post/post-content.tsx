import { EMPTY_HTML } from '@/utils/markdown';
import { MarkdownEditor } from '../markdown-editor';

interface PostContentProps {
  title: string;
  content: string | null;
}

export function PostContent({ title, content = EMPTY_HTML }: PostContentProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* TODO: Replace h1 with an Input Field for title */}
      <h1 className="font-medium text-2xl">{title}</h1>
      <MarkdownEditor containerClasses="px-0 h-full" content={content || ''} />
    </div>
  );
}
