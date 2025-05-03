import { Link } from "react-router-dom";
import { queryClient } from "@configs/queryClientConfig";
import Dropdown from "@components/Dropdown/Dropdown";
import { removeCookie } from "@utils/cookieUtils";
import { formatName } from "@utils/formatUtils";
import { useSetAuth } from "@stores/authStore";
import styles from "./Header.module.css";

const Header = () => {
  const userData = queryClient.getQueryData(["currentUser"]);

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
              <li className={styles.active}>
                <Link to="/">Основная таблица</Link>
              </li>
              <li>
                <Link to="/">Оценка мероприятия</Link>
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
      <li onClick={handleLogout} className={styles.logout}>
        Выйти
      </li>
    </>
  );
}
