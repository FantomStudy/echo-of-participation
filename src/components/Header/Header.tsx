import { Link } from "@tanstack/react-router";

import { useAuthContext } from "@/hooks/useAuthContext";
import { formatName } from "@/utils/format";

import Dropdown from "../ui/dropdown/Dropdown";
import styles from "./Header.module.css";

export const Header = () => {
  const currentUser = useAuthContext();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerWrapper}>
          <div className={styles.logotypes}>
            <img
              src="/logos/okei-logo.svg"
              alt="okei-logo"
              className={styles.logo}
            />
            <img
              src="/logos/profi-logo.svg"
              alt="prof-logo"
              className={styles.logo}
            />
            <Link to="/" className={styles.logoLink}>
              <img src="/logos/logo.svg" alt="logo" />
              <h1 className="">Эхо участия</h1>
            </Link>
          </div>

          <div className={styles.controls}>
            <img src="/icons/bell.svg" alt="bell" className={styles.bell} />

            <Dropdown>
              {currentUser && (
                <div className={styles.userData}>
                  <h2>{formatName(currentUser.fullName)}</h2>
                  <p>{currentUser.roleName}</p>
                </div>
              )}
              <img src="/icons/user.svg" alt="userIcon" />
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};
