import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@configs/queryClientConfig";
import { saveAttendance } from "@features/dashboard/api/dashboardApi";

export const useSaveAttendance = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (dataToSave) => saveAttendance(dataToSave),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["topStudents"] });
      console.log("Данные успешно сохранены");
    },
    onError: (error) => {
      console.error("Ошибка при сохранении данных:", error);
    },
  });

  return { save: mutate, isSaving: isPending };
};
