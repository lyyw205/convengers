import Link from "next/link";
import { notFound } from "next/navigation";
import ModalCloseButton from "../../../../components/ModalCloseButton";
import ModalRoot from "../../../../components/ModalRoot";
import styles from "../../../../public.module.css";
import { referenceItems } from "../../../../lib/sample-data";

type ReferenceModalPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ReferenceModalPage({ params }: ReferenceModalPageProps) {
  const { slug } = await params;
  const item = referenceItems.find((reference) => reference.slug === slug);

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
                <em>{`{Reference modal}`}</em>
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
              <ModalCloseButton className={styles.modalClose}>닫기</ModalCloseButton>
            </div>
          </div>
          <div className={styles.modalBody} data-modal-body>
            <div className={styles.modalImage}>
              <img className={styles.modalImageAsset} src={item.image} alt={item.title} />
            </div>
            <p className={styles.lead}>{item.summary}</p>
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
