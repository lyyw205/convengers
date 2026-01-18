import styles from "../admin.module.css";

const mockTags = [
  { name: "PROJECT_VIEW", description: "Access to project dashboards", usage: 12 },
  { name: "POSTING_VIEW", description: "Access to postings and applicants", usage: 9 },
  { name: "COMMUNITY_VIEW", description: "Community and applications access", usage: 18 },
  { name: "PROFILE_VIEW", description: "Profile management access", usage: 22 },
  { name: "PORTFOLIO_VIEW", description: "Portfolio uploads and reviews", usage: 15 },
  { name: "RATINGS_VIEW", description: "Ratings and feedback access", usage: 6 },
  { name: "BILLING_VIEW", description: "Billing and settlements access", usage: 3 },
  { name: "ADMIN", description: "Admin console access", usage: 2 },
];

const mockUsers = [
  { name: "Eunji Park", email: "eunji@convengers.studio", tags: ["PROJECT_VIEW", "COMMUNITY_VIEW"] },
  { name: "Minho Lee", email: "minho@convengers.studio", tags: ["PROJECT_VIEW", "POSTING_VIEW"] },
  { name: "Jisoo Kim", email: "jisoo@convengers.studio", tags: ["PROFILE_VIEW", "PORTFOLIO_VIEW"] },
  { name: "Daniel Choi", email: "daniel@convengers.studio", tags: ["ADMIN", "BILLING_VIEW"] },
];

export default function AdminTagsPage() {
  // TODO: Replace mock data with DB-backed tags and user tag assignments.
  return (
    <div className={styles.dashboard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Tag settings</h2>
          <p className={styles.sectionSubtitle}>
            Manage access tags and assignments for portal navigation.
          </p>
        </div>
      </div>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h3>Tag catalog</h3>
          <p className={styles.muted}>Mock list. Add/remove actions will be wired later.</p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Description</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              {mockTags.map((tag) => (
                <tr key={tag.name}>
                  <td>{tag.name}</td>
                  <td>{tag.description}</td>
                  <td>{tag.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.card}>
          <h3>User tag assignments</h3>
          <p className={styles.muted}>Mock list for validation only.</p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.email}>
                  <td>
                    <strong>{user.name}</strong>
                    <div className={styles.muted}>{user.email}</div>
                  </td>
                  <td>
                    <div className={styles.tagRow}>
                      {user.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
