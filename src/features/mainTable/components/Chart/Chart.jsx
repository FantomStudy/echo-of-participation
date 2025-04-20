import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { chartOptions } from "../../configs/chartConfig";
import { generateChartData } from "../../utils/chartUtils";
import styles from "../../styles/Chart.module.css";
import { useStudentStore } from "@/shared/stores/stundentStore";

const Chart = () => {
  const { students, attendance } = useStudentStore();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <>
      <button className={styles.toggleChartButton} onClick={toggleVisibility}>
        {isVisible ? "Скрыть диаграмму" : "Показать диаграмму"}
      </button>

      {isVisible && (
        <div className={styles.chartContainer}>
          <Pie
            data={generateChartData(students, attendance)}
            options={chartOptions}
          />
        </div>
      )}
    </>
  );
};

export default Chart;
