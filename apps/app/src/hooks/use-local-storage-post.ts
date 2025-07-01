'use client';

import { useEffect, useState } from 'react';
import type { PostSchema } from '@/lib/schemas/post';

const LOCAL_STORAGE_KEY = 'coordinize_draft_post';

export interface LocalStoragePostData {
  title: string;
  description: string;
  space_id: string;
  lastModified: string;
}

export function useLocalStoragePost() {
  const [hasStoredPost, setHasStoredPost] = useState(false);

  // Check if there's a stored post on mount
  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      try {
        const parsedData: LocalStoragePostData = JSON.parse(storedData);
        // Check if the stored post has some content
        const hasContent =
          parsedData.title?.trim() || parsedData.description?.trim();
        setHasStoredPost(!!hasContent);
      } catch {
        // Invalid JSON, remove it
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setHasStoredPost(false);
      }
    }
  }, []);

  const saveToLocalStorage = (data: Partial<PostSchema>) => {
    try {
      const postData: LocalStoragePostData = {
        title: data.title || '',
        description: data.description || '',
        space_id: data.space_id || '',
        lastModified: new Date().toISOString(),
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(postData));

      // Update hasStoredPost state
      const hasContent = postData.title?.trim() || postData.description?.trim();
      setHasStoredPost(!!hasContent);
    } catch {
      // Failed to save to localStorage, continue silently
    }
  };

  const loadFromLocalStorage = (): PostSchema | null => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!storedData) {
        return null;
      }

      const parsedData: LocalStoragePostData = JSON.parse(storedData);
      return {
        title: parsedData.title || '',
        description: parsedData.description || '',
        space_id: parsedData.space_id || '',
      };
    } catch {
      // Failed to load from localStorage
      return null;
    }
  };

  const clearLocalStorage = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setHasStoredPost(false);
    } catch {
      // Failed to clear localStorage, continue silently
    }
  };

  const getStoredPostInfo = (): { hasContent: boolean } | null => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!storedData) {
        return null;
      }

      const parsedData: LocalStoragePostData = JSON.parse(storedData);
      return {
        hasContent: !!(
          parsedData.title?.trim() || parsedData.description?.trim()
        ),
      };
    } catch {
      return null;
    }
  };

  return {
    hasStoredPost,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage,
    getStoredPostInfo,
  };
}
