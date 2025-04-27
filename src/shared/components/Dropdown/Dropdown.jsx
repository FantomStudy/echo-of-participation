import styles from "./Dropdown.module.css";
import { useClickOutside } from "@hooks/ui/useClickOutside";

export default function Dropdown({
  children,
  isShow,
  toggleClick,
  buttonRef,
}) {
  useClickOutside(buttonRef, toggleClick, isShow);

  return isShow ? <ul className={styles.dropdown}>{children}</ul> : null;
}
