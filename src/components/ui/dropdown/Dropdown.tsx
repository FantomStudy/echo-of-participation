import type { ReactNode } from "react";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import styles from "./Dropdown.module.css";

interface DropdownProps {
  children?: ReactNode;
  items: ReactNode[];
}

const Dropdown = ({ children, items }: DropdownProps) => {
  return (
    <Menu>
      <MenuButton className={`${styles.button}`}>{children}</MenuButton>
      <MenuItems anchor="bottom end">
        {items.map((item, index) => (
          <MenuItem key={index}>{item}</MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
