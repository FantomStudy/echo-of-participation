import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { chartOptions } from "../../configs/chartConfig";
import { generateChartData } from "../../utils/chartUtils";

ChartJS.register(ArcElement, Tooltip);

const Chart = ({ data, error }) => {
  if (error) {
    return <>Error</>;
  }

  return (
    <div style={{ width: "90%", height: "100%" }}>
      <Pie data={generateChartData(data)} options={chartOptions} />
    </div>
  );
};

export default Chart;
