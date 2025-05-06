import { useNavigate } from "react-router-dom";

import { formatName } from "@utils/formatUtils";

import { useSaveTraffic } from "../../hooks/mutations/useSaveTraffic";
import { useEditTable } from "../../hooks/useEditTable";
import styles from "../../styles/DashboardTable.module.css";

const TableBody = ({ vItems, entities, events, traffic, isStudents }) => {
  const navigate = useNavigate();

  const { save } = useSaveTraffic();

  const {
    localTraffic,
    currentCell,
    cellValue,
    cellClick,
    cellInputChange,
    handleInputBlurOrEnter,
  } = useEditTable({ traffic, events, mutateFn: save });

  return (
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
                className={styles.clickableBlock}
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
                          localTraffic[entity.id]?.[event.key],
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
                    // disabled={isSaving}
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
  );
};

export default TableBody;
