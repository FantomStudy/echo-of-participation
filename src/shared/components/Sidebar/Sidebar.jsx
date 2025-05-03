import { createPortal } from "react-dom";
import { useSidebar } from "@stores/sidebarStore";
import styles from "./Sidebar.module.css";

const Sidebar = ({ id, children }) => {
  const { isShow, close } = useSidebar(id);

  return createPortal(
    <div
      className={`${styles.sidebar} ${isShow ? styles.open : styles.closed}  `}
      role="dialog"
    >
      <div className={`${styles.sidebar_overlay}`} onClick={close} />
      <div className={`${styles.sidebar_content}`}>{children}</div>
    </div>,
    document.body
  );
};

export default Sidebar;
