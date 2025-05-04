import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/AddUserPage.module.css";
import { useRoles } from "../hooks/queries/useRoles";
import api from "@/shared/configs/axiosConfig";

//TODO СДЕЛАТЬ ПО АНАЛОГИИ С ЛОГИНОМ(БЕСТ ПРАКТИС РЕАКТ 19)
export default function AddUserPage() {
  const roles = useRoles();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    login: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!accessToken) {
      setError("Токен не найден");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/register", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      console.log("Пользователь успешно добавлен:", response.data);

      setFormData({
        fullName: "",
        login: "",
        password: "",
        role: roles.data[0]?.value || "",
      });

      navigate("/admin");
    } catch (err) {
      setError(
        err.response?.data?.message || "Ошибка при добавлении пользователя"
      );
      console.error("Ошибка:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Добавление пользователя</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ФИО"
            className={styles.input}
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Логин"
            className={styles.input}
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            className={styles.input}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            className={styles.select}
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={roles.isLoading || roles.data.length === 0}
          >
            {roles.isLoading ? (
              <option>Загрузка ролей...</option>
            ) : roles.data.length === 0 ? (
              <option>Роли не найдены</option>
            ) : (
              roles.data.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.name}
                </option>
              ))
            )}
          </select>
          {error && <p className={styles.error}>{error}</p>}
          <button
            type="submit"
            className={styles.button}
            disabled={loading || roles.isLoading}
          >
            {loading ? "Добавление..." : "Добавить пользователя"}
          </button>
          <Link
            to={"/admin"}
            style={{
              textAlign: "center",
              textDecoration: "none",
              color: "var(--font-secondary-color)",
            }}
          >
            Вернуться в кабинет
          </Link>
        </form>
      </div>
    </div>
  );
}
