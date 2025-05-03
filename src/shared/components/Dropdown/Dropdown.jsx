import { useRef } from "react";
import { useClickOutside } from "@hooks/ui/useClickOutside";
import { useShowUI } from "@hooks/ui/useShowUI";
import styles from "./DropdownMenu.module.css";

const Dropdown = ({ children, menuItems }) => {
  const { isShow, setIsShow, toggleShow } = useShowUI();
  const wrapperRef = useRef(null);

  useClickOutside(
    wrapperRef,
    () => {
      setIsShow(false);
    },
    isShow
  );

  return (
    <div
      ref={wrapperRef}
      onClick={toggleShow}
      className={styles.dropdown_wrapper}
    >
      {children}
      {isShow ? <ul className={styles.dropdown}>{menuItems}</ul> : null}
    </div>
  );
};

export default Dropdown;
