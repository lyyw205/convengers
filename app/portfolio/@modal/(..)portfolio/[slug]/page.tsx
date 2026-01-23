import Link from "next/link";
import { notFound } from "next/navigation";
import ModalCloseButton from "../../../../components/ModalCloseButton";
import ModalRoot from "../../../../components/ModalRoot";
import styles from "./page.module.css";
import { portfolioItems } from "../../../../lib/sample-data";

type PortfolioModalPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PortfolioModalPage({ params }: PortfolioModalPageProps) {
  const { slug } = await params;
  const item = portfolioItems.find((portfolio) => portfolio.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <ModalRoot>
      <div className={styles.modalOverlay}>
        <div className={styles.modalCard} role="dialog" aria-modal="true">
          <div className={styles.modalHeader}>
            <div>
              <div className={styles.badge}>
                <em>{`{Portfolio modal}`}</em>
              </div>
              <h2 className={styles.modalTitle}>{item.title}</h2>
              <p className={styles.modalSubtitle}>
                {item.category} · {item.year}
              </p>
            </div>
            <div className={styles.modalActions}>
              <Link href="/contact" className={styles.modalCta}>
                프로젝트 의뢰하러가기
              </Link>
              <ModalCloseButton className={styles.modalClose}>
                닫기
              </ModalCloseButton>
            </div>
          </div>
          <div className={styles.modalBody} data-modal-body>
            <div className={styles.modalImage}>
              <em>{`{대표 이미지 영역}`}</em>
            </div>
            <p className={styles.lead}>{item.summary}</p>
            <div className={styles.modalCopy}>
              <em>{`{포트폴리오는 외부 링크로 제출됩니다.}`}</em>
            </div>
            <div className={styles.modalMeta}>
              <em>{`{Portfolio link}`}</em>{" "}
              {item.link ? (
                <a href={item.link} target="_blank" rel="noreferrer">
                  {item.link}
                </a>
              ) : (
                "미제출"
              )}
            </div>
            <div className={styles.modalMeta}>
              <em>{`{Tech stack}`}</em> {item.stack.join(", ")}
            </div>
            <div className={styles.modalMeta}>
              <em>{`{Outcomes}`}</em> {item.outcomes.join(" · ")}
            </div>
          </div>
        </div>
      </div>
    </ModalRoot>
  );
}
