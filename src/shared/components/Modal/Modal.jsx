import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ children, isShow, toggleClick }) => {
  if (!isShow) {
    document.body.style.overflow = "auto";
    return null;
  } else {
    document.body.style.overflow = "hidden";
  }

  return createPortal(
    <div className={styles.modal_wrapper}>
      <div className={styles.modal}>
        <button className={styles.close_button} onClick={toggleClick}>
          <img src="/Close button.png" alt="CloseBtn" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
