import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaCommentDots, FaCheckCircle, FaTrash } from "react-icons/fa";
import { useState } from "react";
import styles from "./CategoryPage.module.css";

export default function CategoryPage() {
  const { name } = useParams();
  const decodedName = name.replace(/-/g, "/");

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ what: "", due: "", alert: false, note: "" });
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState("");

  const addTask = () => {
    if (!newTask.what || !newTask.due) return;
    setTasks(prev => [
      ...prev,
      { ...newTask, id: Date.now(), completed: false }
    ]);
    setNewTask({ what: "", due: "", alert: false, note: "" });
  };

  const openNote = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setEditingNoteId(id);
      setNoteText(task.note);
    }
  };

  const saveNote = () => {
    setTasks(prev =>
      prev.map(t =>
        t.id === editingNoteId ? { ...t, note: noteText } : t
      )
    );
    setEditingNoteId(null);
    setNoteText("");
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Categoria: {decodedName}</h2>

      {/* FORM NUOVA TASK */}
      <div className={styles.inputRow}>
        <input
          type="text"
          placeholder="Che cosa"
          value={newTask.what}
          onChange={e => setNewTask({ ...newTask, what: e.target.value })}
          className={styles.input}
        />
        <input
          type="date"
          value={newTask.due}
          onChange={e => setNewTask({ ...newTask, due: e.target.value })}
          className={styles.input}
        />
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={newTask.alert}
            onChange={e => setNewTask({ ...newTask, alert: e.target.checked })}
          />
          Imposta avviso
        </label>
        <button onClick={addTask} className={styles.addButton}>Aggiungi</button>
      </div>

      {/* LISTA TASK */}
      <div className={styles.taskList}>
        {tasks.map(task => (
          <div key={task.id} className={styles.taskRow}>
            <div className={styles.taskTextWrapper}>
            <span className={`${styles.taskText} ${task.completed ? styles.completed : ""}`}>
              {task.what} - entro {task.due} {task.alert && "(Avviso)"}
            </span>
            {task.completed && <span className={styles.strikeOverlay}></span>}
            </div>
            
            {/* AZIONI SUL TASK */}
            <div className={styles.taskActions}>
              <button
                className={styles.iconButton}
                onClick={() => openNote(task.id)}
                title="Aggiungi nota / sticker"
              >
                <FaCommentDots />
              </button>

              <button
                className={`${styles.iconButton} ${styles.green}`}
                onClick={() =>
                  setTasks(prev =>
                    prev.map(t =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    )
                  )
                }
                title="Completa"
              >
                <FaCheckCircle />
              </button>

              <button
                className={`${styles.iconButton} ${styles.red}`}
                onClick={() =>
                  setTasks(prev => prev.filter(t => t.id !== task.id))
                }
                title="Elimina"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODALE PER LE NOTE */}
      {editingNoteId !== null && (
        <div className={styles.noteModal}>
          <textarea
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            placeholder="Inserisci nota o sticker qui..."
            className={styles.noteTextarea}
          />
          <button onClick={saveNote} className={styles.saveNoteButton}>Salva Nota</button>
          <button onClick={() => setEditingNoteId(null)} className={styles.cancelNoteButton}>Annulla</button>
        </div>
      )}

      {/* BOTTONE INDIETRO */}
      <Link to="/" className={styles.backButton}>
        <FaArrowLeft className={styles.icon} />
      </Link>
    </div>
  );
}
