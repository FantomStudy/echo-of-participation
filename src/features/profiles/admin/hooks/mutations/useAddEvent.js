import { addEvent } from "@features/profiles/admin/api/adminProfileApi";
import { queryClient } from "@configs/queryClientConfig";
import { useMutation } from "@tanstack/react-query";

export const useAddEvent = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (eventData) => addEvent(eventData),
    onSuccess: async () => {
      //TODO ЗАМЕНИТЬ РЕФЕТЧ НА ДОБАВЛЕНИЕ ИВЕНТА В СПИСОК
      await queryClient.refetchQueries({ queryKey: ["events"] });
      console.log("Данные добавлены");
    },
    onError: (error) => {
      console.error("Ошибка при мутации добавления ивента:", error);
    },
  });

  return { addEvent: mutate, isAddingEvent: isPending };
};
