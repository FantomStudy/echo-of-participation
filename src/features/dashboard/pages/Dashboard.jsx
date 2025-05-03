import Sidebar from "@/shared/components/Sidebar/Sidebar.jsx";
import DashboardTable from "../components/DashboardTable/DashboardTable.jsx";
import TopOrganizers from "../components/TopOrganizers/TopOrganizers.jsx";
import TopStudents from "../components/TopStudents/TopStudents.jsx";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className="container">
      <div className={styles.grid}>
        <div className={styles.grid_area}></div>

        <div className={styles.grid_area}>{/* <TopStudents /> */}</div>

        <div className={styles.grid_area}>{/* <TopOrganizers /> */}</div>

        <div className={`${styles.grid_area} ${styles.wide}`}>
          <DashboardTable />
        </div>
      </div>
    </div>
  );
}
