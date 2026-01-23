import Link from "next/link";
import styles from "./portal.module.css";
import AppHeader from "./AppHeader";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Replace with real session auth once the login system is decided.
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.authCard}>
            <h1 className={styles.authTitle}>로그인이 필요합니다.</h1>
            <p className={styles.muted}>
              멤버 전용 페이지입니다. 인증 방식은 확정 후 연결할 예정입니다.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <AppHeader />

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <div className={styles.brand}>Convengers</div>
            <p className={styles.muted}>
              Member portal for operations, projects, and collaboration.
            </p>
          </div>
          <div className={styles.footerGrid}>
            <div>
              <div className={styles.label}>Portal</div>
              <Link href="/app/profile">Profile</Link>
            </div>
            <div>
              <div className={styles.label}>Operations</div>
              <Link href="/projects">Projects</Link>
            </div>
            <div>
              <div className={styles.label}>Admin</div>
              <Link href="/app/admin">Admin Console</Link>
              <Link href="/app/billing">Billing</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
