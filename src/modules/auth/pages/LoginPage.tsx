import { type ChangeEvent, type FormEvent, useState } from "react";

import Button from "@/components/ui/button/Button";

import { useLogin } from "../api/queries";
import type { LoginCredentials } from "../api/types";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  const [form, setForm] = useState<LoginCredentials>({
    login: "",
    password: "",
  });

  const { mutate, isPending, error } = useLogin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div className={styles.page}>
      <div className={styles.logoWrapper}>
        <img src="/logos/okei-logo.svg" alt="okei-logo" />
        <div className={styles.logo}>
          <img src="/logos/logo.svg" alt="logo" />
          <p>Эхо участия</p>
        </div>
        <img src="/logos/profi-logo.svg" alt="profi-logo" />
      </div>

      <div className={styles.formContainer}>
        <h2 className={styles.title}>Авторизация</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="login"
            placeholder="Логин"
            value={form.login}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Вход..." : "Войти"}
          </Button>
        </form>
        {error && <p>{error.response?.data.message || "Неизвестная ошибка"}</p>}
      </div>
    </div>
  );
};
