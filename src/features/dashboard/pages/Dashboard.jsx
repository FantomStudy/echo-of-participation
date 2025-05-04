import Skeleton from "react-loading-skeleton";
import ActivityRating from "../components/ActivityRating/ActivityRating.jsx";
import Chart from "../components/Chart/Chart.jsx";
import DashboardTable from "../components/DashboardTable/DashboardTable.jsx";
import OrganizersRating from "../components/OrganizersRating/OrganizersRating.jsx";
import { useActivityRating } from "../hooks/queries/useActivityRating.js";
import styles from "../styles/Dashboard.module.css";
import "react-loading-skeleton/dist/skeleton.css";

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
            <Chart data={data} />
          </div>
        )}

        <div className={styles.grid_area}>
          <ActivityRating data={data} error={error} isLoading={isLoading} />
        </div>

        <div className={styles.grid_area}>
          <OrganizersRating />
        </div>

        <div className={`${styles.grid_area} ${styles.wide}`}>
          <DashboardTable />
        </div>
      </div>
    </div>
  );
}
