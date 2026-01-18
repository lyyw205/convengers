import styles from "../admin.module.css";

export default function AdminReferencesPage() {
  return (
    <div className={styles.card}>
      <h2>Reference review</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Portfolio</th>
            <th>Owner</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pulse Education Platform</td>
            <td>Jin Park</td>
            <td>Pending review</td>
          </tr>
          <tr>
            <td>Aurora Health Portal</td>
            <td>Min Seo</td>
            <td>Approved</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
