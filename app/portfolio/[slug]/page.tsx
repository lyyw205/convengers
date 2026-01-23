import Link from "next/link";
import { notFound } from "next/navigation";
import PublicLayout from "../../components/PublicLayout";
import styles from "./page.module.css";
import { portfolioItems } from "../../lib/sample-data";

type PortfolioPageProps = {
  params: { slug: string };
};

export default function PortfolioDetailPage({ params }: PortfolioPageProps) {
  const item = portfolioItems.find((portfolio) => portfolio.slug === params.slug);

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
          <div className={styles.badge}>Portfolio</div>
          <p className={styles.lead}>
            {item.summary} 포트폴리오 링크는 실제 제출된 외부 링크로 연결됩니다.
          </p>
          <div className={styles.meta}>Tech stack: {item.stack.join(", ")}</div>
          <div className={styles.meta}>Outcomes: {item.outcomes.join(" · ")}</div>
          <div className={styles.meta}>
            Portfolio link:{" "}
            {item.link ? (
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.link}
              </a>
            ) : (
              "미제출"
            )}
          </div>
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
            <h3>포트폴리오를 의뢰하고 싶나요?</h3>
            <p className={styles.lead}>
              간단한 의뢰서를 제출하면 72시간 내에 팀을 매칭합니다.
            </p>
            <Link className={styles.button} href="/contact">
              의뢰하러가기
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
