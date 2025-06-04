import Loader from "@components/Loader/Loader";
import { queryClient } from "@configs/queryClientConfig";

import { useSaveTable } from "../hooks/mutations/useSaveTable";
import { useEventsForRate } from "../hooks/queries/useEventsForRate";
import { useEditTable } from "../hooks/useEditTable";
import styles from "../styles/EventEvaluation.module.css";

const EventEvaluation = () => {
  const { data, isLoading } = useEventsForRate();
  const userData = queryClient.getQueryData(["currentUser"]);

  const { save } = useSaveTable();

  const { maxRating, localEvents, saveEventRating, handleRatingChange } =
    useEditTable({
      userData,
      events: data,
      mutateFn: save,
    });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className={styles.table_wrapper}>
        <div className={styles.table_block_header}>
          <p>Мероприятия</p>
        </div>
        <div className={styles.table_container}>
          <table className={styles.table}>
            <thead>
              <tr key="header-row">
                <th>Название</th>
                <th>Дата проведения</th>
                <th>Ваша оценка</th>
                <th>Общая оценка</th>
                <th>Количество голосов</th>
              </tr>
            </thead>
            <tbody>
              {localEvents?.map((event, index) => (
                <tr>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>
                    <input
                      type="text"
                      value={event.rating !== null ? event.rating : ""}
                      onChange={(e) =>
                        handleRatingChange(index, e.target.value)
                      }
                      onBlur={(e) => saveEventRating(event.id, e.target.value)}
                      className={styles.trafficInput}
                      placeholder={`0-${maxRating}`}
                    />
                  </td>
                  <td>{event.all.toFixed(1)}</td>
                  <td>{event.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventEvaluation;
