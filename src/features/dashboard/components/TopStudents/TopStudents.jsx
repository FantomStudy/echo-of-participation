import { useStudents } from "@/shared/hooks/business/queries/useStudents";
import styles from "../../styles/Top.module.css";

export default function TopStudents() {
  const { data, isLoading, error } = useStudents();

  //TODO СДЕЛАЙ СКЕЛЕТОН КОМПОНЕНТ
  if (isLoading) {
    return <>load</>;
  }
  if (error) {
    return <>Error</>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Список лучших групп</h2>
      <ol className={styles.list}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <li key={`top-entity-${index}`}>
              <span className={styles.bold}>{item.groupName}</span> -{" "}
              {item.totalScore} баллов
            </li>
          ))
        ) : (
          <li>Нет данных</li>
        )}
      </ol>
    </div>
  );
}
