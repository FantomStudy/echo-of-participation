import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@configs/queryClientConfig";
import { saveTraffic } from "@dashboard/api/tableApi";

export const useSaveTraffic = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (dataToSave) => saveTraffic(dataToSave),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["activityRating"] });
      console.log("Данные успешно сохранены");
    },
    onError: (error) => {
      console.error("Ошибка при сохранении данных:", error);
    },
  });

  return { save: mutate, isSaving: isPending };
};
