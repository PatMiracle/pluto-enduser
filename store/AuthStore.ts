import axios from "axios";
import { create } from "zustand";

type AuthState = {
  token: string;
  setToken: (t: string) => void;
  logout: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  token: "",
  setToken: (t) => set({ token: t }),
  logout: async () => {
    await axios.post("/api/logout");
    set({ token: "" });
  },
}));

export default useAuthStore;
