import styles from "@dashboard/styles/FilterSidebar.module.css";

const CourseSelect = ({ value, handleFilterChange }) => {
  return (
    <select
      disabled
      className={styles.select}
      value={value}
      onChange={(e) => {
        const value = e.target.value;
        handleFilterChange({
          filterType: "course",
          course: value,
          filterLabel: value ? `${value} курс` : "",
        });
      }}
    >
      <option value="">По курсу</option>

      {[1, 2, 3, 4].map((course) => (
        <option key={course} value={course}>
          {course} курс
        </option>
      ))}
    </select>
  );
};

export default CourseSelect;
