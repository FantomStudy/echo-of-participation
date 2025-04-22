import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@features/auth/api/authApi";
import { queryClient } from "@configs/queryClientConfig";
import SubmitButton from "../components/SubmitButton";
import styles from "../styles/LoginPage.module.css";

export default function Login() {
  const navigate = useNavigate();

  const [state, submitAction] = useActionState(handleLogin, {
    data: null,
    error: null,
  });

  async function handleLogin(prevState, formData) {
    const login = formData.get("login");
    const password = formData.get("password");

    const response = await loginUser({ login, password });

    if (response.accessToken) {
      await queryClient.refetchQueries({ queryKey: ["currentUser"] });
      navigate("/", { replace: true });
    }

    return { ...prevState, ...response };
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Авторизация</h2>
        <form className={styles.form} action={submitAction}>
          <input
            type="text"
            name="login"
            placeholder="Логин"
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className={styles.input}
            required
          />
          <SubmitButton />
        </form>
        {state.error && <p className={styles.error}>{state.error}</p>}
      </div>
    </div>
  );
}
