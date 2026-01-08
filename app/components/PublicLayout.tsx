import Link from "next/link";
import styles from "./public-layout.module.css";

type PublicLayoutProps = {
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  titleClassName?: string;
  subtitleClassName?: string;
  topSlot?: React.ReactNode;
  children: React.ReactNode;
};

export default function PublicLayout({
  title,
  subtitle,
  align = "left",
  titleClassName,
  subtitleClassName,
  topSlot,
  children,
}: PublicLayoutProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>Convengers</div>
        <nav className={styles.nav}>
          <Link href="/company">Company</Link>
          <Link href="/references">References</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact" className={styles.cta}>
            Start a Project
          </Link>
          <Link href="/app" className={styles.portal}>
            Member Portal
          </Link>
        </nav>
      </header>

      {topSlot}

      {(title || subtitle) && (
        <section
          className={`${styles.hero} ${
            align === "center" ? styles.heroCentered : ""
          }`}
        >
          {title && (
            <h1 className={titleClassName ?? styles.heroTitle}>{title}</h1>
          )}
          {subtitle && (
            <p className={subtitleClassName ?? styles.heroSubtitle}>{subtitle}</p>
          )}
        </section>
      )}

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div>
          <div className={styles.brand}>Convengers</div>
          <p className={styles.muted}>
            A partner network for product teams who need speed and trust.
          </p>
        </div>
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.label}>Contact</div>
            <p>hello@convengers.studio</p>
            <p>Seoul · Singapore</p>
          </div>
          <div>
            <div className={styles.label}>Legal</div>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
          <div>
            <div className={styles.label}>Portal</div>
            <Link href="/app">Partner Login</Link>
            <Link href="/app">Admin Console</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
