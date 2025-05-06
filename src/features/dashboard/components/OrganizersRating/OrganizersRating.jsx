import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { formatName } from "@utils/formatUtils";

import { useOrganizersRating } from "../../hooks/queries/useOrganizersRating";
import styles from "../../styles/Top.module.css";

const OrganizersRating = () => {
  const { data, error, isLoading } = useOrganizersRating();

  if (error) {
    return <>Не удалось загрузить необходимые данные... </>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isLoading ? (
          <Skeleton width={"85%"} />
        ) : (
          "Оценка вовлеченности сотрудников"
        )}
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
                - {organizer.eventCount} {declineWord(organizer.eventCount)}
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

export default OrganizersRating;

const declineWord = (number) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ["мероприятие", "мероприятия", "мероприятий"];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};
