import styles from "../admin.module.css";

export default function AdminApplicationsPage() {
  return (
    <div className={styles.card}>
      <h2>Applications review</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Posting</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jin Park</td>
            <td>Full-stack Engineer</td>
            <td>Shortlist</td>
          </tr>
          <tr>
            <td>Min Seo</td>
            <td>Product Designer</td>
            <td>Interview</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
