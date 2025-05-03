import { useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useSaveTraffic } from "../../hooks/mutations/useSaveTraffic";
import { useDashboardTable } from "../../hooks/queries/useDashboardTable";
import { getEventStats } from "../../utils/calculateUtils";
import { useEditTable } from "../../hooks/useEditTable";
import { exportExcel } from "../../utils/exportUtils";
import { formatName } from "@utils/formatUtils";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import { useSidebar } from "@stores/sidebarStore";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../styles/DashboardTable.module.css";
import { useFilterStore } from "@stores/filterStore";

export default function DashboardTable() {
  const { toggle } = useSidebar("filters");
  const filters = useFilterStore((state) => state.filters);

  const { save, isSaving } = useSaveTraffic();
  const { events, entities, traffic, isLoading, error } = useDashboardTable();

  const {
    localTraffic,
    currentCell,
    cellValue,
    cellClick,
    cellInputChange,
    handleInputBlurOrEnter,
  } = useEditTable({ traffic, events, mutateFn: save });

  const filterText = filters.filterLabel || "Все студенты";

  const tableContainer = useRef(null);

  const virtualizer = useVirtualizer({
    count: entities?.length,
    getScrollElement: () => tableContainer.current,
    estimateSize: () => 47,
  });
  const vItems = virtualizer.getVirtualItems();

  const headTable =
    !filters.filterType || filters.filterType === "journal"
      ? "ФИО"
      : filters.filterType === "departments"
      ? "Отделения"
      : filters.filterType === "groupes"
      ? "Группы"
      : null;

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className={styles.filter_wrapper}>
        <div className={styles.name_section}>
          <p>Выбранный фильтр</p>
          <div className={styles.block}>
            <p>{filterText}</p>
          </div>
        </div>
        <div className={styles.button_section}>
          <button className={styles.button} onClick={toggle}>
            Фильтры
          </button>
          <button
            className={styles.button}
            // onClick={() => exportExcel({ entities, events, traffic })}
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
            <thead>
              <tr key="header-row">
                <th>{headTable}</th>
                {events?.map((event) => (
                  <th
                    className={
                      event.name.includes("Промежуточная аттестация")
                        ? styles.highlightedHeader
                        : ""
                    }
                  >
                    <CustomTooltip title={event.name}>
                      {event.name}
                    </CustomTooltip>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {vItems.map((vItem) => {
                const entity = entities[vItem.index];
                return (
                  <tr
                    key={vItem.key}
                    style={{
                      height: `${vItem.size}px`,
                      transform: `translateY(${vItem.start}px)`,
                      position: "absolute",
                      width: "100%",
                    }}
                  >
                    <td
                      className={`${styles.studentNameCell} ${
                        filters.filterType === "" ? styles.clickable : ""
                      }`}
                      onClick={() => {}}
                    >
                      {!filters.filterType || filters.filterType === "journal"
                        ? formatName(entity.name)
                        : entity.name}
                    </td>
                    {events.map((event) => (
                      <td style={{ cursor: "pointer" }}>
                        {traffic[entity.id][event.key]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <th>Итого</th>
                {events.map((event) => (
                  <th>{getEventStats(event.key, traffic)}</th>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        //
        //             {events.map((event) => (
        //               <td
        //                 key={`attendance-${student.id}-${event.key}`}
        //                 onClick={() =>
        //                   cellClick(
        //                     student.id,
        //                     event.key,
        //                     localTraffic[student.id][event.key]
        //                   )
        //                 }
        //                 style={{
        //                   cursor: "pointer",
        //                 }}
        //                 className={
        //                   event.name.includes("Промежуточная аттестация")
        //                     ? styles.highlightedCell
        //                     : ""
        //                 }
        //               >
        //                 {currentCell?.studentId === student.id &&
        //                 currentCell?.eventKey === event.key ? (
        //                   <input
        //                     name="editable_cell"
        //                     type="text"
        //                     value={cellValue}
        //                     onChange={cellInputChange}
        //                     onBlur={(e) =>
        //                       handleInputBlurOrEnter(e, student.id, event.key)
        //                     }
        //                     onKeyDown={(e) =>
        //                       handleInputBlurOrEnter(e, student.id, event.key)
        //                     }
        //                     autoFocus
        //                     disabled={isSaving}
        //                     className={styles.attendanceInput}
        //                   />
        //                 ) : (
        //                   localTraffic[student.id][event.key]
        //                 )}
        //               </td>
        //             ))}
        //           </tr>
        //         );
        //       })}
        //     </tbody>

        //     <tfoot>
        //       <tr>
        //         <th>Итого</th>
        //         {events?.map((event) => (
        //           <th key={`event-footer-${event.key}`}>
        //             {getEventStats(event.key, localTraffic)}
        //           </th>
        //         ))}
        //       </tr>
        //     </tfoot>
        //   </table>
        // </div>
      )}
      <FilterSidebar />
    </>
  );
}
