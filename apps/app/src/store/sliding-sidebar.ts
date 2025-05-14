import { create } from "zustand";

type SlidingSidebarState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useSlidingSidebarStore = create<SlidingSidebarState>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set(() => ({ isOpen })),
}));
