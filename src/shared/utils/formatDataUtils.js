// Приведение ФИО к формату с инициалами
export const formatName = (fullName) => {
  if (!fullName || typeof fullName !== "string") return "Неизвестно";

  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 0) return "Неизвестно";
  if (parts.length === 1) return parts[0];

  const lastName = parts[0];
  const firstNameInitial = parts[1]?.[0] ? `${parts[1][0]}.` : "";
  const patronymicInitial = parts[2]?.[0] ? `${parts[2][0]}.` : "";

  return `${lastName} ${firstNameInitial}${patronymicInitial}`.trim();
};
