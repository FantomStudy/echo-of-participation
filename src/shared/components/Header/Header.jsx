import { memo, useRef } from "react";
import { Link } from "react-router-dom";
import Dropdown from "@components/Dropdown/Dropdown";
import { queryClient } from "@configs/queryClientConfig";
import { formatName } from "@utils/formatDataUtils";
import { useShowUI } from "@hooks/ui/useShowUI";
import styles from "./Header.module.css";
import { useLogout } from "@/shared/stores/localStore";

const Header = () => {
  const logout = useLogout();
  const userData = queryClient.getQueryData(["user"]);
  const { isShow, toggleShow } = useShowUI();
  const buttonRef = useRef(null);

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
                <span onClick={() => {}} style={{ cursor: "pointer" }}>
                  Оценка мероприятия
                </span>
              </li>
            </ul>
          </div>
          <div className={styles.user_section}>
            <img src="/bell.svg" alt="bell" className={styles.bell} />
            <div
              className={styles.user_info_wrapper}
              ref={buttonRef}
              onClick={toggleShow}
            >
              <div className={styles.user_info}>
                {userData ? (
                  <>
                    <h2>{formatName(userData.fullName)}</h2>
                    <p>{userData.roleName}</p>
                  </>
                ) : (
                  <>
                    <span className={styles.skeleton_fullname}></span>
                    <span className={styles.skeleton_role}></span>
                  </>
                )}
              </div>
              <img
                src="/user_logo.svg"
                alt="user_logo"
                className={styles.user_logo}
              />
              <Dropdown
                buttonRef={buttonRef}
                isShow={isShow}
                toggleShow={toggleShow}
              >
                {userData?.roleName === "admin" && (
                  <li>
                    <Link to="/admin">Панель администратора</Link>
                  </li>
                )}
                <li onClick={logout} className={styles.logout}>
                  Выйти
                </li>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
