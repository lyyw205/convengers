import Link from "next/link";
import styles from "./portal.module.css";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <h2>Convengers</h2>
        <div className={styles.nav}>
          <Link href="/app">Dashboard</Link>
          <Link href="/app/projects">Projects</Link>
          <Link href="/app/postings">Postings</Link>
          <Link href="/app/applications">Community</Link>
          <Link href="/app/profile">Profile</Link>
          <Link href="/app/portfolio">Portfolio</Link>
          <Link href="/app/ratings">Ratings</Link>
          <Link href="/app/billing">Billing</Link>
          <Link href="/app/admin">Admin</Link>
        </div>
        <div>
          <div className={styles.pill}>Status</div>
          <p className={styles.muted}>Member tier: A</p>
          <p className={styles.muted}>Next publish: 4 days</p>
        </div>
        <Link className={styles.publicCta} href="/main">
          Public Site
        </Link>
      </aside>
      <section className={styles.content}>
        <div className={styles.topbar}>
          <div>
            <strong>Member Portal</strong>
            <p className={styles.muted}>Private partner operations</p>
          </div>
          <div className={styles.pill}>Authenticated</div>
        </div>
        {children}
      </section>
    </div>
  );
}
