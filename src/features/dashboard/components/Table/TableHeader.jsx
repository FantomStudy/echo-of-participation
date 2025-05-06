import styles from "../../styles/DashboardTable.module.css";
import CustomTooltip from "./CustomTooltip";

const TableHeader = ({ headTable, events }) => {
  return (
    <thead>
      <tr>
        <th>{headTable}</th>
        {events.map((event) => (
          <th
            key={`header-event-${event.key}`}
            className={
              event.name.includes("Промежуточная аттестация")
                ? styles.highlightedHeader
                : ""
            }
          >
            <CustomTooltip title={event.name}>{event.name}</CustomTooltip>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
