import Link from "next/link";
import styles from "../portal.module.css";

export default function AdminHomePage() {
  return (
    <div className={styles.card}>
      <div className={styles.pill}>Admin</div>
      <h2>Operations console</h2>
      <p className={styles.muted}>
        Manage partners, postings, leads, references, and settlements.
      </p>
      <ul className={styles.list}>
        <li>
          <Link href="/app/admin/postings">Postings &amp; projects</Link>
        </li>
        <li>
          <Link href="/app/admin/applications">Applications</Link>
        </li>
        <li>
          <Link href="/app/admin/leads">Leads</Link>
        </li>
        <li>
          <Link href="/app/admin/partners">Partner approvals</Link>
        </li>
        <li>
          <Link href="/app/admin/references">Reference review</Link>
        </li>
        <li>
          <Link href="/app/admin/finance">Settlements</Link>
        </li>
        <li>
          <Link href="/app/admin/audit">Audit log</Link>
        </li>
      </ul>
    </div>
  );
}
