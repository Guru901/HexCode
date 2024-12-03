import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type BrowserStoreActions = {
  isBrowserNeeded: boolean;
  setIsBrowserNeeded: (newValue: boolean) => void;
};

export const useBrowserStore = create(
  persist<BrowserStoreActions>(
    (set) => ({
      isBrowserNeeded: false,
      setIsBrowserNeeded: (newValue: boolean) =>
        set({ isBrowserNeeded: newValue }),
    }),
    {
      name: "browser-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
