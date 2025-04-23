import { useRef } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "@hooks/ui/useClickOutside";
import styles from "./Sidebar.module.css";

const Sidebar = ({ children, isShow, toggleClick }) => {
  const sidebarRef = useRef(null);
  useClickOutside(sidebarRef, toggleClick, isShow);

  return createPortal(
    <div
      className={`${styles.sidebar} ${isShow ? styles.open : styles.closed} `}
    >
      <div className={styles.sidebar_overlay} />
      <div className={styles.sidebar_content} ref={sidebarRef}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Sidebar;
