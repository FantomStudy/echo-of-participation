export const getFilterDisplay = (filters) => {
  const filterTypeMap = {
    journal: "ФИО",
    departments: "Отделения",
    groupes: "Группы",
    course: "Группы",
  };

  const sortMap = {
    week: "Неделя",
    month: "Месяц",
    halfYear: "Полугодие",
  };

  const headTable = filterTypeMap[filters.filterType || "journal"] || "ФИО";
  const filterSort =
    filters.sort === "custom"
      ? filters.customRange
      : sortMap[filters.sort || ""] || null;

  return { headTable, filterSort };
};
