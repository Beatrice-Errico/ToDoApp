import { useState } from "react";
import styles from "./App.module.css";
import CategoryCard from "./components/CategoryCard";
import { categories as defaultCategories } from "./data/defaultCategories.js";
import ConfirmModal from "./components/ConfirmModal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "./view/CategoryPage";
// Se Contact non esiste ancora, commentalo
// import Contact from "./view/Contact";

export default function App() {
  const [categories, setCategories] = useState(defaultCategories);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      { id: Date.now(), label: "Nuova Categoria" },
    ]);
  };

  const removeCategory = () => {
    if (categories.length === 0) return;
    setShowConfirm(true);
  };

  const updateCategory = (id, newLabel) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, label: newLabel } : cat))
    );
  };

  const deleteCategory = (idToDelete) => {
    setConfirmDeleteId(idToDelete);
  };

  return (
    <BrowserRouter>
      <main className={styles.pageWrapper}>
        <section className={styles.container}>
          <header>
            <h1 className={styles.logo}>
              <span className={styles.toDo}>toDO</span>
              <span className={styles.list}>list.</span>
            </h1>
          </header>

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <article className={styles.cardList}>
                    {categories.map((cat) => (
                      <CategoryCard
                        key={cat.id}
                        id={cat.id}
                        label={cat.label}
                        onUpdate={updateCategory}
                        onDelete={deleteCategory}
                      />
                    ))}
                  </article>

                  <section className={styles.buttonRow}>
                    <button
                      className={styles.circleRed}
                      onClick={removeCategory}
                    >
                      -
                    </button>
                    <button
                      className={styles.circleGreen}
                      onClick={addCategory}
                    >
                      +
                    </button>
                  </section>
                </>
              }
            />

            <Route path="/category/:name" element={<CategoryPage />} />
            
          </Routes>
        </section>

        {showConfirm && (
          <ConfirmModal
            message="Sei sicuro di voler eliminare l'ultima categoria?"
            onConfirm={() => {
              setCategories((prev) => prev.slice(0, -1));
              setShowConfirm(false);
            }}
            onCancel={() => setShowConfirm(false)}
          />
        )}

        {confirmDeleteId !== null && (
          <ConfirmModal
            message="Vuoi davvero eliminare questa categoria?"
            onConfirm={() => {
              setCategories((prev) =>
                prev.filter((cat) => cat.id !== confirmDeleteId)
              );
              setConfirmDeleteId(null);
            }}
            onCancel={() => setConfirmDeleteId(null)}
          />
        )}
      </main>
    </BrowserRouter>
  );
}
