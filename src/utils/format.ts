export const formatName = (fullName: string) => {
  const [lastName, firstName, patronymic] = fullName.trim().split(/\s+/);

  if (!lastName) return "Неизвестно";
  if (!firstName) return lastName;

  const firstInitial = firstName?.[0].toUpperCase() ?? "";
  const patronymicInitial = patronymic?.[0].toUpperCase() ?? "";

  return `${lastName} ${firstInitial}.${patronymicInitial}.`;
};

export const declineWord = (number: number, titles: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2];

  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};
