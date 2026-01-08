import styles from "../../portal.module.css";

export default function AdminFinancePage() {
  return (
    <div className={styles.card}>
      <h2>Settlements</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Project</th>
            <th>Commission</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Private AI Workspace</td>
            <td>12%</td>
            <td>Pending payout</td>
          </tr>
          <tr>
            <td>Atlas Supply Chain</td>
            <td>10%</td>
            <td>Paid</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
