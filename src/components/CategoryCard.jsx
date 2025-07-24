import { useState, useEffect, useRef } from "react";
import styles from "./CategoryCard.module.css";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CategoryCard({ id, label, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(label);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); // seleziona tutto il testo
    }
  }, [editing]);

  const handleEdit = () => {
    const trimmed = input.trim();
    if (editing && trimmed && trimmed !== label) {
      onUpdate(id, trimmed);
    }
    setEditing(!editing);
  };

  return (
    <div className={styles.card}>
      {editing ? (
        <input
          ref={inputRef}
          className={styles.inlineInput}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEdit();
            if (e.key === "Escape") {
              setInput(label);
              setEditing(false);
            }
          }}
        />
      ) : (
        <Link to={`/category/${label.replace(/\//g, "-")}`} className={styles.label}> {label}</Link>
      )}

      <div className={styles.iconGroup}>
        <button className={styles.iconBtn} onClick={handleEdit} title="Modifica">
          <FaPen />
        </button>
        <button
          className={styles.iconBtn}
          onClick={() => onDelete(id)}
          title="Elimina"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
