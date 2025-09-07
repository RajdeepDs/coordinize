"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

type CommentActions = {
  // Reply management
  activeReplyId: string | null;
  setActiveReplyId: (id: string | null) => void;
  toggleReply: (id: string) => void;

  // Resolved comments tracking
  resolvedComments: Set<string>;
  toggleResolve: (id: string) => void;
  isResolved: (id: string) => boolean;

  // Reactions management (for future implementation)
  commentReactions: Record<string, string[]>; // commentId -> emoji reactions
  addReaction: (commentId: string, emoji: string) => void;
  removeReaction: (commentId: string, emoji: string) => void;

  // General comment state
  expandedComments: Set<string>;
  toggleExpanded: (id: string) => void;
  isExpanded: (id: string) => boolean;
};

const CommentContext = createContext<CommentActions | undefined>(undefined);

export function CommentProvider({ children }: { children: ReactNode }) {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [resolvedComments, setResolvedComments] = useState<Set<string>>(
    new Set()
  );
  const [commentReactions, setCommentReactions] = useState<
    Record<string, string[]>
  >({});
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set()
  );

  const toggleReply = (id: string) => {
    setActiveReplyId(activeReplyId === id ? null : id);
  };

  const toggleResolve = (id: string) => {
    setResolvedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isResolved = (id: string) => {
    return resolvedComments.has(id);
  };

  const addReaction = (commentId: string, emoji: string) => {
    setCommentReactions((prev) => ({
      ...prev,
      [commentId]: [...(prev[commentId] || []), emoji],
    }));
  };

  const removeReaction = (commentId: string, emoji: string) => {
    setCommentReactions((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || []).filter((e) => e !== emoji),
    }));
  };

  const toggleExpanded = (id: string) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isExpanded = (id: string) => {
    return expandedComments.has(id);
  };

  return (
    <CommentContext.Provider
      value={{
        activeReplyId,
        setActiveReplyId,
        toggleReply,
        resolvedComments,
        toggleResolve,
        isResolved,
        commentReactions,
        addReaction,
        removeReaction,
        expandedComments,
        toggleExpanded,
        isExpanded,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export function useComment() {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error("useComment must be used within a CommentProvider");
  }
  return context;
}
