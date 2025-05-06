import { useCallback, useEffect, useMemo, useState } from "react";

import { debounce } from "es-toolkit";

export const useEditTable = ({ traffic, events, mutateFn }) => {
  const [localTraffic, setLocalTraffic] = useState({ ...traffic });
  const [currentCell, setCurrentCell] = useState(null);
  const [cellValue, setCellValue] = useState("");
  const [pendingChanges, setPendingChanges] = useState([]);

  useEffect(() => {
    setLocalTraffic({ ...traffic });
  }, [traffic]);

  const debouncedSave = useMemo(
    () =>
      debounce((changes) => {
        if (changes.length > 0) {
          mutateFn(changes);
          setPendingChanges([]);
        }
      }, 5000),
    [mutateFn],
  );
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

      setPendingChanges((prev) => {
        const existingChange = prev.find((change) => change.studentId === id);
        let newChanges;
        if (existingChange) {
          newChanges = prev.map((change) =>
            change.studentId === id ? dataToSave : change,
          );
        } else {
          newChanges = [...prev, dataToSave];
        }

        debouncedSave(newChanges);
        return newChanges;
      });
    },
    [localTraffic, events, debouncedSave],
  );

  const handleInputBlurOrEnter = useCallback(
    (e, id, eventKey) => {
      if (e.type === "blur" || (e.type === "keydown" && e.key === "Enter")) {
        if (cellValue === "0" || cellValue === "1") {
          handleSave(id, eventKey, cellValue);
        }
        setCurrentCell(null);
      } else if (e.type === "keydown") {
        const { key } = e;
        if (key === "1" || key === "0") {
          setCellValue(key);
          handleSave(id, eventKey, key);
        } else if (
          key !== "Backspace" &&
          key !== "ArrowLeft" &&
          key !== "ArrowRight" &&
          key !== "Enter"
        ) {
          e.preventDefault();
        }
      }
    },
    [cellValue, handleSave],
  );

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (pendingChanges.length > 0) {
        e.preventDefault();
        mutateFn(pendingChanges);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [pendingChanges, mutateFn, currentCell]);

  return {
    localTraffic,
    currentCell,
    cellValue,
    cellClick,
    cellInputChange,
    handleInputBlurOrEnter,
  };
};
