export const formatName = (fullName: string) => {
  const [lastName, firstName, patronymic] = fullName.trim().split(/\s+/);

  if (!lastName) return "Неизвестно";
  if (!firstName) return lastName;

  const firstInitial = firstName?.[0].toUpperCase() ?? "";
  const patronymicInitial = patronymic?.[0].toUpperCase() ?? "";

  return `${lastName} ${firstInitial}.${patronymicInitial}.`;
};
