'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type PostSchema, postDefaultValues } from '@/lib/schemas/post';
import { EMPTY_HTML } from '@/utils/markdown';

export interface DraftPostData {
  title: string;
  description: string;
  space_id: string;
  lastModified: string;
}

interface DraftPostStore {
  draftPost: DraftPostData;
  hasContent: boolean;

  // Actions
  saveDraft: (data: Partial<PostSchema>) => void;
  loadDraft: () => PostSchema;
  clearDraft: () => void;
  updateLastModified: () => void;
  checkHasContent: () => boolean;
}

export const useDraftPostStore = create<DraftPostStore>()(
  persist(
    (set, get) => ({
      draftPost: {
        ...postDefaultValues,
        lastModified: new Date().toISOString(),
      },
      hasContent: false,

      saveDraft: (data: Partial<PostSchema>) => {
        const draftData: DraftPostData = {
          title: data.title || '',
          description: data.description || '',
          space_id: data.space_id || '',
          lastModified: new Date().toISOString(),
        };

        const hasContent = !!(
          draftData.title.trim() ||
          (draftData.description.trim() &&
            draftData.description.trim() !== EMPTY_HTML)
        );

        set({
          draftPost: draftData,
          hasContent,
        });
      },

      loadDraft: () => {
        const { draftPost } = get();
        return {
          title: draftPost.title,
          description: draftPost.description,
          space_id: draftPost.space_id,
        };
      },

      clearDraft: () => {
        set({
          draftPost: {
            ...postDefaultValues,
            lastModified: new Date().toISOString(),
          },
          hasContent: false,
        });
      },

      updateLastModified: () => {
        const { draftPost } = get();
        set({
          draftPost: {
            ...draftPost,
            lastModified: new Date().toISOString(),
          },
        });
      },

      checkHasContent: () => {
        const { draftPost } = get();
        const hasContent = !!(
          draftPost.title.trim() ||
          (draftPost.description.trim() &&
            draftPost.description.trim() !== EMPTY_HTML)
        );
        set({ hasContent });
        return hasContent;
      },
    }),
    {
      name: 'coordinize-draft-post', // localStorage key
      partialize: (state) => ({
        draftPost: state.draftPost,
      }), // Only persist draftPost, not hasContent
      onRehydrateStorage: () => (state) => {
        // Recalculate hasContent after rehydration
        if (state) {
          state.checkHasContent();
        }
      },
    }
  )
);
