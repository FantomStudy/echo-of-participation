import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import { format } from "date-fns";
import { queryClient } from "@configs/queryClientConfig";
import { formatName } from "@utils/formatUtils";
import { useUsers } from "../hooks/queries/useUsers";
import { useEvents } from "../hooks/queries/useEvents";
import { useAddEvent } from "../hooks/mutations/useAddEvent";
import { useDeleteEvent } from "../hooks/mutations/useDeleteEvent";
import Modal from "@components/Modal/Modal";
import { useShowUI } from "@hooks/ui/useShowUI";
import Skeleton from "react-loading-skeleton";
import styles from "../styles/AdminProfilePage.module.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-loading-skeleton/dist/skeleton.css";

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
        { timeZone: "UTC" }
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
      <div className={styles.container}>
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
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <h1>Личный кабинет администратора</h1>

        <div className={styles.admins_tables}>
          <div className={styles.info_wrapper}>
            <h2>Информация о пользователе</h2>
            <div className={styles.tralalero}>
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
            <Link to="/admin/add-user" className={styles.add_event_btn}>
              Добавить пользователя
            </Link>
          </div>

          <div className={styles.event_table}>
            <div className={styles.create_event}>
              <h2>Мероприятия</h2>
              <button className={styles.add_event_btn} onClick={toggleShow}>
                Добавить мероприятие
              </button>
            </div>

            <Modal isShow={isShow} toggleClick={toggleShow}>
              <form
                className={styles.modal_content_wrapper}
                onSubmit={handleAddEvent}
              >
                <h2 className={styles.modal_title}>Добавление мероприятия</h2>

                <input
                  type="text"
                  className={styles.modal_input}
                  placeholder="Название мероприятия"
                  onChange={(e) => handleDataChange(e.target.value, "name")}
                />

                <DatePicker
                  placeholderText="Выберите дату"
                  selected={newEvent.date}
                  onChange={(date) => handleDataChange(date, "date")}
                  dateFormat="dd.MM.yyyy"
                  locale={ru}
                  className={styles.date_picker}
                  wrapperClassName={styles.date_picker_wrapper}
                  showPopperArrow={false}
                />
                <select
                  name="organizer"
                  id="organizer"
                  value={newEvent.organizerId}
                  className={styles.modal_select}
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
                <span style={{ color: "red" }}>
                  {localError ? localError : null}
                </span>
                <button
                  type="submit"
                  disabled={isAddingEvent}
                  className={styles.add_event_btn}
                >
                  {isAddingEvent ? "Добавляем.." : "Добавить мероприятие"}
                </button>
              </form>
            </Modal>

            {events.length > 0 ? (
              <ul className={styles.eventsList}>
                {events
                  .slice()
                  .reverse()
                  .map((event) => (
                    <li key={event.id} className={styles.eventItem}>
                      <span>{event.eventName}</span>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className={styles.deleteButton}
                      >
                        Удалить
                      </button>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>Мероприятия не найдены</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
