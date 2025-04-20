import { useFormStatus } from "react-dom";
import styles from "../styles/SubmitButton.module.css";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className={styles.button} type="submit" disabled={pending}>
      {pending ? "Вход..." : "Войти"}
    </button>
  );
};

export default SubmitButton;
