//TODO ЗАМЕНИТЬ НА ПОДСЧЕТ С СЕРВЕРА
export const getEventStats = (eventKey, attendance) => {
  if (!attendance || typeof attendance !== "object") {
    return 0;
  }

  return Object.values(attendance).reduce(
    (sum, student) => sum + (parseInt(student[eventKey]) || 0),
    0
  );
};
