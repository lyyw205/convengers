"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
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
  const upcomingRef = useRef<HTMLDivElement | null>(null);
  const historyRef = useRef<HTMLDivElement | null>(null);
  const newsRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [networkings, setNetworkings] = useState<StoredNetworking[]>([]);
  const [selected, setSelected] = useState<StoredNetworking | null>(null);

  useEffect(() => {
    seedStoredNetworkings();
    setNetworkings(getStoredNetworkings());
  }, []);

  const upcomingItems = useMemo(
    () =>
      networkings
        .filter((item) => item.status === "upcoming")
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 5),
    [networkings]
  );

  const categories = useMemo(() => {
    const order = ["Networking", "길드 모임", "Conference/포럼", "Hackathon"];
    return order.map((title) => ({
      id: title,
      title,
      items: networkings.filter((item) => item.category === title),
    }));
  }, [networkings]);
  const primaryNewsId = categories[0]?.id;

  const handleUpcomingScroll = (direction: "prev" | "next") => {
    const container = upcomingRef.current;
    if (!container) {
      return;
    }
    const firstCard = container.querySelector<HTMLElement>(`.${styles.upcomingCard}`);
    const gapValue =
      parseFloat(window.getComputedStyle(container).columnGap) ||
      parseFloat(window.getComputedStyle(container).gap) ||
      0;
    const cardWidth = firstCard?.offsetWidth ?? container.clientWidth / 2;
    const offset = cardWidth + gapValue;
    container.scrollBy({
      left: direction === "next" ? offset : -offset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = upcomingRef.current;
    if (!container || upcomingItems.length === 0) {
      return;
    }
    const intervalId = window.setInterval(() => {
      const firstCard = container.querySelector<HTMLElement>(`.${styles.upcomingCard}`);
      const gapValue =
        parseFloat(window.getComputedStyle(container).columnGap) ||
        parseFloat(window.getComputedStyle(container).gap) ||
        0;
      const cardWidth = firstCard?.offsetWidth ?? container.clientWidth / 2;
      const offset = cardWidth + gapValue;
      container.scrollBy({ left: offset, behavior: "smooth" });
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [upcomingItems.length]);

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
        <h1 className={styles.heroTitle}>Upcomings</h1>
        <p className={styles.heroSubtitle}>
          앞으로 다가올 네트워킹에 함께해보세요.
        </p>
      </section>

      <section className={styles.history}>
        <div className={styles.upcoming}>
          <div className={styles.upcomingTrackWrap}>
            <button
              type="button"
              className={`${styles.historyButton} ${styles.upcomingNav} ${styles.upcomingPrev}`}
              aria-label="이전 업커밍 네트워킹"
              onClick={() => handleUpcomingScroll("prev")}
            >
              &lt;
            </button>
            <div className={styles.upcomingTrack} ref={upcomingRef}>
            {upcomingItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.upcomingCard}
                aria-label={`${item.title} 상세 보기`}
                onClick={() => setSelected(item)}
              >
                <div
                  className={`${styles.upcomingThumb} ${
                    item.image ? "" : styles.upcomingThumbPlaceholder
                  }`}
                >
                  {item.image ? <img src={item.image} alt={item.title} /> : null}
                </div>
              </button>
            ))}
            </div>
            <button
              type="button"
              className={`${styles.historyButton} ${styles.upcomingNav} ${styles.upcomingNext}`}
              aria-label="다음 업커밍 네트워킹"
              onClick={() => handleUpcomingScroll("next")}
            >
              &gt;
            </button>
          </div>
        </div>
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
          <div className={styles.newsHeaderText}>
            <h2 className={styles.sectionTitle}>News</h2>
            <p className={styles.sectionSubtitle}>SOLPCLUB 및 AI 관련 소식입니다.</p>
          </div>
          <div className={styles.historyControls}>
            <button
              type="button"
              className={styles.historyButton}
              aria-label="이전 소식"
              onClick={() => primaryNewsId && handleNewsScroll(primaryNewsId, "prev")}
            >
              ←
            </button>
            <button
              type="button"
              className={styles.historyButton}
              aria-label="다음 소식"
              onClick={() => primaryNewsId && handleNewsScroll(primaryNewsId, "next")}
            >
              →
            </button>
          </div>
        </div>
        <div className={styles.newsCategories}>
          {categories.slice(0, 1).map((category) => (
            <section key={category.id} className={styles.newsCategory}>
              <div className={styles.newsCategoryHeader}>
                <div />
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
                    <div className={styles.newsMetaRow}>
                      <div className={styles.newsDate}>{item.date}</div>
                      <span className={styles.newsCategoryTag}>{category.title}</span>
                    </div>
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
