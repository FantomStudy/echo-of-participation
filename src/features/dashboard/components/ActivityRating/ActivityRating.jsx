import Skeleton from "react-loading-skeleton";
import { useActivityRating } from "../../hooks/queries/useActivityRating";
import { useFilterStore } from "@stores/filterStore";
import styles from "../../styles/Top.module.css";
import "react-loading-skeleton/dist/skeleton.css";
import { formatName } from "@/shared/utils/formatUtils";

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
    : `Список лучших групп`;

  if (error) {
    return <>Error</>;
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
            data.slice(0, 10).map(
              (item, index) =>
                (
                  <li key={`top-entity-${index}`}>
                    <span className={styles.bold}>
                      {isStudents ? formatName(item.name) : item.name}
                    </span>{" "}
                    - {item.totalScore} баллов
                  </li>
                ) || <Skeleton />
            )
          ) : (
            <li>Нет данных</li>
          )}
        </ol>
      )}
    </div>
  );
};

export default ActivityRating;
