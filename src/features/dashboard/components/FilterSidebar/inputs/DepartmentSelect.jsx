import { useDepartments } from "@dashboard/hooks/queries/useDepartments";
import styles from "@dashboard/styles/FilterSidebar.module.css";

const DepartmentSelect = ({ value, handleFilterChange }) => {
  const departments = useDepartments();

  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => {
        const value = e.target.value;

        const selectedDepartment = departments.data.find(
          (dep) => dep.id == value
        );

        handleFilterChange({
          filterType: value ? "groupes" : "",
          depId: value,
          filterLabel: selectedDepartment?.departmentName || "",
        });
      }}
    >
      <option value="">Группы по отделению</option>

      {departments.isLoading ? (
        <option value="" disabled>
          Загрузка...
        </option>
      ) : departments.error ? (
        <option value="">Не удалось загрузить отделения</option>
      ) : (
        departments.data.map((department) => (
          <option key={department.id} value={department.id}>
            {department.departmentName}
          </option>
        ))
      )}
    </select>
  );
};

export default DepartmentSelect;
