import styles from "../portal.module.css";

export default function PortfolioPage() {
  return (
    <div className={styles.card}>
      <h2>Portfolio manager</h2>
      <p className={styles.muted}>
        Draft your work and publish once per week after review.
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Project</th>
            <th>Status</th>
            <th>Last update</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pulse Education Platform</td>
            <td>Pending review</td>
            <td>Yesterday</td>
          </tr>
          <tr>
            <td>Atlas Supply Chain</td>
            <td>Published</td>
            <td>Oct 18</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
