import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./FilterSidebar.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import ru from "date-fns/locale/ru";

const FilterSidebar = ({ onFilterApply, onClose }) => {
  const [filterType, setFilterType] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [sort, setSort] = useState("all");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [groupSuggestions, setGroupSuggestions] = useState([]);
  const [groups, setGroups] = useState([]);

  const departments = [
    { id: 1, departmentName: "Отделение креативных индустрий" },
    { id: 2, departmentName: "Отделение программирования" },
    { id: 3, departmentName: "Отделение экономики" },
    { id: 4, departmentName: "Отделение ИТ и БПЛА" },
  ];

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/groupe/all`);
        setGroups(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке списка групп:", error);
      }
    };
    fetchGroups();
  }, []);

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setInputValue("");
    setError("");
    setGroupSuggestions([]);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (filterType === "studentsByGroup" && value) {
      const filteredGroups = groups.filter((group) =>
        group.groupeName.toLowerCase().startsWith(value.toLowerCase())
      );
      setGroupSuggestions(filteredGroups);
    } else {
      setGroupSuggestions([]);
    }
  };

  const handleSuggestionClick = (groupName) => {
    setInputValue(groupName);
    setGroupSuggestions([]);
  };

  const handleCourseSelect = (courseId) => {
    setInputValue(courseId);
  };

  const handleDepartmentSelect = (deptId) => {
    setInputValue(deptId);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
    if (value !== "custom") {
      setDateRange([null, null]);
    }
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setDateRange([start, end]);
  };

  const handleApplyFilter = async () => {
    if (!filterType) {
      setError("Пожалуйста, выберите тип фильтра.");
      return;
    }

    if (!inputValue && filterType !== "department") {
      setError("Пожалуйста, выберите или введите значение для фильтрации.");
      return;
    }

    if (sort === "custom" && (!startDate || !endDate)) {
      setError(
        "Пожалуйста, выберите начальную и конечную даты для пользовательского диапазона."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      let url = "";
      let type = "";
      let filterValue = inputValue;
      const queryParams = new URLSearchParams();
      queryParams.append("sort", sort);

      if (sort === "custom" && startDate && endDate) {
        const customSortValue = `${format(startDate, "dd.MM.yyyy")}-${format(
          endDate,
          "dd.MM.yyyy"
        )}`;
        queryParams.append("customSort", customSortValue);
      }

      switch (filterType) {
        case "department":
          url = `http://localhost:3000/department/all?${queryParams.toString()}`;
          type = "departments";
          onFilterApply({
            data: await axios.get(url).then((res) => res.data),
            type,
            sort,
            customSort:
              sort === "custom" && startDate && endDate
                ? `${format(startDate, "dd.MM.yyyy")}-${format(
                    endDate,
                    "dd.MM.yyyy"
                  )}`
                : null,
          });
          break;
        case "course":
          url = `http://localhost:3000/groupe/allCourse/${filterValue}?${queryParams.toString()}`;
          type = "groups";
          onFilterApply({
            data: await axios.get(url).then((res) => res.data),
            type,
            course: filterValue,
            sort,
            customSort:
              sort === "custom" && startDate && endDate
                ? `${format(startDate, "dd.MM.yyyy")}-${format(
                    endDate,
                    "dd.MM.yyyy"
                  )}`
                : null,
          });
          break;
        case "groupByDepartment":
          url = `http://localhost:3000/groupe/all/${filterValue}?${queryParams.toString()}`;
          type = "groups";
          const selectedDepartment = departments.find(
            (dept) => String(dept.id) === filterValue
          );
          onFilterApply({
            data: await axios.get(url).then((res) => res.data),
            type,
            departmentName:
              selectedDepartment?.departmentName || "Неизвестное отделение",
            sort,
            customSort:
              sort === "custom" && startDate && endDate
                ? `${format(startDate, "dd.MM.yyyy")}-${format(
                    endDate,
                    "dd.MM.yyyy"
                  )}`
                : null,
          });
          break;
        case "studentsByGroup": {
          const group = groups.find(
            (g) => g.groupeName.toLowerCase() === inputValue.toLowerCase()
          );
          if (!group) {
            throw new Error("Группа с таким названием не найдена.");
          }
          url = `http://localhost:3000/event-journal/${
            group.id
          }?${queryParams.toString()}`;
          type = "students";
          onFilterApply({
            data: await axios.get(url).then((res) => res.data),
            type,
            groupName: group.groupeName,
            sort,
            customSort:
              sort === "custom" && startDate && endDate
                ? `${format(startDate, "dd.MM.yyyy")}-${format(
                    endDate,
                    "dd.MM.yyyy"
                  )}`
                : null,
          });
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      setError(
        error.message === "Группа с таким названием не найдена."
          ? error.message
          : "Ошибка при загрузке данных. Пожалуйста, попробуйте снова."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = async () => {
    setLoading(true);
    setError("");

    try {
      const url = "http://localhost:3000/event-journal/allStudents";
      const response = await axios.get(url);

      onFilterApply({
        data: response.data,
        type: "students",
        sort: "all",
        customSort: null,
      });

      // Сбрасываем все состояния
      setFilterType(null);
      setInputValue("");
      setSort("all");
      setDateRange([null, null]);
      setGroupSuggestions([]);
    } catch (error) {
      console.error("Ошибка при сбросе фильтров:", error);
      setError(
        "Ошибка при загрузке списка студентов. Пожалуйста, попробуйте снова."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.filterSidebar}>
      <h3 className={styles.title}>Фильтры</h3>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="department"
            checked={filterType === "department"}
            onChange={handleFilterTypeChange}
            className={styles.radioInput}
          />
          Список отделений
        </label>

        <div className={styles.filterOption}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="course"
              checked={filterType === "course"}
              onChange={handleFilterTypeChange}
              className={styles.radioInput}
            />
            По курсу
          </label>
          {filterType === "course" && (
            <div className={styles.subOptions}>
              {[1, 2, 3, 4].map((course) => (
                <label key={course} className={styles.subRadioLabel}>
                  <input
                    type="radio"
                    value={course}
                    checked={inputValue === String(course)}
                    onChange={() => handleCourseSelect(String(course))}
                    className={styles.subRadioInput}
                    disabled={loading}
                  />
                  Курс {course}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className={styles.filterOption}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="groupByDepartment"
              checked={filterType === "groupByDepartment"}
              onChange={handleFilterTypeChange}
              className={styles.radioInput}
            />
            Группы по отделению
          </label>
          {filterType === "groupByDepartment" && (
            <div className={styles.subOptions}>
              {departments.map((dept) => (
                <label key={dept.id} className={styles.subRadioLabel}>
                  <input
                    type="radio"
                    value={dept.id}
                    checked={inputValue === String(dept.id)}
                    onChange={() => handleDepartmentSelect(String(dept.id))}
                    className={styles.subRadioInput}
                    disabled={loading}
                  />
                  {dept.departmentName}
                </label>
              ))}
            </div>
          )}
        </div>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="studentsByGroup"
            checked={filterType === "studentsByGroup"}
            onChange={handleFilterTypeChange}
            className={styles.radioInput}
          />
          Студенты по группе
        </label>
      </div>

      <div className={styles.inputGroup}>
        {filterType === "studentsByGroup" && (
          <div className={styles.autocomplete}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Введите название группы"
              className={styles.textInput}
            />
            {groupSuggestions.length > 0 && (
              <ul className={styles.suggestionsList}>
                {groupSuggestions.map((group) => (
                  <li
                    key={group.id}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(group.groupeName)}
                  >
                    {group.groupeName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className={styles.timeRangeGroup}>
          <label className={styles.timeRangeLabel}>
            Сортировка по времени:
          </label>
          <select
            value={sort}
            onChange={handleSortChange}
            className={styles.timeRangeSelect}
            disabled={loading}
          >
            <option value="all">Все время</option>
            <option value="week">Неделя</option>
            <option value="month">Месяц</option>
            <option value="halfYear">Полгода</option>
            <option value="custom">Пользовательский</option>
          </select>
          {sort === "custom" && (
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateRangeChange}
              dateFormat="dd.MM.yyyy"
              locale={ru}
              placeholderText="Выберите диапазон дат"
              className={styles.customRangeInput}
              showPopperArrow={false}
              disabled={loading}
            />
          )}
        </div>

        <button
          onClick={handleApplyFilter}
          disabled={loading}
          className={styles.applyButton}
        >
          {loading ? "Загрузка..." : "Применить фильтр"}
        </button>

        <button
          onClick={handleResetFilters}
          disabled={loading}
          className={styles.resetButton}
        >
          {loading ? "Загрузка..." : "Сбросить фильтры"}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FilterSidebar;
