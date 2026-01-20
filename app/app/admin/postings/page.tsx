import styles from "./page.module.css";

export default function AdminPostingsPage() {
  return (
    <div className={styles.card}>
      <h2>Postings control</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Posting</th>
            <th>Status</th>
            <th>Applicants</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Full-stack Engineer (Next.js + Supabase)</td>
            <td>Open</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Product Designer (B2B SaaS)</td>
            <td>Interview</td>
            <td>7</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
