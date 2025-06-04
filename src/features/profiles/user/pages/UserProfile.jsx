import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";

import Loader from "@components/Loader/Loader";

import styles from "../../styles/Profile.module.css";
import { useUserById } from "../hooks/useUserById";

const UserProfile = () => {
  const { userId } = useParams();

  const { data, isLoading, error } = useUserById(userId);

  if (isLoading) {
    return <Loader />;
  }

  const formatDate = (date) => {
    let newDate = date.split("/");
    newDate[1].length == 1 ? (newDate[1] = `0${newDate[1]}`) : null;
    newDate[0].length == 1 ? (newDate[0] = `0${newDate[0]}`) : null;
    return `${newDate[1]}.${newDate[0]}.${newDate[2]}`;
  };

  return (
    <div className="container">
      <div className={styles.profileContainer}>
        <h1>Профиль сотрудника</h1>

        <div className={styles.profileWrapper}>
          <div className={styles.entityWrapper}>
            <h2>Информация о пользователе</h2>
            <div className={styles.entityInfo}>
              {data ? (
                <>
                  <div className={styles.blockInfo}>
                    <h3>ФИО</h3>
                    <p>{data?.fullName}</p>
                  </div>
                  <div className={styles.blockInfo}>
                    <h3>Роль</h3>
                    <p>{data?.roleName}</p>
                  </div>
                </>
              ) : (
                <Skeleton count={3} height={60} style={{ margin: "10px 0" }} />
              )}
            </div>
          </div>

          <div className={styles.tableBlock}>
            <div className={styles.tableBlockHeader}>
              <h2>Мероприятия</h2>
            </div>
            {data.event?.length > 0 ? (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <th>Название</th>
                    <th>Дата</th>
                    <th>Рейтинг</th>
                    <th>Количество участников</th>
                  </thead>
                  <tbody>
                    {data.event?.map((event) => (
                      <tr key={event.id}>
                        <td>{event.eventName}</td>
                        <td>{formatDate(event.eventDate)}</td>
                        <td>{event.total.toFixed(1)}</td>
                        <td>{event.participantsCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.notFound}>Мероприятия не найдены</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
