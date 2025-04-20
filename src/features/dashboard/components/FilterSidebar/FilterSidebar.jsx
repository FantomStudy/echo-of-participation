import styles from "../../styles/FilterSidebar.module.css";

export default function FilterSidebar() {
  return (
    <div className={styles.filterSidebar}>
      <h3 className={styles.title}>Фильтры</h3>
      <div className={styles.selectGroup}>
        <button
          onClick={() =>
            handleFilterTypeChange({ target: { value: "department" } })
          }
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
            setFilterType("course");
            handleCourseSelect(e.target.value);
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
            setFilterType("groupByDepartment");
            handleDepartmentSelect(e.target.value);
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
              setFilterType("studentsByGroup");
              handleInputChange(e);
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
                  onClick={() => handleSuggestionClick(group.groupeName)}
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
            onChange={handleSortChange}
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
              onChange={handleDateRangeChange}
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
        onClick={() => handleApplyFilter(false)}
        disabled={loading}
        className={styles.applyButton}
      >
        {loading ? "Загрузка..." : "Применить"}
      </button>

      <button
        onClick={handleResetFilters}
        disabled={loading}
        className={styles.resetButton}
      >
        {loading ? <Loading /> : "Очистить"}
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
