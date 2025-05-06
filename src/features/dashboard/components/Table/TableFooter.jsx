import { getEventStats } from "../../utils/calculateUtils";

const TableFooter = ({ events, traffic }) => {
  return (
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
  );
};

export default TableFooter;
