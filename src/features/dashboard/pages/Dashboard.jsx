import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import ActivityRating from "../components/ActivityRating/ActivityRating";
import Chart from "../components/Chart/Chart.jsx";
import OrganizersRating from "../components/OrganizersRating/OrganizersRating.jsx";
import Table from "../components/Table/Table.jsx";
import { useActivityRating } from "../hooks/queries/useActivityRating.js";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const { data, isLoading, error } = useActivityRating();

  return (
    <div className="container">
      <div className={styles.grid}>
        {isLoading ? (
          <Skeleton
            width="100%"
            height="100%"
            borderRadius={15}
            style={{ translate: "-2px -2px" }}
          />
        ) : (
          <div className={`${styles.grid_area} ${styles.diagram}`}>
            <Chart data={data} error={error} />
          </div>
        )}

        <div className={styles.grid_area}>
          <ActivityRating data={data} error={error} isLoading={isLoading} />
        </div>

        <div className={styles.grid_area}>
          <OrganizersRating />
        </div>

        <div className={`${styles.grid_area} ${styles.wide}`}>
          <Table />
        </div>
      </div>
    </div>
  );
}
