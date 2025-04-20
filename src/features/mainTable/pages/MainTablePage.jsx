import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Header from "../../../shared/components/Header/Header";
import Chart from "../components/Chart/Chart";
import styles from "../styles/MainTablePage.module.css";
import EventRatingTable from "../components/tables/EventRatingTable/EventRatingTable";
import StudentTable from "../components/tables/StudentTable/StudentTable";
import api from "@/shared/configs/axiosConfig";

// ChartJS.register(ArcElement, Tooltip, Legend);

export default function MainTablePage() {
  const [data, setData] = useState(null);

  if (!data) {
    return <div>DATA FETCH</div>;
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.buttonGroup}>
        <button
          className={styles.filterButton}
          onClick={() => {
            setIsRatingVisible((prev) => !prev);
          }}
        >
          {isRatingVisible ? "К таблице посещаемости" : "Оценить мероприятия"}
        </button>
      </div> */}
      {/* {!isRatingVisible && (
        <>
          <StudentTable />
          <Chart />
        </>
      )} */}
      {/* {isRatingVisible && <EventRatingTable />} */}
    </div>
  );
}
