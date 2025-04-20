// Вычисляет общее количество баллов для студента
export const getStudentTotalPoints = (attendance, studentId) => {
  const studentAttendance = attendance[studentId] || {};
  return Object.values(studentAttendance).reduce(
    (sum, value) => sum + (parseInt(value) || 0),
    0
  );
};

// Вычисляет статистику по событию (сумма баллов для всех студентов по конкретному событию)
export const getEventStats = (eventKey, attendance) => {
  return Object.values(attendance).reduce(
    (sum, student) => sum + (parseInt(student[eventKey]) || 0),
    0
  );
};

// Вычисляет максимальный оценочный балл
export const getMaxRateByRole = (roleName) => {
  switch (roleName) {
    case "admin":
      return 1;
    case "Директор":
      return 1;
    case "Зам. директора":
      return 0.8;
    case "Преподаватель":
      return 0.6;
    default:
      return 0;
  }
};
