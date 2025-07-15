import { useEffect } from "react";
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancel}>Annulla</button>
          <button onClick={onConfirm} className={styles.confirm}>Conferma</button>
        </div>
      </div>
    </div>
  );
}
