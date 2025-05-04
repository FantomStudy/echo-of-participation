import { useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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

  const tableContainer = useRef(null);
  const virtualizer = useVirtualizer({
    count: entities?.length,
    getScrollElement: () => tableContainer.current,
    estimateSize: () => 47,
  });
  const vItems = virtualizer.getVirtualItems();

  const filterText = filters.filterLabel || "Все студенты";

  const isStudents = !filters.filterType || filters.filterType === "journal";
  const isDepartments = filters.filterType === "departments";
  const isGroups = ["groupes", "course"].includes(filters.filterType);

  const headTable = isStudents
    ? "ФИО"
    : isDepartments
    ? "Отделения"
    : isGroups
    ? "Группы"
    : null;

  const filterSort =
    filters.sort === "week"
      ? "Неделя"
      : filters.sort === "month"
      ? "Месяц"
      : filters.sort === "halfYear"
      ? "Полугодие"
      : filters.sort === "custom"
      ? filters.customRange
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
          {filterSort ? (
            <div className={styles.block}>
              <p>По времени: {filterSort}</p>
            </div>
          ) : null}
        </div>
        <div className={styles.button_section}>
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
            <thead>
              <tr key="header-row">
                <th key="header-name">{headTable}</th>
                {events?.map((event) => (
                  <th
                    key={`header-event-${event.key}`}
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
                    {isStudents ? (
                      <td
                        onClick={() => {
                          navigate(`/student/profile/${entity.id}`);
                        }}
                        key={`body-${entity.id}`}
                        className={styles.clickable_block}
                      >
                        {formatName(entity.name)}
                      </td>
                    ) : (
                      <td key={`body-${entity.id}`}>{entity.name}</td>
                    )}

                    {events.map((event) => (
                      <td
                        style={{ cursor: isStudents ? "pointer" : "default" }}
                        key={`body-traffic-${entity.id}-${event.key}`}
                        onClick={
                          isStudents
                            ? () => {
                                cellClick(
                                  entity.id,
                                  event.key,
                                  localTraffic[entity.id]?.[event.key]
                                );
                              }
                            : null
                        }
                      >
                        {isStudents &&
                        currentCell?.id === entity.id &&
                        currentCell?.eventKey === event.key ? (
                          <input
                            name="editable_cell"
                            type="text"
                            value={cellValue}
                            onChange={cellInputChange}
                            onBlur={(e) =>
                              handleInputBlurOrEnter(e, entity.id, event.key)
                            }
                            onKeyDown={(e) =>
                              handleInputBlurOrEnter(e, entity.id, event.key)
                            }
                            autoFocus
                            disabled={isSaving}
                            className={styles.trafficInput}
                            aria-label={`Редактировать посещаемость для ${entity.name} на событии ${event.name}`}
                          />
                        ) : (
                          localTraffic[entity.id]?.[event.key]
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
                    {getEventStats(event.key, traffic)}
                  </th>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      <FilterSidebar />
    </>
  );
}
