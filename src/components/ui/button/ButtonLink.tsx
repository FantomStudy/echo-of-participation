import type { FC } from "react";

import { Link, type LinkProps } from "@tanstack/react-router";

import styles from "./Button.module.css";

interface ButtonLinkProps extends LinkProps {
  color?: "primary" | "danger";
  className?: string;
}

const ButtonLink: FC<ButtonLinkProps> = ({
  to,
  children,
  className,
  color = "primary",
  ...props
}) => {
  return (
    <Link
      to={to}
      className={`${styles.button} ${styles[color]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
