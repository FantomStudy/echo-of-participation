import styles from "./Dropdown.module.css";
import { useClickOutside } from "@hooks/ui/useClickOutside";

export default function Dropdown({ children, isShow, toggleShow, buttonRef }) {
  useClickOutside(buttonRef, toggleShow, isShow);

  return isShow ? <ul className={styles.dropdown}>{children}</ul> : null;
}
