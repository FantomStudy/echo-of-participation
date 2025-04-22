import api from "@configs/axiosConfig";

//TODO ВРЕМЕННО ЗАМЕНЕНО НА ПОДСЧЁТ НА ФРОНТЕ
export const fetchTotalEventPoints = async () => {};

export const fetchTableData = async ({ pageParam = 1, limit = 400 }) => {
  const response = await api.get(
    `/event-journal/allStudents?page=${pageParam}&limit=${limit}`
  );

  if (response.statusText !== "OK") {
    throw Error("Ошибка при загрузке данных студентов");
  }

  //TODO УБРАТЬ МАССИВ
  const data = response.data[0];
  const dataArray = Array.isArray(data) ? data : [data];

  const eventList = dataArray[0].events.map((event, index) => ({
    name: event.name,
    key: `event${index + 1}`,
  }));

  const studentList = dataArray.map((student) => ({
    id: student.studentId,
    name: student.fullName,
  }));

  const attendanceData = dataArray.reduce((acc, student) => {
    acc[student.studentId] = {};
    student.events.forEach((event, index) => {
      acc[student.studentId][`event${index + 1}`] = event.point.toString();
    });
    return acc;
  }, {});

  return { eventList, studentList, attendanceData };
};

export const saveAttendance = async (dataToSave) => {
  try {
    const response = await api.post("/event-journal/save-journal", [
      dataToSave,
    ]);

    return response;
  } catch (err) {
    console.error(`Ошибка при сохранении данных`, err);
  }
};

export const fetchTopOrganizers = async () => {
  const response = await api.get("/top/teacherRating");

  if (response.statusText !== "OK") {
    throw Error("Ошибка при загрузке топа организаторов");
  }

  const data = response.data;
  return data.slice(0, 5);
};

export const fetchTopStudents = async (filter = "allGroupes") => {
  const response = await api.get(`/top/filterTop?filter=${filter}`);

  if (response.statusText !== "OK") {
    throw Error("Ошибка при загрузке топа учащихся");
  }

  const data = response.data;
  return data.slice(0, 10);
};
