import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
} from "novel";
import { suggestionItems } from "./slash-command";

export function SlashCommand() {
  return (
    <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background p-1 shadow-md transition-all">
      {" "}
      <EditorCommandEmpty className="text-muted-foreground">
        No results
      </EditorCommandEmpty>
      <EditorCommandList className="min-w-[200px] rounded-lg">
        {suggestionItems.map((item) => (
          <EditorCommandItem
            value={item.title}
            onCommand={(val) => {
              // Prevent default behavior that might cause refresh
              item.command?.(val);
              return false;
            }}
            className="flex w-full items-center space-x-2 rounded-md p-2 px-1.5 text-left text-[10px] hover:bg-accent aria-selected:bg-accent"
            key={item.title}
          >
            <div className="text-muted-foreground">{item.icon}</div>
            <p className="font-medium text-sm">{item.title}</p>
          </EditorCommandItem>
        ))}
      </EditorCommandList>
    </EditorCommand>
  );
}
