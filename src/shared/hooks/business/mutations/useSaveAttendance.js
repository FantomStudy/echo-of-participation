import { saveAttendance } from "@/features/dashboard/api/dashboardApi";
import { queryClient } from "@configs/queryClientConfig";
import { useMutation } from "@tanstack/react-query";

export const useSaveAttendance = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (dataToSave) => {
      saveAttendance(dataToSave);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["topStudents"] });
      console.log("Данные успешно сохранены");
    },
    onError: (error) => {
      console.error("Ошибка при сохранении данных:", error);
    },
  });

  return { mutate, isMutating: isPending };
};
