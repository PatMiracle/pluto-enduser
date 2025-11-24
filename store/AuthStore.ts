import { create } from "zustand";

type AuthState = {
  token: string;
  setToken: (t: string) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  token: "",
  setToken: (t) => set({ token: t }),
}));

export default useAuthStore;
