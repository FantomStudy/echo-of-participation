import type { HTMLAttributes } from "react";

import styles from "./Skeleton.module.css";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

const Skeleton = ({
  width = "100%",
  height = "1em",
  borderRadius = 8,
  className,
  style,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={`${styles.skeleton} ${className || ""}`}
      style={{ width, height, borderRadius, ...style }}
      {...props}
    />
  );
};

export default Skeleton;
