import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useSaveAttendance } from "../../hooks/mutations/useSaveAttendance";
import { useDashboardTable } from "../../hooks/queries/useDashboardTable";
import { getEventStats } from "../../utils/calculateUtils";
import { useEditTable } from "../../hooks/useEditTable";
import { exportExcel } from "../../utils/exportUtils";
import { formatName } from "@utils/formatUtils";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import styles from "../../styles/DashboardTable.module.css";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DashboardTable({ filterType }) {
  const { isShow, toggleShow } = useShowUI();
  const { save, isSaving } = useSaveAttendance();
  const { events, students, attendance, isLoading, error } =
    useDashboardTable();

  const {
    localAttendance,
    currentCell,
    cellValue,
    cellClick,
    cellInputChange,
    handleInputBlurOrEnter,
  } = useEditTable({ attendance, events, mutateFn: save });

  const tableContainer = useRef(null);

  const virtualizer = useVirtualizer({
    count: students?.length,
    getScrollElement: () => tableContainer.current,
    estimateSize: () => 47,
  });

  const vItems = virtualizer.getVirtualItems();

  // if (isLoading) {
  //   return <div>ЗАГРУЗКА</div>;
  // }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <>
        <div className={styles.filter_wrapper}>
          <div className={styles.name_section}>
            <p>Выбранный фильтр</p>
            <div className={styles.block}>
              <p>{"Все студенты"}</p>
            </div>
          </div>
          <div className={styles.button_section}>
            <button className={styles.filter_btn} onClick={() => {}}>
              Фильтры
            </button>
            <button
              className={styles.filter_btn}
              onClick={() => exportExcel({ students, events, attendance })}
              style={{ marginLeft: "10px" }}
            >
              Экспорт в Excel
            </button>
          </div>
        </div>
        {isLoading ? (
          <Skeleton height="100%" />
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
                  <th key="group-name">ФИО</th>
                  {events.map((event) => (
                    <th
                      key={`event-header-${event.key}`}
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
                  const student = students[vItem.index];

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
                        key={`student-name-${student.id}`}
                        //   onClick={() => handleStudentClick(student.id)}
                        className={`${styles.studentNameCell} ${
                          filterType === "students" ? styles.clickable : ""
                        }`}
                      >
                        {formatName(student.name)}
                      </td>
                      {events.map((event) => (
                        <td
                          key={`attendance-${student.id}-${event.key}`}
                          onClick={() =>
                            cellClick(
                              student.id,
                              event.key,
                              localAttendance[student.id][event.key]
                            )
                          }
                          style={{
                            cursor: "pointer",
                          }}
                          className={
                            event.name.includes("Промежуточная аттестация")
                              ? styles.highlightedCell
                              : ""
                          }
                        >
                          {currentCell?.studentId === student.id &&
                          currentCell?.eventKey === event.key ? (
                            <input
                              name="editable_cell"
                              type="text"
                              value={cellValue}
                              onChange={cellInputChange}
                              onBlur={(e) =>
                                handleInputBlurOrEnter(e, student.id, event.key)
                              }
                              onKeyDown={(e) =>
                                handleInputBlurOrEnter(e, student.id, event.key)
                              }
                              autoFocus
                              disabled={isSaving}
                              className={styles.attendanceInput}
                            />
                          ) : (
                            localAttendance[student.id][event.key]
                          )}
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
                    <th key={`event-footer-${event.key}`}>
                      {getEventStats(event.key, localAttendance)}
                    </th>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </>
    </>
  );
}
