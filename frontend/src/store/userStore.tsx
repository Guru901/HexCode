import { User } from "@/lib/types";
import { create } from "zustand";

type UserStoreActions = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserStoreActions>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));
