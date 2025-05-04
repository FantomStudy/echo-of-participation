import { addEvent } from "@features/profiles/admin/api/adminProfileApi";
import { queryClient } from "@configs/queryClientConfig";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAddEvent = () => {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (eventData) => addEvent(eventData),
    onSuccess: async () => {
      //TODO ЗАМЕНИТЬ РЕФЕТЧ НА ДОБАВЛЕНИЕ ИВЕНТА В СПИСОК
      await queryClient.refetchQueries({ queryKey: ["events"] });
      console.log("Данные добавлены");
      navigate("/admin");
    },
    onError: (error) => {
      console.error("Ошибка при мутации добавления ивента:", error);
    },
  });

  return { addEvent: mutate, isAddingEvent: isPending, error };
};
