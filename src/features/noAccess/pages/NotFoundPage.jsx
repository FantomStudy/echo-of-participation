import { Link } from "react-router-dom";
import styles from "../styles/NotFoundPage.module.css";

export default function NoAccessPage() {
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
