import { useState } from "react";
import styles from "@dashboard/styles/CustomTooltip.module.css";

const CustomTooltip = ({ title, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.tooltipWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={styles.eventName}>{children}</span>
      {isHovered && <div className={styles.customTooltip}>{title}</div>}
    </div>
  );
};

export default CustomTooltip;
