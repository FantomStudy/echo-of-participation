import { useCallback, useEffect } from "react";
import { useEventRatingStore } from "@shared/stores/eventRatingStore";
import styles from "../../../styles/MainTablePage.module.css";
import { getMaxRateByRole } from "../../../utils/mainTableUtils";

const EventRatingTable = () => {
  // const {
  //   eventRatings,
  //   error,
  //   isLoading,
  //   fetchEventRatings,
  //   updateLocalRating,
  //   saveEventRating,
  // } = useEventRatingStore();
  // const { user } = useAuthStore();

  // useEffect(() => {
  //   fetchEventRatings(user.id);
  // }, [user, fetchEventRatings]);

  // const handleChangeRating = useCallback(
  //   (eventId, value) => updateLocalRating(eventId, value),
  //   [updateLocalRating]
  // );

  // const handleSaveRating = useCallback(
  //   (eventId, value) => saveEventRating(eventId, value, user),
  //   [saveEventRating, user]
  // );

  // if (isLoading) {
  //   return <div className={styles.loading}>Загрузка...</div>;
  // }

  return (
    // <div className={styles.ratingTableContainer}>
    //   {error && (
    //     <div style={{ color: "red", marginBottom: "10px" }}>
    //       Ошибка: {error}
    //     </div>
    //   )}
    //   <table className={styles.eventTable}>
    //     <thead>
    //       <tr>
    //         <th>Название мероприятия</th>
    //         <th>Ваша оценка</th>
    //         <th>Общая оценка</th>
    //         <th>Количество голосов</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {eventRatings.map((event) => (
    //         <tr key={`rating-${event.eventId}`}>
    //           <td>{event.eventName}</td>
    //           <td>
    //             <input
    //               type="text"
    //               id={`event-rating-input-${event.eventId}`}
    //               value={event.rating !== null ? event.rating : ""}
    //               onChange={(e) =>
    //                 handleChangeRating(event.eventId, e.target.value)
    //               }
    //               onBlur={(e) =>
    //                 handleSaveRating(event.eventId, e.target.value)
    //               }
    //               className={styles.attendanceInput}
    //               placeholder={`0-${getMaxRateByRole(user.roleName)}`}
    //             />
    //           </td>
    //           <td>{event.all}</td>
    //           <td>{event.count}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div>Events</div>
  );
};

export default EventRatingTable;
