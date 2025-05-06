import { getCookie } from "@utils/cookieUtils";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: !!getCookie("access_token"),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
}));

export const useCheckAuth = () =>
  useAuthStore((state) => state.isAuthenticated);

export const useSetAuth = () => useAuthStore((state) => state.setAuthenticated);
