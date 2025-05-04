import { useOrganizersRating } from "../../hooks/queries/useOrganizersRating";
import { formatName } from "@/shared/utils/formatUtils";
import styles from "../../styles/Top.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function OrganizersRating() {
  const { data, error, isLoading } = useOrganizersRating();

  if (error) {
    return <>Error</>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isLoading ? <Skeleton width={"85%"} /> : "Список лучших организаторов"}
      </h2>
      {isLoading ? (
        <Skeleton count={5} width={"65%"} />
      ) : (
        <ol className={styles.list}>
          {data.length > 0 ? (
            data.map((organizer) => (
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
      )}
    </div>
  );
}
