import { utils, writeFile } from "xlsx";
import { getEventStats } from "./calculateUtils";

export const exportExcel = ({ students, events, attendance }) => {
  const exportData = [
    ["ФИО", ...events.map((event) => event.name)],
    ...students.map((student) => [
      student.name,
      ...events.map((event) => attendance[student.id][event.key] || ""),
    ]),
    ["Итого", ...events.map((event) => getEventStats(event.key, attendance))],
  ];
  const ws = utils.aoa_to_sheet(exportData);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "EventTable");
  writeFile(wb, `EventTable_${"Data"}.xlsx`);
};
