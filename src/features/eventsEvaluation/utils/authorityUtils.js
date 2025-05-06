export const getMaxRatingByRole = (roleName) => {
  switch (roleName) {
    case "Администратор":
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
