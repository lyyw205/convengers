import PublicLayout from "../components/PublicLayout";
import styles from "../public.module.css";

export default function ContactPage() {
  return (
    <PublicLayout
      title="Start a project"
      subtitle="Share the essentials and we will respond within one business day."
      align="center"
    >
      <section className={styles.section}>
        <form className={styles.form}>
          <input className={styles.input} placeholder="Company / Team name" />
          <input className={styles.input} placeholder="Contact email" />
          <select className={styles.select}>
            <option>Project type</option>
            <option>Product strategy</option>
            <option>Design + engineering</option>
            <option>Growth + ops</option>
          </select>
          <textarea
            className={styles.textarea}
            placeholder="Project summary, goals, timeline, budget"
          />
          <button className={`${styles.button} ${styles.buttonPrimary}`} type="button">
            Submit inquiry
          </button>
        </form>
      </section>
    </PublicLayout>
  );
}
