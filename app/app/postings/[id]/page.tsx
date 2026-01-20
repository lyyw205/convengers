import styles from "./page.module.css";
import { postingItems } from "../../../lib/sample-data";

type PostingDetailProps = {
  params: { id: string };
};

export default function PostingDetailPage({ params }: PostingDetailProps) {
  const posting = postingItems.find((item) => item.id === params.id);

  if (!posting) {
    return (
      <div className={styles.card}>
        <h2>Posting not found</h2>
        <p className={styles.muted}>Return to the postings list.</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.pill}>Open</div>
      <h2>{posting.title}</h2>
      <p className={styles.muted}>
        Duration: {posting.duration} · Budget: {posting.budget}
      </p>
      <h3>Key skills</h3>
      <ul className={styles.list}>
        {posting.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <button className={styles.pill} type="button">
        Apply now
      </button>
    </div>
  );
}
