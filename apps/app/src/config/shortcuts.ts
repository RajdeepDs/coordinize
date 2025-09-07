export type ShortcutItem = {
  id: string;
  description: string;
  shortcut: string | string[];
  category: string;
};

export type ShortcutGroup = {
  title: string;
  shortcuts: ShortcutItem[];
};

export const keyboardShortcuts: ShortcutGroup[] = [
  {
    title: "General",
    shortcuts: [
      {
        id: "back",
        description: "Back",
        shortcut: "esc",
        category: "general",
      },
      {
        id: "help",
        description: "Open help center",
        shortcut: "?",
        category: "general",
      },
      {
        id: "shortcuts",
        description: "View keyboard shortcuts",
        shortcut: "meta+/",
        category: "general",
      },
      {
        id: "logout",
        description: "Log out",
        shortcut: "alt+shift+q",
        category: "general",
      },
    ],
  },
  {
    title: "Navigation",
    shortcuts: [
      {
        id: "left_sidebar",
        description: "Toggle left sidebar",
        shortcut: "[",
        category: "navigation",
      },
      {
        id: "right_sidebar",
        description: "Toggle right sidebar",
        shortcut: "]",
        category: "navigation",
      },
      {
        id: "go_home",
        description: "Go to home",
        shortcut: "G then H",
        category: "navigation",
      },
      {
        id: "go_inbox",
        description: "Go to inbox",
        shortcut: "G then I",
        category: "navigation",
      },
      {
        id: "go_drafts",
        description: "Go to drafts",
        shortcut: "G then D",
        category: "navigation",
      },
      {
        id: "go_settings",
        description: "Go to settings",
        shortcut: "G then S",
        category: "navigation",
      },
      {
        id: "inbox_filter",
        description: "Toggle inbox filter",
        shortcut: "f",
        category: "navigation",
      },
      {
        id: "post_favorite",
        description: "Favorite or Unfavorite post",
        shortcut: "alt+f",
        category: "navigation",
      },
    ],
  },
  {
    title: "Spaces",
    shortcuts: [
      {
        id: "space_1",
        description: "Go to space 1",
        shortcut: "alt+1",
        category: "spaces",
      },
      {
        id: "space_2",
        description: "Go to space 2",
        shortcut: "alt+2",
        category: "spaces",
      },
      {
        id: "space_3",
        description: "Go to space 3",
        shortcut: "alt+3",
        category: "spaces",
      },
      {
        id: "space_4",
        description: "Go to space 4",
        shortcut: "alt+4",
        category: "spaces",
      },
      {
        id: "space_5",
        description: "Go to space 5",
        shortcut: "alt+5",
        category: "spaces",
      },
      {
        id: "space_6",
        description: "Go to space 6",
        shortcut: "alt+6",
        category: "spaces",
      },
      {
        id: "space_7",
        description: "Go to space 7",
        shortcut: "alt+7",
        category: "spaces",
      },
      {
        id: "space_8",
        description: "Go to space 8",
        shortcut: "alt+8",
        category: "spaces",
      },
      {
        id: "space_9",
        description: "Go to space 9",
        shortcut: "alt+9",
        category: "spaces",
      },
      {
        id: "new_space",
        description: "Create new space",
        shortcut: "alt+0",
        category: "spaces",
      },
    ],
  },
  {
    title: "Posts & Composer",
    shortcuts: [
      {
        id: "compose_post",
        description: "Open post composer",
        shortcut: "c",
        category: "posts",
      },
      {
        id: "new_post",
        description: "Switch space in composer",
        shortcut: "meta+shift+m",
        category: "posts",
      },
      {
        id: "prev_post",
        description: "Previous post",
        shortcut: ["j", "↑"],
        category: "posts",
      },
      {
        id: "next_post",
        description: "Next post",
        shortcut: ["k", "↓"],
        category: "posts",
      },
    ],
  },
  {
    title: "Text Formatting",
    shortcuts: [
      {
        id: "bold",
        description: "Bold text",
        shortcut: "meta+B",
        category: "formatting",
      },
      {
        id: "italic",
        description: "Italic text",
        shortcut: "meta+I",
        category: "formatting",
      },
      {
        id: "underline",
        description: "Underline text",
        shortcut: "meta+U",
        category: "formatting",
      },
      {
        id: "strikethrough",
        description: "Strikethrough text",
        shortcut: "meta+shift+S",
        category: "formatting",
      },
      {
        id: "blockquote",
        description: "Block quote",
        shortcut: "meta+shift+B",
        category: "formatting",
      },
      {
        id: "inline_code",
        description: "Inline code",
        shortcut: "meta+E",
        category: "formatting",
      },
      {
        id: "code_block",
        description: "Code block",
        shortcut: "meta+alt+C",
        category: "formatting",
      },
    ],
  },
];

// Helper functions for filtering and searching shortcuts
export const getShortcutsByCategory = (category: string): ShortcutItem[] => {
  return keyboardShortcuts
    .flatMap((group) => group.shortcuts)
    .filter((shortcut) => shortcut.category === category);
};

export const getAllShortcuts = (): ShortcutItem[] => {
  return keyboardShortcuts.flatMap((group) => group.shortcuts);
};

export const searchShortcuts = (query: string): ShortcutItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllShortcuts().filter(
    (shortcut) =>
      shortcut.description.toLowerCase().includes(lowercaseQuery) ||
      (typeof shortcut.shortcut === "string"
        ? shortcut.shortcut.toLowerCase().includes(lowercaseQuery)
        : shortcut.shortcut.some((s) =>
            s.toLowerCase().includes(lowercaseQuery)
          ))
  );
};

export const getShortcutById = (id: string): ShortcutItem | undefined => {
  return getAllShortcuts().find((shortcut) => shortcut.id === id);
};
