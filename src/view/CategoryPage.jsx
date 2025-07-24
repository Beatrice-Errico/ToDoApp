import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./CategoryPage.module.css";

export default function CategoryPage() {
  const { name } = useParams();

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Categoria: {name}</h2>

      {/* Qui potresti aggiungere contenuto relativo alla categoria */}

      <Link to="/" className={styles.backButton}>
        <FaArrowLeft className={styles.icon} />
      </Link>
    </div>
  );
}
