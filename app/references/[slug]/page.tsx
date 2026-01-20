import Link from "next/link";
import { notFound } from "next/navigation";
import PublicLayout from "../../components/PublicLayout";
import styles from "./page.module.css";
import { referenceItems } from "../../lib/sample-data";

type ReferencePageProps = {
  params: { slug: string };
};

export default function ReferenceDetailPage({ params }: ReferencePageProps) {
  const item = referenceItems.find((ref) => ref.slug === params.slug);

  if (!item) {
    notFound();
  }

  return (
    <PublicLayout
      title={item.title}
      subtitle={`${item.category} · ${item.year}`}
    >
      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.badge}>Scope</div>
          <p className={styles.lead}>
            {item.summary} The team delivered strategy alignment, design system
            updates, and a full-stack build ready for scale.
          </p>
          <div className={styles.meta}>Tech stack: {item.stack.join(", ")}</div>
          <div className={styles.meta}>Outcomes: {item.outcomes.join(" · ")}</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <div className={styles.card}>
            <div className={styles.badge}>Timeline</div>
            <ul className={styles.list}>
              <li>Week 1-2: discovery and alignment.</li>
              <li>Week 3-6: delivery sprints and stakeholder reviews.</li>
              <li>Week 7-8: launch support and handoff.</li>
            </ul>
          </div>
          <div className={styles.card}>
            <div className={styles.badge}>CTA</div>
            <h3>Want a similar outcome?</h3>
            <p className={styles.lead}>
              Submit a short brief and we will match a team within 72 hours.
            </p>
            <Link className={styles.button} href="/contact">
              Request a similar build
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
