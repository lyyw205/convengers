import PublicLayout from "../components/PublicLayout";
import styles from "./page.module.css";

export default function PrivacyPage() {
  return (
    <PublicLayout
      title="Privacy"
      subtitle="Short-form summary for early preview."
      align="center"
    >
      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.badge}>Data use</div>
          <ul className={styles.list}>
            <li>We collect contact info only for project intake and follow-up.</li>
            <li>Partner performance data stays inside the portal.</li>
            <li>Public references are approved before publishing.</li>
          </ul>
        </div>
      </section>
    </PublicLayout>
  );
}
