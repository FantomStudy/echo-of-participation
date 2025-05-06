import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useFilterStore } from "@stores/filterStore";
import { formatName } from "@utils/formatUtils";

import styles from "../../styles/Top.module.css";

const ActivityRating = ({ data, error, isLoading }) => {
  const filters = useFilterStore((state) => state.filters);

  const isStudents = filters.filterType === "journal";
  const isDepartments = filters.filterType === "departments";
  const isGroups = filters.filterType === "groupes";

  const filterHeader = isDepartments
    ? "Список лучших отделений"
    : isGroups
      ? `${filters.filterLabel}`
      : isStudents
        ? `Список лучших в ${filters.filterLabel}`
        : filters.filterType === "course"
          ? `Лучшие группы ${filters.id} курса`
          : `Список лучших групп`;

  if (error) {
    return <>Не удалось загрузить необходимые данные...</>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isLoading ? <Skeleton width={"85%"} /> : filterHeader}
      </h2>
      {isLoading ? (
        <Skeleton count={10} width={"65%"} />
      ) : (
        <ol className={styles.list}>
          {data.length > 0 ? (
            data.slice(0, 10).map((item, index) => (
              <li key={`top-entity-${index}`}>
                <span className={styles.bold}>
                  {isStudents ? formatName(item.name) : item.name}
                </span>{" "}
                - {item.totalScore} {declineWord(item.totalScore)}
              </li>
            ))
          ) : (
            <li>Нет данных</li>
          )}
        </ol>
      )}
    </div>
  );
};

export default ActivityRating;

const declineWord = (number) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ["балл", "балла", "баллов"];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};
