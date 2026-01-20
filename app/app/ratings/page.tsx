import styles from "./page.module.css";

export default function RatingsPage() {
  return (
    <div className={styles.card}>
      <h2>Ratings</h2>
      <p className={styles.muted}>
        Ratings are visible to admins and used for partner tier reviews.
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Project</th>
            <th>Score</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Aurora Health Portal</td>
            <td>5.0</td>
            <td>Excellent delivery and communication.</td>
          </tr>
          <tr>
            <td>Pulse Education Platform</td>
            <td>4.7</td>
            <td>Great result, minor schedule adjustment.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
