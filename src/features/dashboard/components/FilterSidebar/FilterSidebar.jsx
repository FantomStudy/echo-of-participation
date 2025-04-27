import { useState } from "react";
import Sidebar from "@components/Sidebar/Sidebar";
import { useGroups } from "../../hooks/queries/useGroups";
import { useDepartments } from "../../hooks/queries/useDepartments";
import styles from "../../styles/FilterSidebar.module.css";
import "react-datepicker/dist/react-datepicker.css";
import ComboBox from "@/shared/components/ComboBox/ComboBox";

const FilterSidebar = () => {
  const {
    departments,
    isLoading: departmentLoading,
    error: departmentError,
  } = useDepartments();

  const { groups, isLoading: groupLoading, error: groupError } = useGroups();

  if (groupLoading) {
    return null;
  }

  return (
    <>
      <Sidebar id="filters">
        <div className={styles.filter_wrapper}>
          <h3 className={styles.title}>Фильтры</h3>
          <div className={styles.select_group}>
            <button
              onClick={() => {}}
              className={`${styles.button} ${styles.outline}`}
            >
              Список отделений
            </button>

            <select className={styles.select}>
              <option value="">По курсу</option>

              {[1, 2, 3, 4].map((course) => (
                <option key={course} value={course}>
                  {course} курс
                </option>
              ))}
            </select>

            <select className={styles.select}>
              <option value="">Группы по отделению</option>

              {departmentLoading ? (
                <option value="" disabled>
                  Загрузка...
                </option>
              ) : departmentError ? (
                <option value="">Не удалось загрузить отделения</option>
              ) : (
                departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.departmentName}
                  </option>
                ))
              )}
            </select>

            <ComboBox
              placeholder="Студенты по группе"
              options={groups}
              getOptionValue={(group) => group.groupeName}
              renderOption={(group) => group.groupeName}
              error={"Не удалось загрузить ошибку"}
            />

            {/* {filterType === "studentsByGroup" &&
                groupSuggestions.length > 0 && (
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
                )} */}

            <div className={styles.time_range}>
              <select className={styles.select}>
                <option value="all">Все время</option>
                <option value="week">Неделя</option>
                <option value="month">Месяц</option>
                <option value="halfYear">Полгода</option>
                <option value="custom">Пользовательский</option>
              </select>
              {/* {sort === "custom" && (
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
              )} */}
            </div>
            {/* {error && <p className={styles.error}>{error}</p>} */}
          </div>
          <div className={styles.button_wrapper}>
            <button className={`${styles.button} ${styles.base}`}>
              Применить
            </button>
            <button className={`${styles.button} ${styles.danger}`}>
              Очистить
            </button>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default FilterSidebar;
