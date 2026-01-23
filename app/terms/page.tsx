import PublicLayout from "../components/PublicLayout";
import styles from "./page.module.css";

export default function TermsPage() {
  return (
    <PublicLayout
      title="Terms"
      subtitle="Short-form summary for early preview."
      align="center"
    >
      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.badge}>Agreement</div>
          <ul className={styles.list}>
            <li>Project engagement requires a signed statement of work.</li>
            <li>Portfolio publication needs mutual approval.</li>
            <li>Payment terms are defined per project and partner tier.</li>
          </ul>
        </div>
      </section>
    </PublicLayout>
  );
}
