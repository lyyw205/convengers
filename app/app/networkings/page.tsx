"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../../networking/networking.module.css";
import {
  getStoredNetworkings,
  seedStoredNetworkings,
  type StoredNetworking,
} from "../../lib/networking-store";
import { addNetworkingApplicant } from "../../lib/networking-applicant-store";

const sortByDateDesc = (items: { date: string }[]) => {
  return items
    .slice()
    .sort(
      (a, b) => Number(b.date.replace(".", "")) - Number(a.date.replace(".", ""))
    );
};

export default function NetworkingsPage() {
  const historyRef = useRef<HTMLDivElement | null>(null);
  const newsRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [networkings, setNetworkings] = useState<StoredNetworking[]>([]);
  const [selected, setSelected] = useState<StoredNetworking | null>(null);

  useEffect(() => {
    seedStoredNetworkings();
    setNetworkings(getStoredNetworkings());
  }, []);

  const categories = useMemo(() => {
    const order = ["Networking", "길드 모임", "Conference/포럼", "Hackathon"];
    return order.map((title) => ({
      id: title,
      title,
      items: networkings.filter((item) => item.category === title),
    }));
  }, [networkings]);

  const handleHistoryScroll = (direction: "prev" | "next") => {
    const container = historyRef.current;
    if (!container) {
      return;
    }
    const firstCard = container.querySelector<HTMLElement>(`.${styles.historyCard}`);
    const gapValue =
      parseFloat(window.getComputedStyle(container).columnGap) ||
      parseFloat(window.getComputedStyle(container).gap) ||
      0;
    const cardWidth = firstCard?.offsetWidth ?? container.clientWidth / 3;
    const offset = cardWidth + gapValue;
    container.scrollBy({ left: direction === "next" ? offset : -offset, behavior: "smooth" });
  };

  const handleNewsScroll = (categoryId: string, direction: "prev" | "next") => {
    const container = newsRefs.current[categoryId];
    if (!container) {
      return;
    }
    const firstCard = container.querySelector<HTMLElement>(`.${styles.newsCard}`);
    const gapValue =
      parseFloat(window.getComputedStyle(container).columnGap) ||
      parseFloat(window.getComputedStyle(container).gap) ||
      0;
    const cardWidth = firstCard?.offsetWidth ?? container.clientWidth / 3;
    const offset = cardWidth + gapValue;
    container.scrollBy({ left: direction === "next" ? offset : -offset, behavior: "smooth" });
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroTag}>SOLPCLUB NETWORKING</div>
        <h1 className={styles.heroTitle}>History</h1>
        <p className={styles.heroSubtitle}>
          지금까지 SOLPCLUB이 함께해 온 모임과 연결의 기록입니다.
        </p>
      </section>

      <section className={styles.history}>
        <div className={styles.historyHeader}>
          <h2 className={styles.historyHeading}>Recent Networkings</h2>
          <div className={styles.historyControls}>
            <button
              type="button"
              className={styles.historyButton}
              aria-label="이전 히스토리"
              onClick={() => handleHistoryScroll("prev")}
            >
              ←
            </button>
            <button
              type="button"
              className={styles.historyButton}
              aria-label="다음 히스토리"
              onClick={() => handleHistoryScroll("next")}
            >
              →
            </button>
          </div>
        </div>
        <div className={styles.historyTrack} ref={historyRef}>
          {networkings
            .slice()
            .reverse()
            .map((item) => (
              <article
                key={item.id}
                className={styles.historyCard}
                role="button"
                tabIndex={0}
                onClick={() => setSelected(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setSelected(item);
                  }
                }}
              >
                <div
                  className={styles.historyThumb}
                  style={{
                    backgroundImage: item.image ? `url(${item.image})` : undefined,
                  }}
                  aria-hidden="true"
                />
                <div className={styles.historyMeta}>
                  <span className={styles.historyCategory}>{item.category}</span>
                  <span className={styles.historyMetaRight}>
                    <span>{item.date}</span>
                    <span>{item.location}</span>
                  </span>
                </div>
                <h3 className={styles.historyTitle}>{item.title}</h3>
                <p className={styles.historyDescription}>{item.description}</p>
              </article>
            ))}
        </div>
      </section>

      <section className={styles.news}>
        <div className={styles.newsHeader}>
          <div>
            <div className={styles.sectionTag}>Networking Updates</div>
            <h2 className={styles.sectionTitle}>Upcoming & News</h2>
            <p className={styles.sectionSubtitle}>
              다가오는 네트워킹 일정과 공지, 협업 소식을 전합니다.
            </p>
          </div>
        </div>
        <div className={styles.newsCategories}>
          {categories.map((category) => (
            <section key={category.id} className={styles.newsCategory}>
              <div className={styles.newsCategoryHeader}>
                <h3 className={styles.newsCategoryTitle}>{category.title}</h3>
                <div className={styles.newsCategoryControls}>
                  <button
                    type="button"
                    className={styles.newsButton}
                    aria-label={`${category.title} 이전 소식`}
                    onClick={() => handleNewsScroll(category.id, "prev")}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className={styles.newsButton}
                    aria-label={`${category.title} 다음 소식`}
                    onClick={() => handleNewsScroll(category.id, "next")}
                  >
                    →
                  </button>
                </div>
              </div>
              <div
                className={styles.newsTrack}
                ref={(node) => {
                  newsRefs.current[category.id] = node;
                }}
              >
                {sortByDateDesc(category.items).map((item) => (
                  <article
                    key={`${category.id}-${item.id}`}
                    className={`${styles.newsCard} ${
                      item.status === "past" ? styles.newsCardPast : styles.newsCardUpcoming
                    }`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelected(item)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        setSelected(item);
                      }
                    }}
                  >
                    <div className={styles.newsDate}>{item.date}</div>
                    <h3 className={styles.newsTitle}>{item.title}</h3>
                    <p className={styles.newsDescription}>{item.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      {selected ? (
        <div className={styles.modalOverlay} onClick={() => setSelected(null)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>{selected.title}</h3>
                <p className={styles.modalMeta}>
                  {selected.category} · {selected.date} · {selected.location}
                </p>
              </div>
              <button className={styles.modalClose} type="button" onClick={() => setSelected(null)}>
                닫기
              </button>
            </div>
            <div className={styles.modalBody}>
              <div
                className={styles.modalThumb}
                style={{
                  backgroundImage: selected.image ? `url(${selected.image})` : undefined,
                }}
              />
              <p className={styles.modalCopy}>{selected.description}</p>
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.modalCta}
                type="button"
                onClick={() => {
                  addNetworkingApplicant({
                    networkingId: selected.id,
                    name: "Demo Member",
                    email: "member@convengers.studio",
                  });
                }}
              >
                참여 신청
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
