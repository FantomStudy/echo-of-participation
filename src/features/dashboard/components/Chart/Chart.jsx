import { Pie } from "react-chartjs-2";

import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";

import { chartOptions } from "../../configs/chartConfig";
import styles from "../../styles/Chart.module.css";
import { generateChartData } from "../../utils/chartUtils";

ChartJS.register(ArcElement, Tooltip);

const Chart = ({ data, error }) => {
  if (error) {
    return <>Не удалось загрузить необходимые данные...</>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.chartSizer}>
        <Pie data={generateChartData(data)} options={chartOptions} />
      </div>
    </div>
  );
};

export default Chart;
