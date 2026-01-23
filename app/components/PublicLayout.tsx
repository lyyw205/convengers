import Link from "next/link";
import styles from "./public-layout.module.css";

type PublicLayoutProps = {
  title?: string;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  titleClassName?: string;
  subtitleClassName?: string;
  heroClassName?: string;
  heroInnerClassName?: string;
  heroBackground?: React.ReactNode;
  ctaSlot?: React.ReactNode;
  topSlot?: React.ReactNode;
  children: React.ReactNode;
};

export default function PublicLayout({
  title,
  subtitle,
  align = "left",
  titleClassName,
  subtitleClassName,
  heroClassName,
  heroInnerClassName,
  heroBackground,
  ctaSlot,
  topSlot,
  children,
}: PublicLayoutProps) {
  return (
    <div className={styles.page}>
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

      {topSlot}

      {(title || subtitle) && (
        <section
          className={`${styles.hero} ${
            align === "center" ? styles.heroCentered : ""
          } ${heroClassName ?? ""}`}
        >
          {heroBackground}
          <div className={`${styles.heroInner} ${heroInnerClassName ?? ""}`}>
            {title && (
              <h1 className={titleClassName ?? styles.heroTitle}>{title}</h1>
            )}
            {subtitle && (
              <p className={subtitleClassName ?? styles.heroSubtitle}>{subtitle}</p>
            )}
            {ctaSlot && <div className={styles.heroActions}>{ctaSlot}</div>}
          </div>
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
