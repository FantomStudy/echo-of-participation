import { useActionState } from "react";
import { useLoginUser } from "@auth/hooks/mutations/useLoginUser";
import styles from "@auth/styles/LoginPage.module.css";

export default function Login() {
  const { login, isPending } = useLoginUser();

  const [state, submitAction] = useActionState(handleLogin, {
    data: null,
    error: null,
  });
  async function handleLogin(prevState, formData) {
    const credentials = {
      login: formData.get("login"),
      password: formData.get("password"),
    };

    login(credentials);

    return { ...prevState };
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
          <button className={styles.button} type="submit" disabled={isPending}>
            {isPending ? "Вход..." : "Войти"}
          </button>
        </form>
        {state.error && <p className={styles.error}>{state.error}</p>}
      </div>
    </div>
  );
}
