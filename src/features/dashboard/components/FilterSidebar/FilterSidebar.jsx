import { useState } from "react";
import styles from "../../styles/FilterSidebar.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

  // useEffect(() => {
  //   const savedFilters = localStorage.getItem("filters");
  //   if (savedFilters) {
  //     const { filterType, inputValue, sort, dateRange } =
  //       JSON.parse(savedFilters);
  //     setFilterType(filterType || null);
  //     setInputValue(inputValue || "");
  //     setSort(sort || "all");
  //     setDateRange([
  //       dateRange[0] ? new Date(dateRange[0]) : null,
  //       dateRange[1] ? new Date(dateRange[1]) : null,
  //     ]);
  //   }
  // }, []);

  // useEffect(() => {
  //   const filters = {
  //     filterType,
  //     inputValue,
  //     sort,
  //     dateRange: [
  //       dateRange[0]?.toISOString() || null,
  //       dateRange[1]?.toISOString() || null,
  //     ],
  //   };
  //   localStorage.setItem("filters", JSON.stringify(filters));
  // }, [filterType, inputValue, sort, dateRange]);

  // useEffect(() => {
  //   const fetchGroups = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/groupe/all`);
  //       setGroups(response.data);
  //     } catch (error) {
  //       console.error("Ошибка при загрузке списка групп:", error);
  //     }
  //   };
  //   fetchGroups();
  // }, []);

  // useEffect(() => {
  //   const savedFilters = localStorage.getItem("filters");
  //   if (savedFilters && filterType) {
  //     handleApplyFilter(true);
  //   }
  // }, [groups]);

  // const handleFilterTypeChange = (e) => {
  //   setFilterType(e.target.value);
  //   setInputValue("");
  //   setError("");
  //   setGroupSuggestions([]);
  // };

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setInputValue(value);

  //   if (filterType === "studentsByGroup" && value) {
  //     const filteredGroups = groups.filter((group) =>
  //       group.groupeName.toLowerCase().startsWith(value.toLowerCase())
  //     );
  //     setGroupSuggestions(filteredGroups);
  //   } else {
  //     setGroupSuggestions([]);
  //   }
  // };

  // const handleSuggestionClick = (groupName) => {
  //   setInputValue(groupName);
  //   setGroupSuggestions([]);
  // };

  // const handleCourseSelect = (courseId) => {
  //   setInputValue(courseId);
  // };

  // const handleDepartmentSelect = (deptId) => {
  //   setInputValue(deptId);
  // };

  // const handleSortChange = (e) => {
  //   const value = e.target.value;
  //   setSort(value);
  //   if (value !== "custom") {
  //     setDateRange([null, null]);
  //   }
  // };

  // const handleDateRangeChange = (dates) => {
  //   const [start, end] = dates;
  //   setDateRange([start, end]);
  // };

  // const handleApplyFilter = async (isInitialLoad = false) => {
  //   if (!filterType) {
  //     setError("Пожалуйста, выберите тип фильтра.");
  //     return;
  //   }

  //   if (!inputValue && filterType !== "department") {
  //     setError("Пожалуйста, выберите или введите значение для фильтрации.");
  //     return;
  //   }

  //   if (sort === "custom" && (!startDate || !endDate)) {
  //     setError(
  //       "Пожалуйста, выберите начальную и конечную даты для пользовательского диапазона."
  //     );
  //     return;
  //   }

  //   if (!isInitialLoad) {
  //     setLoading(true);
  //   }
  //   setError("");

  //   try {
  //     let url = "";
  //     let type = "";
  //     let filterValue = inputValue;
  //     const queryParams = new URLSearchParams();
  //     queryParams.append("sort", sort);

  //     if (sort === "custom" && startDate && endDate) {
  //       const customSortValue = `${format(startDate, "dd.MM.yyyy")}-${format(
  //         endDate,
  //         "dd.MM.yyyy"
  //       )}`;
  //       queryParams.append("customSort", customSortValue);
  //     }

  //     switch (filterType) {
  //       case "department":
  //         url = `http://localhost:3000/department/all?${queryParams.toString()}`;
  //         type = "departments";
  //         onFilterApply({
  //           data: await axios.get(url).then((res) => res.data),
  //           type,
  //           sort,
  //           customSort:
  //             sort === "custom" && startDate && endDate
  //               ? `${format(startDate, "dd.MM.yyyy")}-${format(
  //                   endDate,
  //                   "dd.MM.yyyy"
  //                 )}`
  //               : null,
  //         });
  //         break;
  //       case "course":
  //         url = `http://localhost:3000/groupe/allCourse/${filterValue}?${queryParams.toString()}`;
  //         type = "groups";
  //         onFilterApply({
  //           data: await axios.get(url).then((res) => res.data),
  //           type,
  //           course: filterValue,
  //           sort,
  //           customSort:
  //             sort === "custom" && startDate && endDate
  //               ? `${format(startDate, "dd.MM.yyyy")}-${format(
  //                   endDate,
  //                   "dd.MM.yyyy"
  //                 )}`
  //               : null,
  //         });
  //         break;
  //       case "groupByDepartment":
  //         url = `http://localhost:3000/groupe/all/${filterValue}?${queryParams.toString()}`;
  //         type = "groups";
  //         const selectedDepartment = departments.find(
  //           (dept) => String(dept.id) === filterValue
  //         );
  //         onFilterApply({
  //           data: await axios.get(url).then((res) => res.data),
  //           type,
  //           departmentName:
  //             selectedDepartment?.departmentName || "Неизвестное отделение",
  //           sort,
  //           customSort:
  //             sort === "custom" && startDate && endDate
  //               ? `${format(startDate, "dd.MM.yyyy")}-${format(
  //                   endDate,
  //                   "dd.MM.yyyy"
  //                 )}`
  //               : null,
  //         });
  //         break;
  //       case "studentsByGroup": {
  //         const group = groups.find(
  //           (g) => g.groupeName.toLowerCase() === inputValue.toLowerCase()
  //         );
  //         if (!group) {
  //           throw new Error("Группа с таким названием не найдена.");
  //         }
  //         url = `http://localhost:3000/event-journal/${
  //           group.id
  //         }?${queryParams.toString()}`;
  //         type = "students";
  //         onFilterApply({
  //           data: await axios.get(url).then((res) => res.data),
  //           type,
  //           groupName: group.groupeName,
  //           sort,
  //           customSort:
  //             sort === "custom" && startDate && endDate
  //               ? `${format(startDate, "dd.MM.yyyy")}-${format(
  //                   endDate,
  //                   "dd.MM.yyyy"
  //                 )}`
  //               : null,
  //         });
  //         break;
  //       }
  //       default:
  //         break;
  //     }
  //   } catch (error) {
  //     console.error("Ошибка при загрузке данных:", error);
  //     setError(
  //       error.message === "Группа с таким названием не найдена."
  //         ? error.message
  //         : "Ошибка при загрузке данных. Пожалуйста, попробуйте снова."
  //     );
  //   } finally {
  //     if (!isInitialLoad) {
  //       setLoading(false);
  //     }
  //   }
  // };

  // const handleResetFilters = async () => {
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const url = "http://localhost:3000/event-journal/allStudents";
  //     const response = await axios.get(url, {
  //       withCredentials: true,
  //     });

  //     onFilterApply({
  //       data: response.data,
  //       type: "clear",
  //       sort: "all",
  //       customSort: null,
  //     });

  //     setFilterType(null);
  //     setInputValue("");
  //     setSort("all");
  //     setDateRange([null, null]);
  //     setGroupSuggestions([]);

  //     localStorage.removeItem("filters");
  //   } catch (error) {
  //     console.error("Ошибка при сбросе фильтров:", error);
  //     setError(
  //       error.response?.data?.message ||
  //         "Ошибка при загрузке списка студентов. Пожалуйста, попробуйте снова."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className={styles.filterSidebar}>
      <h3 className={styles.title}>Фильтры</h3>
      <div className={styles.selectGroup}>
        <button
          onClick={() => {}}
          className={`${styles.departmentButton} ${
            filterType === "department" ? styles.active : ""
          }`}
          disabled={loading}
        >
          Список отделений
        </button>

        <select
          value={filterType === "course" ? inputValue : ""}
          onChange={(e) => {
            // setFilterType("course");
            // handleCourseSelect(e.target.value);
          }}
          className={styles.selectInput}
          disabled={loading}
        >
          <option value="" disabled>
            По курсу
          </option>
          {[1, 2, 3, 4].map((course) => (
            <option key={course} value={course}>
              Курс {course}
            </option>
          ))}
        </select>

        <select
          value={filterType === "groupByDepartment" ? inputValue : ""}
          onChange={(e) => {
            // setFilterType("groupByDepartment");
            // handleDepartmentSelect(e.target.value);
          }}
          className={styles.selectInput}
          disabled={loading}
        >
          <option value="" disabled>
            Группы по отделению
          </option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.departmentName}
            </option>
          ))}
        </select>

        <div className={styles.autocomplete}>
          <input
            type="text"
            value={filterType === "studentsByGroup" ? inputValue : ""}
            onChange={(e) => {
              // setFilterType("studentsByGroup");
              // handleInputChange(e);
            }}
            placeholder="Студенты по группе"
            className={styles.textInput}
            disabled={loading}
          />
          {filterType === "studentsByGroup" && groupSuggestions.length > 0 && (
            <ul className={styles.suggestionsList}>
              {groupSuggestions.map((group) => (
                <li
                  key={group.id}
                  className={styles.suggestionItem}
                  // onClick={() => handleSuggestionClick(group.groupeName)}
                >
                  {group.groupeName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.timeRangeGroup}>
          <select
            value={sort}
            // onChange={handleSortChange}
            className={styles.selectInput}
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
              // onChange={handleDateRangeChange}
              dateFormat="dd.MM.yyyy"
              locale={ru}
              placeholderText="Выберите диапазон дат"
              className={styles.selectInput}
              showPopperArrow={false}
              disabled={loading}
            />
          )}
        </div>
      </div>

      <button
        // onClick={() => handleApplyFilter(false)}
        disabled={loading}
        className={styles.applyButton}
      >
        {loading ? "Загрузка..." : "Применить"}
      </button>

      <button
        // onClick={handleResetFilters}
        disabled={loading}
        className={styles.resetButton}
      >
        {loading ? <Loading /> : "Очистить"}
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FilterSidebar;
