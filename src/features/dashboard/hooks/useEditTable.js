import { useCallback, useMemo, useState } from "react";

export const useEditTable = ({ attendance, events, mutateFn }) => {
  const [localAttendance, setLocalAttendance] = useState(attendance || {});
  const [currentCell, setCurrentCell] = useState(null);
  const [cellValue, setCellValue] = useState("");

  useMemo(() => {
    setLocalAttendance(attendance || {});
  }, [attendance]);

  const cellClick = useCallback((studentId, eventKey, value) => {
    setCurrentCell({ studentId, eventKey });
    setCellValue(value.toString() || "");
  }, []);

  const cellInputChange = useCallback((e) => {
    const newValue = e.target.value;

    if (newValue === "" || newValue === "0" || newValue === "1") {
      setCellValue(newValue);
    }
  }, []);

  const handleSave = useCallback(
    (studentId, eventKey, value) => {
      const updatedAttendance = {
        ...localAttendance,
        [studentId]: {
          ...localAttendance[studentId],
          [eventKey]: value,
        },
      };
      setLocalAttendance(updatedAttendance);

      const dataToSave = {
        studentId,
        events: events.map((event) => {
          const parts = event.name.split(" ");
          parts.pop();

          return {
            name: parts.join(" "),
            point:
              parseInt(updatedAttendance[studentId][event.key] || "0") || 0,
          };
        }),
      };

      mutateFn(dataToSave);
      setCurrentCell(null);
    },
    [localAttendance, events, mutateFn]
  );

  //TODO ВОЗМОЖНО УЛУЧШИТЬ ИЛИ ПОМЕНЯТЬ ВВОД
  const handleInputBlurOrEnter = useCallback(
    (e, studentId, eventKey) => {
      if (e.type === "blur") {
        setCurrentCell(null);
      }
      if (e.type === "keydown") {
        const { key } = e;

        if (key === "1" || key === "0") {
          setCellValue(key);
          handleSave(studentId, eventKey, key);
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
    localAttendance,
    currentCell,
    cellValue,
    cellClick,
    cellInputChange,
    handleInputBlurOrEnter,
  };
};
