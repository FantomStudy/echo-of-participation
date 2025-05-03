import { Link, useLocation } from "react-router-dom";
import styles from "../styles/NotFound.module.css";
import { queryClient } from "@configs/queryClientConfig";

export default function NotFound() {
  const userData = queryClient.getQueryData(["user"]);
  const roleName = userData?.roleName;
  const location = useLocation();

  if (roleName === "admin") {
    const from = location.state?.from?.pathname;
    return <Navigate to={from} replace />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>Страница не найдена</p>
      <Link to="/" className={styles.backButton}>
        Вернуться на главную
      </Link>
    </div>
  );
}
