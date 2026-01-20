import styles from "./page.module.css";

const mockTags = [
  "PROJECT_VIEW",
  "POSTING_VIEW",
  "COMMUNITY_VIEW",
  "PROFILE_VIEW",
  "PORTFOLIO_VIEW",
  "RATINGS_VIEW",
  "BILLING_VIEW",
  "ADMIN",
];

const mockUsers = [
  {
    name: "Eunji Park",
    email: "eunji@convengers.studio",
    role: "Partner",
    tags: ["PROJECT_VIEW", "COMMUNITY_VIEW", "PROFILE_VIEW"],
  },
  {
    name: "Minho Lee",
    email: "minho@convengers.studio",
    role: "Contributor",
    tags: ["PROJECT_VIEW", "POSTING_VIEW"],
  },
  {
    name: "Jisoo Kim",
    email: "jisoo@convengers.studio",
    role: "Creator",
    tags: ["PROFILE_VIEW", "PORTFOLIO_VIEW", "RATINGS_VIEW"],
  },
  {
    name: "Daniel Choi",
    email: "daniel@convengers.studio",
    role: "Admin",
    tags: ["ADMIN", "BILLING_VIEW", "PROJECT_VIEW"],
  },
];

export default function AdminUsersPage() {
  // TODO: Replace mock data with DB-backed users and permissions.
  return (
    <div className={styles.dashboard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>User permissions</h2>
          <p className={styles.sectionSubtitle}>
            Assign access tags and roles. (Mock UI for validation only)
          </p>
        </div>
      </div>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h3>Users</h3>
          <p className={styles.muted}>
            Search/filter and tag assignment will be wired to DB later.
          </p>
          <div className={styles.searchRow}>
            <input className={styles.input} placeholder="Search by name or email" />
            <select className={styles.select}>
              <option value="">Role filter</option>
              <option>Partner</option>
              <option>Contributor</option>
              <option>Creator</option>
              <option>Admin</option>
            </select>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
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
                  <td>{user.role}</td>
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

        <div className={styles.card}>
          <h3>Assign tags</h3>
          <p className={styles.muted}>Mock form. Will save to DB later.</p>
          <div className={styles.formStack}>
            <label className={styles.label}>User</label>
            <select className={styles.select}>
              {mockUsers.map((user) => (
                <option key={user.email}>{user.name}</option>
              ))}
            </select>
            <label className={styles.label}>Role</label>
            <select className={styles.select}>
              <option>Partner</option>
              <option>Contributor</option>
              <option>Creator</option>
              <option>Admin</option>
            </select>
            <label className={styles.label}>Tags</label>
            <div className={styles.checkboxGrid}>
              {mockTags.map((tag) => (
                <label key={tag} className={styles.checkboxItem}>
                  <input type="checkbox" defaultChecked={tag === "PROJECT_VIEW"} />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
            <div className={styles.buttonRow}>
              <button className={styles.secondaryButton} type="button">
                Reset
              </button>
              <button className={styles.primaryButton} type="button">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
