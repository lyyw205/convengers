import styles from "./page.module.css";

export default function AdminLeadsPage() {
  return (
    <div className={styles.card}>
      <h2>Leads</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Lead</th>
            <th>Source</th>
            <th>Assigned</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lead #209</td>
            <td>Pulse Education Platform</td>
            <td>Unassigned</td>
          </tr>
          <tr>
            <td>Lead #210</td>
            <td>Atlas Supply Chain</td>
            <td>Assigned to Min Seo</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
