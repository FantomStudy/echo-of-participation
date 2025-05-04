import { utils, writeFile } from "xlsx";

export const exportExcel = ({ entities, events, traffic, headTable }) => {
  const data = entities.map((entity) => {
    const row = {
      [headTable]: entity.name,
    };
    events.forEach((event) => {
      row[event.name] = traffic[entity.id]?.[event.key] ?? "";
    });
    return row;
  });

  const ws = utils.json_to_sheet(data);

  const objectMaxLength = (obj, key) =>
    Math.max(
      key.length,
      ...data.map((row) => (row[key] ? row[key].toString().length : 0))
    );

  const cols = Object.keys(data[0] || {}).map((key) => {
    const maxLength = objectMaxLength(data[0], key);
    return { wch: maxLength + 3 };
  });

  ws["!cols"] = cols;

  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sheet1");

  writeFile(wb, `Report.xlsx`, { cellStyles: true, type: "array" });
};
