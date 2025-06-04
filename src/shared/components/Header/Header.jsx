import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Dropdown from "@components/Dropdown/Dropdown";
import { queryClient } from "@configs/queryClientConfig";
import { useSetAuth } from "@stores/authStore";
import { removeCookie } from "@utils/cookieUtils";
import { formatName } from "@utils/formatUtils";

import styles from "./Header.module.css";

const Header = () => {
  const userData = queryClient.getQueryData(["currentUser"]);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header_wrapper}>
          <div style={{ display: "flex", gridGap: 30 }}>
            <img
              src="/public/okei-logo.svg"
              alt="okei-logo"
              className={styles.optional}
            />
            <img
              src="/public/profi-logo.svg"
              alt="prof-logo"
              className={styles.optional}
            />
            <Link to="/" className={styles.logo_section}>
              <img src="/logo.svg" alt="logo" />
              <h1 className="">Эхо участия</h1>
            </Link>
          </div>

          <div className={styles.user_section}>
            <img src="/bell.svg" alt="bell" className={styles.bell} />

            <Dropdown menuItems={<DropdownItems />}>
              <div className={styles.user_info_wrapper}>
                <div className={styles.user_info}>
                  {userData ? (
                    <>
                      <h2>{formatName(userData.fullName)}</h2>
                      <p>{userData.roleName}</p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <img
                  src="/user_logo.svg"
                  alt="user_logo"
                  className={styles.user_logo}
                />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

function DropdownItems() {
  const userData = queryClient.getQueryData(["currentUser"]);
  const setAuth = useSetAuth();

  const handleLogout = () => {
    removeCookie("access_token");
    setAuth(false);
    queryClient.removeQueries({ queryKey: ["currentUser"] });
  };

  return (
    <>
      {userData?.roleName === "Администратор" && (
        <li>
          <Link to="/admin">Панель администратора</Link>
        </li>
      )}
      <li>
        <Link to="/">Основная таблица</Link>
      </li>
      <li>
        <Link to="/event-evaluation">Оценка мероприятия</Link>
      </li>
      <li onClick={handleLogout} className={styles.logout}>
        Выйти
      </li>
    </>
  );
}
