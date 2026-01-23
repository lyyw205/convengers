import Link from "next/link";
import styles from "./portal.module.css";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/main" className={styles.brand}>
          Convengers
        </Link>
        <nav className={styles.nav}>
          <Link href="/portfolio">Gallery</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/networking">Networkings</Link>
          <Link href="/contact" className={styles.cta}>
            Contact us
          </Link>
          <Link href="/app/admin">Admin</Link>
          <Link href="/app/profile" className={styles.profileLink} aria-label="Profile">
            <span className={styles.profileAvatar}>JP</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
