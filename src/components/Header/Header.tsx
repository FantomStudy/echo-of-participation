import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";

import { useAuthContext } from "@/hooks/useAuthContext";
import { formatName } from "@/utils/format";

import styles from "./Header.module.css";

export const Header = () => {
  const currentUser = useAuthContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`; // TODO ПЕРЕРАБОТАТЬ ФУНКЦИЮ ВЫХОДА, РЕАЛИЗОВАТЬ НА BACKEND
    queryClient.removeQueries({ queryKey: ["currentUser"] });
    navigate({ to: "/login", replace: true });
  };

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

            <Menu>
              <MenuButton className={styles.dropdownTrigger}>
                {currentUser && (
                  <div className={styles.triggerData}>
                    <h2>{formatName(currentUser.fullName)}</h2>
                    <p>{currentUser.roleName}</p>
                  </div>
                )}
                <img src="/icons/user.svg" alt="userIcon" />
              </MenuButton>
              <MenuItems
                transition
                anchor="bottom end"
                className={styles.dropdownItems}
              >
                <MenuItem>
                  {currentUser.roleName === "Администратор" && (
                    <Link to="/" className={styles.dropdownItem}>
                      Панель администратора
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  <Link to="/" className={styles.dropdownItem}>
                    Основная таблица
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/" className={styles.dropdownItem}>
                    Оценка мероприятия
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className={styles.dropdownItem}
                  >
                    Выйти
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};
