import { Link, useLocation } from "react-router-dom";
import { queryClient } from "@configs/queryClientConfig";
import Dropdown from "@components/Dropdown/Dropdown";
import { removeCookie } from "@utils/cookieUtils";
import { formatName } from "@utils/formatUtils";
import { useSetAuth } from "@stores/authStore";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";

const Header = () => {
  const userData = queryClient.getQueryData(["currentUser"]);
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header_wrapper}>
          <Link to="/" className={styles.logo_section}>
            <img src="/logo.svg" alt="logo" />
            <h1>Эхо участия</h1>
          </Link>
          <div className={styles.nav_section}>
            <ul>
              <li className={location.pathname === "/" ? styles.active : null}>
                <Link to="/">Основная таблица</Link>
              </li>
              <li
                className={
                  location.pathname === "/event-evaluation"
                    ? styles.active
                    : null
                }
              >
                <Link to="/event-evaluation">Оценка мероприятия</Link>
              </li>
            </ul>
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
  const { width } = useWindowSize();
  const isMobile = width < 870;

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
      {isMobile && (
        <>
          <li>
            <Link to="/">Основная таблица</Link>
          </li>
          <li>
            <Link to="/event-evaluation">Оценка мероприятия</Link>
          </li>
        </>
      )}
      <li onClick={handleLogout} className={styles.logout}>
        Выйти
      </li>
    </>
  );
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
