"use client";

import { useState } from "react";
import styles from "../portal.module.css";
import { projectStatus } from "../../lib/sample-data";

export default function ProjectStatusPage() {
  const [selected, setSelected] = useState<{
    title: string;
    image: string;
  } | null>(null);

  const openModal = (item: { title: string; image: string }) => {
    setSelected(item);
  };

  const closeModal = () => {
    setSelected(null);
  };

  return (
    <div className={styles.statusPage}>
      <div className={styles.statusColumns}>
        <section className={styles.statusSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>진행중 프로젝트</h2>
              <p className={styles.sectionSubtitle}>핵심 현황만 빠르게 확인하세요.</p>
            </div>
          </div>
          <div className={styles.statusList}>
            {projectStatus.inProgress.map((item) => (
              <div key={item.id} className={styles.statusRow}>
                <div
                  className={styles.statusThumb}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className={styles.statusTitle}>{item.title}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.statusSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>진행 예정 프로젝트</h2>
              <p className={styles.sectionSubtitle}>지원 가능 프로젝트를 살펴보세요.</p>
            </div>
          </div>
          <div className={styles.statusList}>
            {projectStatus.upcoming.map((item) => (
              <div key={item.id} className={styles.statusRow}>
                <div
                  className={styles.statusThumb}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className={styles.statusTitle}>{item.title}</div>
                <button
                  className={styles.statusButton}
                  type="button"
                  onClick={() => openModal(item)}
                >
                  상세보기
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {selected && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.sectionTitle}>{selected.title}</h3>
                <p className={styles.sectionSubtitle}>진행 예정 프로젝트 상세</p>
              </div>
              <button className={styles.closeButton} type="button" onClick={closeModal}>
                닫기
              </button>
            </div>
            <div className={styles.modalBody}>
              <div
                className={styles.modalThumb}
                style={{ backgroundImage: `url(${selected.image})` }}
              />
              <div className={styles.modalCopy}>
                <p className={styles.muted}>
                  프로젝트 개요, 기간, 예산 등의 핵심 정보는 지원 단계에서 안내됩니다.
                </p>
                <button className={styles.primaryButton} type="button">
                  지원하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
