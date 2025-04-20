import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Загрузка...</p>
    </div>
  );
};

export default Loader;
