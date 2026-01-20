import styles from "./page.module.css";

export default function AdminPartnersPage() {
  return (
    <div className={styles.card}>
      <h2>Partner approvals</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Partner</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vanta Labs</td>
            <td>Org</td>
            <td>Pending review</td>
          </tr>
          <tr>
            <td>Jin Park</td>
            <td>Member</td>
            <td>Approved</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
