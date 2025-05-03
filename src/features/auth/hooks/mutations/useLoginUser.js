import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@configs/queryClientConfig";
import { loginUser } from "@auth/api/authApi";
import { useAuthStore } from "@stores/authStore";

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
