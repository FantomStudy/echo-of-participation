import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/AddUserPage.module.css";

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    login: "",
    password: "",
    role: "",
  });

  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Инициализируем хук navigate

  useEffect(() => {
    const fetchRoles = async () => {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

      if (!accessToken) {
        setError("Токен не найден");
        setRolesLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/role/all-roles",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setRoles(response.data);
        console.log(accessToken);

        console.log(response.data);

        if (response.data.length > 0) {
          setFormData((prev) => ({ ...prev, role: response.data[0].value }));
        }
      } catch (err) {
        console.error("Ошибка при загрузке ролей:", err);
        setError("Не удалось загрузить роли");
      } finally {
        setRolesLoading(false);
      }
    };

    fetchRoles();
  }, []);

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
    setSuccess(null);

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
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log("Пользователь успешно добавлен:", response.data);
      setSuccess("Пользователь успешно добавлен");
      setFormData({
        fullName: "",
        login: "",
        password: "",
        role: roles[0]?.value || "",
      });
      // Перенаправление на /admin после успешного добавления
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
            disabled={rolesLoading || roles.length === 0}
          >
            {rolesLoading ? (
              <option>Загрузка ролей...</option>
            ) : roles.length === 0 ? (
              <option>Роли не найдены</option>
            ) : (
              roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.name}
                </option>
              ))
            )}
          </select>
          <button
            type="submit"
            className={styles.button}
            disabled={loading || rolesLoading}
          >
            {loading ? "Добавление..." : "Добавить пользователя"}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </div>
    </div>
  );
}
