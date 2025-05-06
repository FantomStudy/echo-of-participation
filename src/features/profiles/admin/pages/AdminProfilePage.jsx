import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

import Modal from "@components/Modal/Modal";
import { queryClient } from "@configs/queryClientConfig";
import { useShowUI } from "@hooks/ui/useShowUI";
import { formatName } from "@utils/formatUtils";
import { format } from "date-fns";
import ru from "date-fns/locale/ru";

import styles from "../../styles/Profile.module.css";
import { useAddEvent } from "../hooks/mutations/useAddEvent";
import { useDeleteEvent } from "../hooks/mutations/useDeleteEvent";
import { useEvents } from "../hooks/queries/useEvents";
import { useUsers } from "../hooks/queries/useUsers";

export default function AdminProfilePage() {
  const currentUser = queryClient.getQueryData(["currentUser"]);

  const { deleteEvent } = useDeleteEvent();
  const { addEvent, isAddingEvent } = useAddEvent();

  const { events, error: eventsError, isLoading: eventsLoading } = useEvents();
  const { users, error: usersError, isLoading: usersLoading } = useUsers();

  const { isShow, toggleShow } = useShowUI();
  const [localError, setLocalError] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: null,
    organizerId: "",
  });

  const handleDataChange = (value, field) => {
    setNewEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      if (
        !newEvent.name.trim() ||
        !newEvent.date ||
        !newEvent.organizerId === ""
      ) {
        throw new Error("Заполните все поля");
      }
      const formattedDate = format(
        newEvent.date,
        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
        { timeZone: "UTC" },
      );

      addEvent({
        eventName: newEvent.name,
        eventDate: formattedDate,
        userId: parseInt(newEvent.organizerId),
        eventTypeId: null,
      });

      setNewEvent({ name: "", date: null, organizerId: "" });
      toggleShow();
    } catch (err) {
      console.error(err);
      setLocalError(err.message);
    }
  };

  if (eventsLoading || usersLoading) {
    return (
      <div className="container">
        <div className={styles.profileContainer}>
          <Skeleton height={40} width="50%" style={{ marginBottom: "20px" }} />
          <div className={styles.admins_tables}>
            <div className={styles.info_wrapper}>
              <Skeleton height={30} width="30%" />
              <div className={styles.tralalero}>
                <Skeleton count={3} height={60} style={{ margin: "10px 0" }} />
              </div>
              <Skeleton height={40} width={200} />
            </div>
            <div className={styles.event_table}>
              <div className={styles.create_event}>
                <Skeleton height={30} width="20%" />
                <Skeleton height={40} width={200} />
              </div>
              <Skeleton count={5} height={50} style={{ margin: "10px 0" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (eventsError || usersError) {
    return (
      <div className={styles.error}>
        Ошибка: {eventsError} {usersError}
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.profileContainer}>
        <h1>Личный кабинет администратора</h1>

        <div className={styles.profileWrapper}>
          <div className={styles.entityWrapper}>
            <h2>Информация о пользователе</h2>
            <div className={styles.entityInfo}>
              {currentUser ? (
                <>
                  <div className={styles.blockInfo}>
                    <h3>ФИО</h3>
                    <p>{currentUser?.fullName}</p>
                  </div>
                  <div className={styles.blockInfo}>
                    <h3>Логин</h3>
                    <p>{currentUser?.login}</p>
                  </div>
                  <div className={styles.blockInfo}>
                    <h3>Роль</h3>
                    <p>{currentUser?.roleName}</p>
                  </div>
                </>
              ) : (
                <Skeleton count={3} height={60} style={{ margin: "10px 0" }} />
              )}
            </div>
            <Link to="/admin/add-user" className={styles.button}>
              Добавить пользователя
            </Link>
          </div>

          <div className={styles.tableBlock}>
            <div className={styles.tableBlockHeader}>
              <h2>Мероприятия</h2>
              <button className={styles.button} onClick={toggleShow}>
                Добавить мероприятие
              </button>
            </div>

            <Modal isShow={isShow} toggleClick={toggleShow}>
              <form
                className={styles.modalContentWrapper}
                onSubmit={handleAddEvent}
              >
                <h2 className={styles.modalTitle}>Добавление мероприятия</h2>

                <input
                  type="text"
                  className={styles.modalInput}
                  placeholder="Название мероприятия"
                  onChange={(e) => handleDataChange(e.target.value, "name")}
                />

                <DatePicker
                  placeholderText="Выберите дату"
                  selected={newEvent.date}
                  onChange={(date) => handleDataChange(date, "date")}
                  dateFormat="dd.MM.yyyy"
                  locale={ru}
                  className={styles.datePicker}
                  wrapperClassName={styles.datePickerWrapper}
                  showPopperArrow={false}
                />
                <select
                  name="organizer"
                  id="organizer"
                  value={newEvent.organizerId}
                  className={styles.modalSelect}
                  onChange={(e) => {
                    handleDataChange(e.target.value, "organizerId");
                  }}
                >
                  <option value="" disabled hidden>
                    Руководитель
                  </option>
                  {users
                    ? users.map((organizer) => (
                        <option key={organizer.id} value={organizer.id}>
                          {formatName(organizer.fullName)}
                        </option>
                      ))
                    : null}
                </select>
                <span className={styles.error}>
                  {localError ? localError : null}
                </span>
                <button
                  type="submit"
                  disabled={isAddingEvent}
                  className={styles.button}
                >
                  {isAddingEvent ? "Добавляем.." : "Добавить мероприятие"}
                </button>
              </form>
            </Modal>

            {events.length > 0 ? (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <tbody>
                    {events
                      .slice()
                      .reverse()
                      .map((event) => (
                        <tr key={event.id}>
                          <td>{event.eventName}</td>
                          <td className={styles.buttonCell}>
                            <button
                              onClick={() => deleteEvent(event.id)}
                              className={`${styles.button} ${styles.delete}`}
                            >
                              Удалить
                            </button>
                          </td>
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
}
