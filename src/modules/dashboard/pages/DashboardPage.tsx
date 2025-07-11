import Skeleton from "@/components/ui/skeleton/Skeleton";

import OrganizersRating from "../components/ratings/OrganizersRating";
import styles from "./DashboardPage.module.css";

export const DashboardPage = () => {
  return (
    <div className="container">
      <div className={styles.gridLayout}>
        <Skeleton />
        <Skeleton />
        <OrganizersRating />
        <Skeleton />
      </div>
    </div>
  );
};
