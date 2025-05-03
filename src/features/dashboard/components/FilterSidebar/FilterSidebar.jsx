import { useState } from "react";
import Sidebar from "@components/Sidebar/Sidebar";
import { useSidebar } from "@stores/sidebarStore";
import { useFilterStore } from "@stores/filterStore";
import TimeRange from "./inputs/TimeRange";
import GroupBox from "./inputs/GroupBox";
import DepartmentSelect from "./inputs/DepartmentSelect";
import CourseSelect from "./inputs/CourseSelect";
import styles from "../../styles/FilterSidebar.module.css";

const FilterSidebar = () => {
  const { filters, setFilters, resetFilters } = useFilterStore();
  const { toggle } = useSidebar("filters");

  const [error, setError] = useState(null);
  const [groupBox, setGroupBox] = useState("");
  const [filterState, setFilterState] = useState({
    filterType: "",
    depId: "",
    groupId: "",
    course: "",
    sort: "",
    customRange: "",
    filterLabel: "",
  });

  const resetFilterState = () => {
    setFilterState({
      filterType: "",
      depId: "",
      groupId: "",
      course: "",
      sort: "",
      customRange: "",
      filterLabel: "",
    });
    setGroupBox(null);
  };

  const handleFilterChange = ({
    filterType = "",
    course = "",
    depId = "",
    groupId = "",
    filterLabel = "",
  }) => {
    setFilterState((prev) => ({
      ...prev,
      filterType,
      course,
      depId,
      groupId,
      filterLabel,
    }));
    if (filterType !== "journal") {
      setGroupBox(null);
    }
  };

  const handleApplyFilters = () => {
    if (!filterState.filterType) {
      setError("Пожалуйста, выберите тип фильтра.");
      setTimeout(() => setError(null), 4000);
      return;
    }

    const id =
      filterState.filterType === "groupes"
        ? filterState.depId
        : filterState.filterType === "journal"
        ? filterState.groupId
        : null;

    setFilters({
      filterType: filterState.filterType,
      course: filterState.course,
      id,
      sort: filterState.sort,
      customRange: filterState.customRange,
      filterLabel: filterState.filterLabel,
    });

    toggle();
  };

  const handleResetFilters = () => {
    resetFilterState();
    resetFilters();
    toggle();
  };

  return (
    <Sidebar id="filters">
      <div className={styles.filter_wrapper}>
        <h3 className={styles.title}>Фильтры</h3>
        <div className={styles.select_group}>
          <button
            className={`${styles.button} ${styles.outline} ${
              filterState.filterType === "departments" ? styles.active : null
            }`}
            onClick={() => {
              handleFilterChange({
                filterType:
                  filterState.filterType === "departments" ? "" : "departments",
                filterLabel: "Список отделений",
              });
            }}
          >
            Список отделений
          </button>

          <CourseSelect
            value={filterState.course}
            handleFilterChange={handleFilterChange}
          />

          <DepartmentSelect
            value={filterState.depId}
            handleFilterChange={handleFilterChange}
          />

          <GroupBox
            selectedGroup={groupBox}
            setSelectedGroup={setGroupBox}
            handleFilterChange={handleFilterChange}
          />

          <TimeRange
            value={filterState.sort}
            filterType={filterState.filterType}
            setFilterState={setFilterState}
          />
          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.button_wrapper}>
          <button
            className={`${styles.button} ${styles.base}`}
            onClick={handleApplyFilters}
          >
            Применить
          </button>
          <button
            className={`${styles.button} ${styles.danger}`}
            onClick={handleResetFilters}
          >
            Сбросить
          </button>
        </div>
      </div>
    </Sidebar>
  );
};

export default FilterSidebar;
