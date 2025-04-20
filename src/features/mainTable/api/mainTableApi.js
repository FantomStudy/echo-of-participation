import api from "@shared/configs/axiosConfig";

export const fetchAllStudentsApi = async () => {
  const response = await api.get("/event-journal/allStudents");
  console.log(response);

  if (response.statusText !== "OK") {
    throw new Error("Ошибка при загрузке данных студентов");
  }

  const apiData = response.data;
  const dataArray = Array.isArray(apiData) ? apiData : [apiData];

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

  return { eventList, studentList, attendanceData, error: null };
};
