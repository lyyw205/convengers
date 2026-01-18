"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./postings.module.css";
import {
  latestArticles,
  popularContents,
  solpclubContents,
  solpclubTabs,
  trendContents,
  trendTabs,
} from "../../lib/sample-data";
import { getStoredPostings, seedStoredPostings } from "../../lib/posting-store";

type ContentItem = {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  date: string;
  category: string;
  href: string;
  image?: string;
};

const scrollByAmount = 320;
const defaultThumb = "/banners/references-hero.png";

const openInNewTab = (href: string) => ({
  href,
  target: "_blank",
  rel: "noreferrer",
});

function CarouselSection({
  title,
  subtitle,
  items,
  tabs,
  activeTab,
  onTabChange,
}: {
  title: string;
  subtitle?: string;
  items: ContentItem[];
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) {
      return;
    }
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollByAmount : scrollByAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.postingsSection}>
      <div className={styles.sectionHeaderRow}>
        <div>
          <h2 className={styles.sectionTitle}>{title}</h2>
          {subtitle ? <p className={styles.sectionSubtitle}>{subtitle}</p> : null}
        </div>
        <div className={styles.carouselControls}>
          <button
            type="button"
            className={styles.carouselButton}
            onClick={() => handleScroll("left")}
            aria-label={`${title} 이전`}
          >
            ←
          </button>
          <button
            type="button"
            className={styles.carouselButton}
            onClick={() => handleScroll("right")}
            aria-label={`${title} 다음`}
          >
            →
          </button>
        </div>
      </div>
      {tabs ? (
        <div className={styles.tabRow}>
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`${styles.tabButton} ${
                activeTab === tab ? styles.postingsTabActive : ""
              }`}
              onClick={() => onTabChange?.(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      ) : null}
      <div className={styles.carouselTrack} ref={carouselRef}>
        {items.map((item) => (
          <a key={item.id} className={styles.carouselCard} {...openInNewTab(item.href)}>
            <div
              className={styles.carouselThumb}
              style={{ backgroundImage: `url(${item.image ?? defaultThumb})` }}
            />
            <div className={styles.carouselCardBody}>
            <div className={styles.categoryRow}>
              <span className={styles.cardCategory}>{item.category}</span>
              <span className={styles.cardDate}>{item.date}</span>
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardExcerpt}>{item.excerpt}</p>
          </div>
        </a>
      ))}
    </div>
    </section>
  );
}

export default function PostingListPage() {
  const [activeTrendTab, setActiveTrendTab] = useState(trendTabs[0]);
  const [activeSolpTab, setActiveSolpTab] = useState(solpclubTabs[0]);
  const [storedPostings, setStoredPostings] = useState(() => getStoredPostings());

  useEffect(() => {
    seedStoredPostings();
    setStoredPostings(getStoredPostings());
  }, []);

  const managedPostings = useMemo(
    () =>
      storedPostings.map((posting) => ({
        id: posting.id,
        title: posting.title,
        excerpt: posting.excerpt,
        source: posting.source,
        date: posting.date,
        category: posting.category,
        href: posting.href,
        image: posting.image,
      })),
    [storedPostings]
  );

  const filteredTrends = useMemo(
    () =>
      activeTrendTab === "전체"
        ? trendContents
        : trendContents.filter((item) => item.category === activeTrendTab),
    [activeTrendTab]
  );

  const filteredSolpclub = useMemo(
    () =>
      activeSolpTab === "전체"
        ? solpclubContents
        : solpclubContents.filter((item) => item.category === activeSolpTab),
    [activeSolpTab]
  );

  return (
    <div className={styles.postingsPage}>
      {managedPostings.length > 0 ? (
        <CarouselSection
          title="관리 포스팅"
          subtitle="관리자가 등록한 최신 게시글"
          items={managedPostings}
        />
      ) : null}
      <section className={`${styles.postingsSection} ${styles.postingsSectionCard}`}>
        <div className={styles.sectionHeaderRow}>
          <div>
            <h2 className={styles.sectionTitle}>최신 ARTICLE</h2>
            <p className={styles.sectionSubtitle}>최근에 올라온 뉴스와 블로그</p>
          </div>
        </div>
        <div className={styles.latestGrid}>
          <a
            className={`${styles.articleCard} ${styles.featuredArticle}`}
            {...openInNewTab(latestArticles.featured.href)}
          >
            <div
              className={styles.articleThumb}
              style={{ backgroundImage: `url(${defaultThumb})` }}
            />
          <div className={styles.categoryRow}>
            <span className={styles.cardCategory}>{latestArticles.featured.category}</span>
            <span className={styles.cardDate}>{latestArticles.featured.date}</span>
          </div>
          <h3 className={styles.articleTitle}>{latestArticles.featured.title}</h3>
          <p className={styles.articleSummary}>{latestArticles.featured.summary}</p>
          <span className={styles.articleTag}>#{latestArticles.featured.category}</span>
        </a>
          <div className={styles.latestList}>
            {latestArticles.secondary.map((article) => (
              <a key={article.id} className={styles.articleRow} {...openInNewTab(article.href)}>
                <div
                  className={styles.articleRowThumb}
                  style={{ backgroundImage: `url(${defaultThumb})` }}
                />
                <div>
                  <div className={styles.categoryRow}>
                    <span className={styles.cardCategory}>{article.category}</span>
                    <span className={styles.cardDate}>{article.date}</span>
                  </div>
                  <h3 className={styles.articleRowTitle}>{article.title}</h3>
                  <p className={styles.articleRowSummary}>{article.summary}</p>
                  <span className={styles.articleTag}>#{article.category}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CarouselSection
        title="인기 컨텐츠"
        subtitle="가장 많이 읽힌 블로그 글"
        items={popularContents}
      />

      <CarouselSection
        title="함께 보면 좋은 트렌드 키워드"
        subtitle="최근 트렌드에서 주목받는 키워드"
        items={filteredTrends}
        tabs={trendTabs}
        activeTab={activeTrendTab}
        onTabChange={setActiveTrendTab}
      />

      <CarouselSection
        title="솔프클럽UP"
        subtitle="솔프클럽의 출판물, 강의, 이벤트"
        items={filteredSolpclub}
        tabs={solpclubTabs}
        activeTab={activeSolpTab}
        onTabChange={setActiveSolpTab}
      />
    </div>
  );
}
