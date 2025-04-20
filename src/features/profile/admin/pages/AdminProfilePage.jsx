import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import { format } from "date-fns";
import styles from "../styles/AdminProfilePage.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { queryClient } from "@configs/queryClientConfig";
import { useEvents } from "@hooks/business/queries/useEvents";
import { useShowUI } from "@/shared/hooks/ui/useShowUI";
import Modal from "@/shared/components/Modal/Modal";
import { useAddEvent } from "@/shared/hooks/business/mutations/useAddEvent";

export default function AdminProfilePage() {
  const userData = queryClient.getQueryData(["user"]);
  const { events, isLoading, error: loadEventError } = useEvents();
  const { mutate, isMutating } = useAddEvent();

  const { isShow, toggleShow } = useShowUI();
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
        throw new Error("Введите название и дату мероприятия");
      }
      const formattedDate = format(
        newEvent.date,
        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
        { timeZone: "UTC" }
      );

      const body = {
        eventName: newEvent.name,
        eventDate: formattedDate,
        userId: parseInt(newEvent.organizerId),
        eventTypeId: null,
      };

      mutate(body);

      setNewEvent({ name: "", date: null, organizerId: "" });
      toggleShow();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEvent = async (id) => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    try {
      const response = await fetch(`http://localhost:3000/event/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении мероприятия");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (loadEventError) {
    return <div className={styles.error}>Ошибка: {loadEventError}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <h1>Личный кабинет администратора</h1>

        <div className={styles.admins_tables}>
          <div className={styles.info_wrapper}>
            <h2>Информация о пользователе</h2>
            <div className={styles.tralalero}>
              {userData ? (
                <>
                  <div className={styles.blockInfo}>
                    <h3>ФИО</h3>
                    <p>{userData?.fullName}</p>
                  </div>
                  <div className={styles.blockInfo}>
                    <h3>Логин</h3>
                    <p>{userData?.login}</p>
                  </div>
                  <div className={styles.blockInfo}>
                    <h3>Роль</h3>
                    <p>{userData?.roleName}</p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className={styles.event_table}>
            <div className={styles.create_event}>
              <h2>Мероприятия</h2>
              <button
                className={styles.add_event_btn}
                onClick={toggleShow}
                disabled={isMutating}
              >
                Добавить мероприятие
              </button>
            </div>

            <Modal show={isShow} toggleClick={toggleShow}>
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
                  <option value="">Руководитель</option>
                  <option value="1">Опция 1</option>
                  <option value="1">Опция 2</option>
                </select>
                <button type="submit" className={styles.add_event_btn}>
                  {isMutating ? "Добавляем.." : "Добавить мероприятие"}
                </button>
              </form>
            </Modal>

            {/* </form> */}
            {events.length > 0 ? (
              <ul className={styles.eventsList}>
                {events.map((event) => (
                  <li key={event.id} className={styles.eventItem}>
                    <span>{event.eventName}</span>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
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
        {/* <div className={styles.actionsSection}>
          <Link to="/admin/add-user" className={styles.addUserLink}>
            Добавить пользователя
          </Link>
          <button onClick={() => {}} className={styles.logoutButton}>
            Выйти
          </button>
        </div> */}
      </div>
    </div>
  );
}
