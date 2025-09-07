"use client";

import { useDraftPostStore } from "@/store/draft-post-store";

export function useLocalStoragePost() {
  const {
    hasContent,
    saveDraft,
    loadDraft,
    clearDraft,
    checkHasContent,
    draftPost,
  } = useDraftPostStore();

  return {
    hasStoredPost: hasContent,
    saveToLocalStorage: saveDraft,
    loadFromLocalStorage: loadDraft,
    clearLocalStorage: clearDraft,
    getStoredPostInfo: () => ({ hasContent: checkHasContent() }),
    draftPost,
  };
}
