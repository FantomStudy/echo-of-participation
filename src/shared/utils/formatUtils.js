export const formatName = (fullName) => {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return "Неизвестно";
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return parts[0];
  }

  const lastName = parts[0];
  const firstNameInitial = parts[1]?.[0] ?? "";
  const patronymicInitial = parts[2]?.[0] ?? "";

  return `${lastName} ${firstNameInitial}.${patronymicInitial}.`.trim();
};
