import styles from "../../styles/Top.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TopStudents({ entities, isLoading, error }) {
  if (error) {
    return <>Error</>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isLoading ? <Skeleton width={"85%"} /> : "Список лучших групп"}
      </h2>
      {isLoading ? (
        <Skeleton count={10} width={"65%"} />
      ) : (
        <ol className={styles.list}>
          {entities.length > 0 ? (
            entities.map(
              (item, index) =>
                (
                  <li key={`top-entity-${index}`}>
                    <span className={styles.bold}>{item.groupName}</span> -{" "}
                    {item.totalScore} баллов
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
}
