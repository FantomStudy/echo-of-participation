import Loader from "@/shared/components/Loader/Loader";
import { useEventsForRate } from "../hooks/business/queries/useEventsForRate";
import styles from "../styles/EventEvaluation.module.css";
import { queryClient } from "@/shared/configs/queryClientConfig";
import { useEffect, useState } from "react";
import api from "@/shared/configs/axiosConfig";

const EventEvaluation = () => {
  const { data, isLoading } = useEventsForRate();
  const userData = queryClient.getQueryData(["currentUser"]);

  const [eventRating, setEventRating] = useState(data);
  const [error, setError] = useState(null);

  useEffect(() => setEventRating(data), [data]);

  const getMaxRatingByRole = (roleName) => {
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
  const maxRating = getMaxRatingByRole(userData.roleName);

  const handleRatingChange = (index, value) => {
    setEventRating((prev) =>
      prev.map((event, i) =>
        i === index ? { ...event, rating: value } : event
      )
    );
  };

  const saveEventRating = async (eventId, point) => {
    // Нормализуем ввод: заменяем запятую на точку
    const normalizedPoint = point.replace(",", ".");
    const parsedPoint =
      normalizedPoint === "" ? null : parseFloat(normalizedPoint);

    if (parsedPoint !== null && (isNaN(parsedPoint) || parsedPoint < 0)) {
      setEventRating((prev) =>
        prev.map((item) =>
          item.id === eventId ? { ...item, rating: null } : item
        )
      );
      setError(`Оценка должна быть числом от 0 до ${maxRating}`);
      setTimeout(() => setError(null), 5000);
      return;
    }

    if (parsedPoint !== null && parsedPoint > maxRating) {
      setEventRating((prev) =>
        prev.map((item) =>
          item.eventId === eventId ? { ...item, rating: null } : item
        )
      );
      setError(
        `Оценка не может превышать ${maxRating} для вашей роли (${userData.roleName})`
      );
      setTimeout(() => setError(null), 5000);
      return;
    }

    try {
      const ratingData = [
        {
          eventId,
          userId: userData.id,
          point: parsedPoint,
        },
      ];

      const response = await api.post("/event-rating/saveJournal", ratingData);

      console.log("Оценка успешно сохранена");

      queryClient.refetchQueries({ queryKey: ["eventsForRate"] });
    } catch (error) {
      console.error("Ошибка при сохранении рейтинга:", error);
      setEventRating((prev) =>
        prev.map((item) =>
          item.eventId === eventId ? { ...item, rating: null } : item
        )
      );
      setError("Не удалось сохранить оценку");
      setTimeout(() => setError(null), 5000);
    }
  };

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
              {eventRating?.map((event, index) => (
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
                  <td>{event.all}</td>
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
