import { useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useTableVirtualizer } from "@hooks/useTableVirtualizer";
import { useFilterStore } from "@stores/filterStore";
import { useSidebar } from "@stores/sidebarStore";

import { useTable } from "../../hooks/queries/useTable";
import styles from "../../styles/DashboardTable.module.css";
import { exportExcel } from "../../utils/exportUtils";
import { getFilterDisplay } from "../../utils/tableUtils";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";

export default function Table() {
  const filters = useFilterStore((state) => state.filters);
  const { toggle } = useSidebar("filters");

  const { events, entities, traffic, isLoading, error } = useTable();

  const tableContainer = useRef(null);

  const { virtualizer, vItems } = useTableVirtualizer({
    entities,
    container: tableContainer,
  });

  const { headTable, filterSort } = getFilterDisplay(filters);

  const isStudents = !filters.filterType || filters.filterType === "journal";

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className={styles.filterWrapper}>
        <div className={styles.nameSection}>
          <p>Выбранный фильтр</p>

          <p className={styles.filterBlock}>
            {filters.filterLabel || "Все студенты"}
          </p>
          {filterSort ? (
            <p className={styles.filterBlock}>По времени: {filterSort}</p>
          ) : null}
        </div>

        <div className={styles.buttonSection}>
          <button className={styles.button} onClick={toggle}>
            Фильтры
          </button>
          <button
            className={styles.button}
            onClick={() =>
              exportExcel({ entities, events, traffic, headTable })
            }
          >
            Экспорт в Excel
          </button>
        </div>
      </div>

      {isLoading ? (
        <Skeleton height="100%" borderRadius="0 0 15px 15px" />
      ) : (
        <div className={styles.tableContainer} ref={tableContainer}>
          <table
            className={styles.table}
            style={{
              height: `${virtualizer.getTotalSize() + 90}px`,
            }}
          >
            <TableHeader events={events} headTable={headTable} />
            <TableBody
              vItems={vItems}
              entities={entities}
              events={events}
              traffic={traffic}
              isStudents={isStudents}
            />
            <TableFooter events={events} traffic={traffic} />
          </table>
        </div>
      )}
      <FilterSidebar />
    </>
  );
}
