import { queryClient } from "@configs/queryClientConfig";
import { useMutation } from "@tanstack/react-query";

import { saveJournal } from "../../api/evenEvaluationApi";

export const useSaveTable = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (dataToSave) => saveJournal(dataToSave),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["eventsForRate"] });
      console.log("Оценка успешно сохранена");
    },
    onError: (error) => {
      console.error("Ошибка при сохранении данных:", error);
    },
  });

  return { save: mutate, isSaving: isPending };
};
