import styles from "../admin.module.css";

export default function AdminAuditPage() {
  return (
    <div className={styles.card}>
      <h2>Audit log</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Actor</th>
            <th>Action</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Super Admin</td>
            <td>Approved portfolio: Pulse Education Platform</td>
            <td>1 hour ago</td>
          </tr>
          <tr>
            <td>Org Admin</td>
            <td>Updated application status: Interview</td>
            <td>3 hours ago</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
