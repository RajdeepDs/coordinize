import { Input } from "@coordinize/ui/components/input";
import { Icons } from "@coordinize/ui/lib/icons";
import Link from "next/link";

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export interface AnyEvent {
  preventDefault: () => void;
  stopPropagation: () => void;
}

interface Props {
  url: string;
  onChangeUrl: (value: string) => void;
  onSaveLink: (e: AnyEvent) => void;
  onRemoveLink: (e: AnyEvent) => void;
}

export function LinkEditor({
  url,
  onChangeUrl,
  onSaveLink,
  onRemoveLink,
}: Props) {
  function handleEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    onSaveLink(e);
  }

  return (
    <div className="flex items-center gap-1">
      <div onClickCapture={(e) => e.stopPropagation()}>
        <Input
          placeholder="Enter a url..."
          autoFocus
          value={url}
          onChange={onChangeUrl}
          onKeyDownCapture={(e) => {
            if (e?.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              onSaveLink(e);
            }
          }}
        />
      </div>
      <button
        type="button"
        onClick={handleEnter}
        className="flex h-7 w-7 flex-none items-center justify-center rounded bg-blue-500 p-1 hover:bg-blue-400"
      >
        <Icons.check />
      </button>
      <button
        type="button"
        onClick={onRemoveLink}
        className="flex h-7 w-7 flex-none items-center justify-center rounded p-1 hover:bg-red-500"
      >
        <Icons.trash />
      </button>
      {!!url && isValidUrl(url) && (
        <Link
          href={url}
          target="_blank"
          className="flex h-7 w-7 flex-none items-center justify-center rounded p-1 hover:bg-quaternary"
        >
          <Icons.externalLink />
        </Link>
      )}
    </div>
  );
}
