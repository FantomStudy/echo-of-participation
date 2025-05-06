import { useNavigate } from "react-router-dom";

import { queryClient } from "@configs/queryClientConfig";
import { loginUser } from "@features/auth/api/authApi";
import { useAuthStore } from "@stores/authStore";
import { useMutation } from "@tanstack/react-query";

export const useLoginUser = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuthenticated);

  const { mutate, isPending } = useMutation({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: async () => {
      setAuth(true);
      await queryClient.refetchQueries({ queryKey: ["currentUser"] });
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.error("Попытка входа не удалась:", error);
    },
  });

  return { login: mutate, isPending };
};
