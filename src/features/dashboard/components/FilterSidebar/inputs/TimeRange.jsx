import { useState } from "react";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import styles from "@dashboard/styles/FilterSidebar.module.css";
import "react-datepicker/dist/react-datepicker.css";

const TimeRange = ({ value, filterType, setFilterState }) => {
  const [error, setError] = useState("");
  const [range, setRange] = useState({
    start: null,
    end: null,
  });

  const dateRangeRegex = /^\d{2}\.\d{2}\.\d{4}-\d{2}\.\d{2}\.\d{4}$/;

  const formatDate = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date)) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const validateDateRange = (start, end) => {
    if (!start || !end) {
      return "Выберите обе даты";
    }
    if (
      !(start instanceof Date) ||
      !(end instanceof Date) ||
      isNaN(start) ||
      isNaN(end)
    ) {
      return "Некорректный формат даты";
    }
    if (start > end) {
      return "Дата начала не может быть позже даты окончания";
    }
    if (formatDate(start) == formatDate(end)) {
      return "Выберите разные даты";
    }
    const formattedRange = `${formatDate(start)}-${formatDate(end)}`;
    if (!dateRangeRegex.test(formattedRange)) {
      return "Формат должен быть DD.MM.YYYY-DD.MM.YYYY";
    }
    return "";
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setRange({ start, end });

    const validationError = validateDateRange(start, end);
    setError(validationError);

    if (!validationError) {
      const formattedRange = `${formatDate(start)}-${formatDate(end)}`;
      setFilterState((prev) => ({ ...prev, customRange: formattedRange }));
    } else {
      setFilterState((prev) => ({ ...prev, customRange: "" }));
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setFilterState((prev) => ({ ...prev, sort: value }));
    if (value !== "custom") {
      setFilterState((prev) => ({ ...prev, customRange: null }));
    }
  };

  return (
    <div className={styles.time_range}>
      <select
        disabled={!filterType}
        className={styles.select}
        value={value}
        onChange={handleSortChange}
      >
        <option value="all">Все время</option>
        <option value="week">Неделя</option>
        <option value="month">Месяц</option>
        <option value="halfYear">Полугодие</option>
        <option value="custom">Пользовательский</option>
      </select>

      {value === "custom" && (
        <>
          <DatePicker
            selectsRange
            startDate={range.start}
            endDate={range.end}
            onChange={handleDateRangeChange}
            dateFormat="dd.MM.yyyy"
            locale={ru}
            placeholderText="Выберите диапазон"
            className={styles.input}
            showPopperArrow={false}
          />
          {error && <p className={styles.error}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default TimeRange;
