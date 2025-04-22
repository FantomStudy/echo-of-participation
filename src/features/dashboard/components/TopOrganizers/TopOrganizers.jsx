import { useOrganizersTop } from "../../hooks/queries/useOrganizersTop";
import { formatName } from "@/shared/utils/formatUtils";
import styles from "../../styles/Top.module.css";

export default function TopOrganizers() {
  const { organizers, error, isLoading } = useOrganizersTop();

  //TODO СДЕЛАЙ СКЕЛЕТОН КОМПОНЕНТ
  if (isLoading) {
    return <>load</>;
  }
  if (error) {
    return <>Error</>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Список лучших организаторов</h2>
      <ol className={styles.list}>
        {organizers.length > 0 ? (
          organizers.map((organizer) => (
            <li key={`top-organizer-${organizer.id}`}>
              <span className={styles.bold}>
                {formatName(organizer.fullName)}
              </span>{" "}
              - {organizer.eventCount}{" "}
              {organizer.eventCount === 1 ? "мероприятие" : "мероприятий"}
            </li>
          ))
        ) : (
          <li>Нет данных</li>
        )}
      </ol>
    </div>
  );
}
