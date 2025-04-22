import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@configs/queryClientConfig";
import { deleteEvent } from "@features/profiles/admin/api/adminProfileApi";

export const useDeleteEvent = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id) => deleteEvent(id),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["events"] });
      console.log("УДАЛЕНО");
    },
    onError: (error) => {
      console.error("Ошибка при мутации удаления иввента:", error);
    },
  });

  return { deleteEvent: mutate, isDeleting: isPending };
};
