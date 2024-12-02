import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FileStoreActions = {
  selectedFile: string;
  setSelectedFile: (newFile: string) => void;
};

export const useFileStore = create(
  persist<FileStoreActions>(
    (set) => ({
      selectedFile: "",
      setSelectedFile: (newFile: string) => set({ selectedFile: newFile }),
    }),
    {
      name: "file-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
