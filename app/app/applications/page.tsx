import styles from "../portal.module.css";

export default function ApplicationsPage() {
  return (
    <div className={styles.card}>
      <h2>My applications</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Posting</th>
            <th>Status</th>
            <th>Last update</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Full-stack Engineer (Next.js + Supabase)</td>
            <td>Review</td>
            <td>2 days ago</td>
          </tr>
          <tr>
            <td>Product Designer (B2B SaaS)</td>
            <td>Interview</td>
            <td>1 week ago</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
