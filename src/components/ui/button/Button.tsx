import type { ButtonHTMLAttributes, FC } from "react";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "danger";
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  color = "primary",
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[color]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
