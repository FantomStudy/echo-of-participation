import { useCallback, useEffect, useState } from "react";

export const useEditTable = ({ traffic, events, mutateFn }) => {
  const [localTraffic, setLocalTraffic] = useState({ ...traffic });
  const [currentCell, setCurrentCell] = useState(null);
  const [cellValue, setCellValue] = useState("");

  useEffect(() => setLocalTraffic({ ...traffic }), [traffic]);

  const cellClick = useCallback((id, eventKey, value) => {
    setCurrentCell({ id, eventKey });
    setCellValue(value.toString() || "");
  }, []);

  const cellInputChange = useCallback((e) => {
    const newValue = e.target.value;

    if (newValue === "" || newValue === "0" || newValue === "1") {
      setCellValue(newValue);
    }
  }, []);

  const handleSave = useCallback(
    (id, eventKey, value) => {
      const updatedTraffic = {
        ...localTraffic,
        [id]: {
          ...localTraffic[id],
          [eventKey]: value,
        },
      };
      setLocalTraffic(updatedTraffic);

      const dataToSave = {
        studentId: id,
        events: events.map((event) => {
          const parts = event.name.split(" ");
          parts.pop();

          return {
            name: parts.join(" "),
            point: parseInt(updatedTraffic[id][event.key] || "0") || 0,
          };
        }),
      };

      mutateFn(dataToSave);
      setCurrentCell(null);
    },
    [localTraffic, events, mutateFn]
  );

  //TODO ВОЗМОЖНО УЛУЧШИТЬ ИЛИ ПОМЕНЯТЬ ВВОД
  const handleInputBlurOrEnter = useCallback(
    (e, id, eventKey) => {
      if (e.type === "blur") {
        setCurrentCell(null);
      }
      if (e.type === "keydown") {
        const { key } = e;

        if (key === "1" || key === "0") {
          setCellValue(key);
          handleSave(id, eventKey, key);
        } else if (
          key !== "Backspace" &&
          key !== "ArrowLeft" &&
          key !== "ArrowRight"
        ) {
          setCurrentCell(null);
          e.preventDefault();
        }
      }
    },
    [handleSave]
  );

  return {
    localTraffic,
    currentCell,
    cellValue,
    cellClick,
    cellInputChange,
    handleInputBlurOrEnter,
  };
};
