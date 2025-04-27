import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "@hooks/ui/useClickOutside";
import { useSidebar } from "@stores/sidebarStore";
import styles from "./Sidebar.module.css";

const Sidebar = ({
  id,
  children,
  className = "",
  overlayClassName = "",
  contentClassName = "",
}) => {
  const sidebarRef = useRef(null);
  const { isShow, close } = useSidebar(id);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isShow) {
        close();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isShow, close]);

  useEffect(() => {
    if (isShow) {
      sidebarRef.current?.focus();
    }
  }, [isShow]);

  useClickOutside(sidebarRef, close, isShow);

  return createPortal(
    <div
      className={`${styles.sidebar} ${
        isShow ? styles.open : styles.closed
      } ${className} `}
      role="dialog"
      aria-hidden={!isShow}
    >
      <div className={`${styles.sidebar_overlay} ${overlayClassName}`} />
      <div
        className={`${styles.sidebar_content} ${contentClassName}`}
        ref={sidebarRef}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Sidebar;
