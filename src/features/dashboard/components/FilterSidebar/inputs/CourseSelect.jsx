import styles from "@dashboard/styles/FilterSidebar.module.css";

const CourseSelect = ({ value, handleFilterChange }) => {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => {
        const value = e.target.value;
        handleFilterChange({
          filterType: "course",
          courseId: value,
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
