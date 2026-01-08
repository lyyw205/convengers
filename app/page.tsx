import Link from "next/link";
import PublicLayout from "./components/PublicLayout";
import styles from "./public.module.css";
import { referenceItems } from "./lib/sample-data";

export default function Home() {
  return (
    <PublicLayout
      title="Convengers builds trusted teams for product delivery."
      subtitle="A public portfolio of verified builds and a private partner network to match the right specialists to every project."
      align="center"
    >
      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.badge}>Process</div>
          <h2 className={styles.headline}>We curate the right partner mix.</h2>
          <p className={styles.lead}>
            Every project is screened, scoped, and matched with a vetted
            specialist pod. We publish the proof so clients can trust the
            output before they talk to sales.
          </p>
          <div className={styles.buttonRow}>
            <Link className={`${styles.button} ${styles.buttonPrimary}`} href="/contact">
              Start a project
            </Link>
            <Link className={styles.button} href="/references">
              View references
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.badge}>Verified builds</div>
            <strong>86</strong>
          </div>
          <div className={styles.statCard}>
            <div className={styles.badge}>Partner rating</div>
            <strong>4.8 / 5</strong>
          </div>
          <div className={styles.statCard}>
            <div className={styles.badge}>Average kickoff</div>
            <strong>9 days</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {referenceItems.map((item) => (
            <article key={item.slug} className={`${styles.card} ${styles.cardMedia}`}>
              <div
                className={styles.thumb}
                style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
              >
                <span className={styles.thumbText}>{item.title}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.badge}>{item.category}</div>
                <h3>{item.title}</h3>
                <p className={styles.lead}>{item.summary}</p>
                <div className={styles.meta}>{item.outcomes.join(" · ")}</div>
                <Link href={`/references/${item.slug}`}>See details →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.badge}>Partner network</div>
          <h2 className={styles.headline}>Operate with clarity.</h2>
          <ul className={styles.list}>
            <li>Role-based access controls across all submissions.</li>
            <li>Weekly portfolio releases keep the public feed curated.</li>
            <li>Admin reviews tie leads directly to the right owner.</li>
          </ul>
          <div className={styles.buttonRow}>
            <Link className={`${styles.button} ${styles.buttonPrimary}`} href="/app">
              Enter member portal
            </Link>
            <Link className={styles.button} href="/company">
              About Convengers
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
