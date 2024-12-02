import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FileTreeStoreActions = {
  fileTree: [];
  setFileTree: (fielTree: []) => void;
};

export const useFileTreeStore = create(
  persist<FileTreeStoreActions>(
    (set) => ({
      fileTree: [],
      setFileTree: (fielTree: []) => set({ fileTree: fielTree }),
    }),
    {
      name: "file-tree-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
