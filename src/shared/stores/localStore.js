import { create } from "zustand";
import { getCookie, removeCookie } from "@utils/cookieUtils";
import { queryClient } from "@configs/queryClientConfig";

export const useLocalStore = create(() => ({
  checkAuth: () => !!getCookie("access_token"),

  logout: () => {
    removeCookie("access_token");
    queryClient.removeQueries(["user"]);
  },
}));

export const useCheckAuth = () => useLocalStore((state) => state.checkAuth);
export const useLogout = () => useLocalStore((state) => state.logout);
