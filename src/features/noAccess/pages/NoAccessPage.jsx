import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import styles from "../styles/NoAccessPage.module.css";
import { queryClient } from "@/shared/configs/queryClientConfig";

export default function NoAccessPage() {
  const userData = queryClient.getQueryData(["user"]);
  const roleName = userData?.roleName;
  const location = useLocation();

  const [isKnocking, setIsKnocking] = useState(false);
  const [knockCount, setKnockCount] = useState(0);

  if (roleName === "admin") {
    const from = location.state?.from?.pathname;
    return <Navigate to={from} replace />;
  }

  const messages = [
    "Тук-тук! Кто там? Не админ, точно!",
    "Хватит стучать, без прав админа не открою!",
    "Ты думаешь, что если постучишь еще раз, я передумаю?",
    "Может, попробуешь взломать дверь?",
    "Админ спит, не беспокоить!",
    "Нет, нет и еще раз нет!",
    "Ты не пройдешь!",
    "Доступ запрещен, и это окончательно!",
    "Ладно, ты упорный, но всё равно не админ! Вот тебе секрет: пароль - 'неправильный'.",
  ];

  const handleKnock = () => {
    setIsKnocking(true);
    setKnockCount((prev) => prev + 1);
    setTimeout(() => setIsKnocking(false), 800);
  };

  const getMessage = () => {
    const messageIndex = knockCount % messages.length;
    return messages[messageIndex];
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Доступ запрещён!</h1>
      <p className={styles.subtitle}>Только для админов!</p>

      <div className={styles.doorContainer}>
        <div
          className={`${styles.door} ${isKnocking ? styles.knock : ""}`}
          onClick={handleKnock}
        >
          <div className={styles.knob}></div>
          <div className={`${styles.lock} ${isKnocking ? styles.knock : ""}`}>
            <div className={styles.lockKeyhole}></div>
            <div className={styles.lockScrewTop}></div>
            <div className={styles.lockScrewBottom}></div>
          </div>
        </div>
      </div>

      <p key={knockCount} className={styles.message}>
        {getMessage()}
      </p>

      <Link to="/" className={styles.backButton}>
        Вернуться на главную
      </Link>
    </div>
  );
}
