import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Loader from "@components/Loader/Loader";
import { format, subMonths, subWeeks } from "date-fns";
import ru from "date-fns/locale/ru";

import { useStudent } from "../hooks/business/query/useStudent";
import styles from "../styles/StudentProfilePage.module.css";

const StudentProfilePage = () => {
  const { studentId } = useParams();
  const { data, isLoading } = useStudent(studentId);
  const location = useLocation();

  const [sort, setSort] = useState("all");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sortParam = queryParams.get("sort") || "all";
    const customSortParam = queryParams.get("customSort");
    setSort(sortParam);
    if (sortParam === "custom" && customSortParam) {
      const [startStr, endStr] = customSortParam.split("-");
      const start = parseDate(startStr);
      const end = parseDate(endStr);
      setDateRange([start, end]);
    }
  }, [location.search]);

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split(".");
    return new Date(`${year}-${month}-${day}`);
  };
  const removeDateFromEventName = (eventName) => {
    return eventName.replace(/\s*\d{2}\.\d{2}\.\d{4}$/, "").trim();
  };

  const filterEventsBySort = (events) => {
    const now = new Date();
    const filteredEvents = events.filter((event) => {
      const eventDate = parseDate(event.date);

      switch (sort) {
        case "week": {
          const oneWeekAgo = subWeeks(now, 1);
          return eventDate >= oneWeekAgo && eventDate <= now;
        }
        case "month": {
          const oneMonthAgo = subMonths(now, 1);
          return eventDate >= oneMonthAgo && eventDate <= now;
        }
        case "halfYear": {
          const sixMonthsAgo = subMonths(now, 6);
          return eventDate >= sixMonthsAgo && eventDate <= now;
        }
        case "custom": {
          if (!startDate || !endDate) return true;
          return eventDate >= startDate && eventDate <= endDate;
        }
        case "all":
        default:
          return true;
      }
    });

    return filteredEvents.sort((a, b) => parseDate(a.date) - parseDate(b.date));
  };

  const handleSortChange = (newSort) => {
    const queryParams = new URLSearchParams();
    queryParams.set("sort", newSort);

    if (newSort === "custom" && startDate && endDate) {
      const customSortValue = `${format(startDate, "dd.MM.yyyy")}-${format(
        endDate,
        "dd.MM.yyyy",
      )}`;
      queryParams.set("customSort", customSortValue);
    } else if (newSort !== "custom") {
      setDateRange([null, null]);
    }

    window.history.pushState(
      {},
      "",
      `${location.pathname}?${queryParams.toString()}`,
    );
    setSort(newSort);
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setDateRange([start, end]);

    if (sort === "custom" && start && end) {
      const queryParams = new URLSearchParams();
      queryParams.set("sort", "custom");
      const customSortValue = `${format(start, "dd.MM.yyyy")}-${format(
        end,
        "dd.MM.yyyy",
      )}`;
      queryParams.set("customSort", customSortValue);
      window.history.pushState(
        {},
        "",
        `${location.pathname}?${queryParams.toString()}`,
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <div className={styles.noData}>Данные студента не найдены</div>;
  }

  const filteredEvents = filterEventsBySort(data.events);

  return (
    <div className="container">
      <div className={styles.profileContainer}>
        <h1>Личный кабинет студента</h1>

        <div className={styles.profileWrapper}>
          <div className={styles.entityWrapper}>
            <h2>Информация о пользователе</h2>
            <div className={styles.entityInfo}>
              <div className={styles.blockInfo}>
                <h3>ФИО</h3>
                <p>{data?.fullName}</p>
              </div>
              <div className={styles.blockInfo}>
                <h3>Группа</h3>
                <p>{data?.groupeName}</p>
              </div>
              <div className={styles.blockInfo}>
                <h3>Отделение</h3>
                <p>{data?.departmentName}</p>
              </div>
              <div className={styles.blockInfo}>
                <h3>Курс</h3>
                <p>{data?.course}</p>
              </div>
              <div className={styles.blockInfo}>
                <h3>Пол</h3>
                <p>{data?.gender}</p>
              </div>
              <div className={styles.blockInfo}>
                <h3>Дата рождения</h3>
                <p>{data?.dateOfBIrth}</p>
              </div>
            </div>
          </div>

          <div className={styles.tableBlock}>
            <div className={styles.tableBlockHeader}>
              <h2>Мероприятия</h2>
              <div className={styles.filterContainer}>
                <label>
                  Период:
                  <select
                    value={sort}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className={styles.sortSelect}
                  >
                    <option value="all">Все</option>
                    <option value="week">Неделя</option>
                    <option value="month">Месяц</option>
                    <option value="halfYear">Полгода</option>
                    <option value="custom">Пользовательский</option>
                  </select>
                </label>
                {sort === "custom" && (
                  <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleDateRangeChange}
                    dateFormat="dd.MM.yyyy"
                    locale={ru}
                    placeholderText="Выберите диапазон дат"
                    className={styles.datePicker}
                    wrapperClassName={styles.datePickerWrapper}
                    showPopperArrow={false}
                  />
                )}
              </div>
            </div>

            <div className={styles.tableContainer}>
              {filteredEvents.length > 0 ? (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Мероприятие</th>
                      <th>Дата</th>
                      <th>Баллы</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event, index) => (
                      <tr key={`event-${index}`}>
                        <td className={styles.eventItem}>
                          {removeDateFromEventName(event.name)}
                        </td>
                        <td>{event.date}</td>
                        <td>{event.point}</td>
                      </tr>
                    ))}
                    <tr className={styles.totalRow}>
                      <td>
                        <strong>Итого</strong>
                      </td>
                      <td>
                        <strong>
                          {filteredEvents.reduce(
                            (sum, event) => sum + event.point,
                            0,
                          )}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>Мероприятия не найдены</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
