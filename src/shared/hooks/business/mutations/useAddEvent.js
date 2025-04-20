import { addEvent } from "@/features/profile/admin/api/adminProfileApi";
import { queryClient } from "@/shared/configs/queryClientConfig";
import { useMutation } from "@tanstack/react-query";

export const useAddEvent = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (eventData) => {
      addEvent(eventData);
    },
    onSuccess: async () => {
      //TODO ЗАМЕНИТЬ РЕФЕТЧ НА ДОБАВЛЕНИЕ ИВЕНТА
      await queryClient.refetchQueries({ queryKey: ["adminPageEvents"] });
      console.log("Данные добавлены");
    },
    onError: (error) => {
      console.error("Ошибка при мутации:", error);
    },
  });

  return { mutate, isMutating: isPending };
};
