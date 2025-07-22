'use client';

import type { Notification } from '@coordinize/database/db';
import { createContext, useContext, useState } from 'react';

interface InboxContextType {
  selectedNotification: (Notification & { workspace: { slug: string } }) | null;
  setSelectedNotification: (
    notification: (Notification & { workspace: { slug: string } }) | null
  ) => void;
}

const InboxContext = createContext<InboxContextType | undefined>(undefined);

export function InboxProvider({ children }: { children: React.ReactNode }) {
  const [selectedNotification, setSelectedNotification] = useState<
    (Notification & { workspace: { slug: string } }) | null
  >(null);

  return (
    <InboxContext.Provider
      value={{
        selectedNotification,
        setSelectedNotification,
      }}
    >
      {children}
    </InboxContext.Provider>
  );
}

export function useInboxContext() {
  const context = useContext(InboxContext);
  if (context === undefined) {
    throw new Error('useInboxContext must be used within an InboxProvider');
  }
  return context;
}
