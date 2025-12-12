import { User } from "@/services/user-api";
import axios from "axios";
import { redirect, RedirectType } from "next/navigation";
import { create } from "zustand";

type AuthState = {
  token: string;
  setToken: (t: string) => void;
  logout: () => Promise<void>;
  user?: User;
};

const useAuthStore = create<AuthState>((set) => ({
  token: "",
  setToken: (t) => set({ token: t }),
  logout: async () => {
    await axios.post("/api/logout");
    set({ token: "", user: undefined });
    window.location.replace("/login");
  },
}));

export default useAuthStore;
