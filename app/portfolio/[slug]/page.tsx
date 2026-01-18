import { notFound } from "next/navigation";
import PublicLayout from "../../components/PublicLayout";
import styles from "../../public.module.css";
import { portfolioItems } from "../../lib/sample-data";

type PortfolioDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const item = portfolioItems.find((portfolio) => portfolio.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <PublicLayout title={item.title} subtitle={`${item.category} · ${item.year}`}>
      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.badge}>
            <em>{`{Portfolio detail}`}</em>
          </div>
          <p className={styles.lead}>{item.summary}</p>
          <div className={styles.meta}>
            <em>{`{Tech stack}`}</em> {item.stack.join(", ")}
          </div>
          <div className={styles.meta}>
            <em>{`{Outcomes}`}</em> {item.outcomes.join(" · ")}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
