import styles from "../portal.module.css";

export default function BillingPage() {
  return (
    <div className={styles.card}>
      <h2>Billing &amp; settlements</h2>
      <p className={styles.muted}>
        Review project payouts, commission rates, and invoices.
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Project</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Atlas Supply Chain</td>
            <td>Paid</td>
            <td>$8,400</td>
          </tr>
          <tr>
            <td>Private AI Workspace</td>
            <td>Pending</td>
            <td>$3,200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
