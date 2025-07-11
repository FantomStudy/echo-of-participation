import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";

import { login } from "./api";
import type { LoginCredentials } from "./types";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: () => {
      console.log("Успешный вход в систему!");
      navigate({ to: "/", replace: true });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      console.error("Ошибка входа в систему:", err);
    },
  });
};
