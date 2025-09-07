import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OnboardingFormFields = {
  preferredName: string;
  profilePic: string;
  workspaceName: string;
  workspaceURL: string;
  workspaceLogo: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  timezone: string;
};

type OnboardingState = OnboardingFormFields & {
  setField: <K extends keyof OnboardingFormFields>(
    key: K,
    value: OnboardingFormFields[K]
  ) => void;
  reset: () => void;
};

const initialState: OnboardingFormFields = {
  preferredName: "",
  profilePic: "",
  workspaceName: "",
  workspaceURL: "",
  workspaceLogo: "",
  emailNotifications: true,
  pushNotifications: false,
  timezone: "",
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,
      setField: (key, value) => set((state) => ({ ...state, [key]: value })),
      reset: () => set(() => ({ ...initialState })),
    }),
    {
      name: "onboarding-storage",
    }
  )
);
