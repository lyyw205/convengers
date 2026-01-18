"use client";

import { useRef } from "react";
import NetworkingLayout from "./NetworkingLayout";
import styles from "./networking.module.css";

const historyItems = [
  {
    title: "SOLPCLUB 프리런치 밋업",
    date: "2024.05",
    location: "Seoul",
    description: "초기 멤버들과 네트워크 방향을 공유한 첫 모임입니다.",
    category: "NETWORKING",
  },
  {
    title: "AI 브랜드 워크숍",
    date: "2024.07",
    location: "Seoul",
    description: "브랜딩과 AI 제작 워크플로를 중심으로 인사이트를 나눴습니다.",
    category: "길드모임",
  },
  {
    title: "Creator & Agent Roundtable",
    date: "2024.10",
    location: "Singapore",
    description: "글로벌 파트너들과 협업 방식에 대해 토론했습니다.",
    category: "NETWORKING",
  },
  {
    title: "SOLPCLUB 네트워킹 나이트",
    date: "2024.12",
    location: "Seoul",
    description: "멤버십 교류와 협업 아이디어를 공유한 연말 모임입니다.",
    category: "NETWORKING",
  },
  {
    title: "AI 크리에이터 쇼케이스",
    date: "2025.01",
    location: "Busan",
    description: "AI 기반 콘텐츠 제작 사례를 중심으로 한 쇼케이스입니다.",
    category: "길드모임",
  },
  {
    title: "Partnership Sprint",
    date: "2025.02",
    location: "Tokyo",
    description: "해외 파트너와의 합동 스프린트를 통해 협업 방식을 실험했습니다.",
    category: "NETWORKING",
  },
];

const newsCategories = [
  {
    id: "networking",
    title: "Networking",
    items: [
      {
        title: "서울 커넥션 나이트",
        date: "2025.02",
        description:
          "초기 파트너를 위한 네트워킹 모임을 준비합니다. 프로젝트 경험과 니즈를 공유합니다.",
        status: "past",
      },
      {
        title: "오픈 미팅 라운드",
        date: "2025.03",
        description:
          "새로운 멤버를 위한 소개 세션을 진행합니다. 협업 가능한 분야를 빠르게 확인합니다.",
        status: "past",
      },
      {
        title: "지역 챕터 교류",
        date: "2025.04",
        description:
          "지역별 파트너가 모여 협업 사례를 나눕니다. 현지 파트너십을 연결합니다.",
        status: "upcoming",
      },
      {
        title: "SOLPCLUB 리셉션",
        date: "2025.05",
        description:
          "커뮤니티 확장을 위한 리셉션을 준비 중입니다. 초청자 중심으로 진행합니다.",
        status: "upcoming",
      },
    ],
  },
  {
    id: "guild",
    title: "길드 모임",
    items: [
      {
        title: "AI Creator 길드",
        date: "2025.02",
        description:
          "크리에이터 중심의 제작 워크플로와 툴셋을 공유합니다. 제작 사례 발표가 포함됩니다.",
        status: "past",
      },
      {
        title: "AI Coding 길드",
        date: "2025.03",
        description:
          "프로덕트 개발 파트너들이 모여 실전 개발 노하우를 나눕니다. 커리큘럼을 함께 정리합니다.",
        status: "past",
      },
      {
        title: "AI Branding 길드",
        date: "2025.04",
        description:
          "브랜딩 프로젝트의 인사이트를 공유합니다. 고객 커뮤니케이션 전략을 정리합니다.",
        status: "upcoming",
      },
      {
        title: "AI Agent 길드",
        date: "2025.05",
        description:
          "에이전트 설계와 운영 방식을 공유합니다. 실무 자동화 사례를 다룹니다.",
        status: "upcoming",
      },
    ],
  },
  {
    id: "conference",
    title: "Conference/포럼",
    items: [
      {
        title: "AI 브랜드 포럼",
        date: "2025.03",
        description:
          "브랜드 협업 사례를 중심으로 발표와 패널 토크를 진행합니다. 파트너 발표가 포함됩니다.",
        status: "past",
      },
      {
        title: "미디어 & 커머스 컨퍼런스",
        date: "2025.04",
        description:
          "미디어와 커머스 영역의 AI 활용 사례를 공유합니다. 현장 네트워킹이 이어집니다.",
        status: "upcoming",
      },
      {
        title: "솔루션 쇼케이스",
        date: "2025.05",
        description:
          "파트너 솔루션을 소개하는 쇼케이스를 마련합니다. 데모 세션과 부스가 운영됩니다.",
        status: "upcoming",
      },
      {
        title: "글로벌 파트너 포럼",
        date: "2025.06",
        description:
          "글로벌 협업 사례를 중심으로 세션을 진행합니다. 해외 파트너와 공동 발표합니다.",
        status: "upcoming",
      },
    ],
  },
  {
    id: "hackathon",
    title: "Hackathon",
    items: [
      {
        title: "AI Sprint Hackathon",
        date: "2025.03",
        description:
          "제품 아이디어를 빠르게 검증하는 해커톤을 진행합니다. 멘토링 세션이 포함됩니다.",
        status: "past",
      },
      {
        title: "Automation Lab",
        date: "2025.04",
        description:
          "업무 자동화 과제를 중심으로 팀을 구성합니다. 실전 적용 과제를 진행합니다.",
        status: "upcoming",
      },
      {
        title: "Creator Tech Jam",
        date: "2025.05",
        description:
          "콘텐츠 제작을 위한 AI 기술을 실험합니다. 프로토타이핑 중심으로 운영됩니다.",
        status: "upcoming",
      },
      {
        title: "Agent Challenge",
        date: "2025.06",
        description:
          "에이전트 기반 문제 해결을 주제로 진행합니다. 우수 사례는 별도 발표합니다.",
        status: "upcoming",
      },
      {
        title: "Community Build Day",
        date: "2025.07",
        description:
          "커뮤니티와 함께하는 빌드 데이를 진행합니다. 간단한 데모와 리뷰 세션이 포함됩니다.",
        status: "upcoming",
      },
    ],
  },
];

const sortByDateDesc = (items: typeof newsCategories[number]["items"]) => {
  return items
    .slice()
    .sort(
      (a, b) =>
        Number(b.date.replace(".", "")) - Number(a.date.replace(".", ""))
    );
};

export default function NetworkingPage() {
  const historyRef = useRef<HTMLDivElement | null>(null);
  const newsRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
    <NetworkingLayout>
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
          {historyItems
            .slice()
            .reverse()
            .map((item) => (
              <article key={item.title} className={styles.historyCard}>
                <div className={styles.historyThumb} aria-hidden="true" />
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
          {newsCategories.map((category) => (
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
                    key={`${category.id}-${item.title}`}
                    className={`${styles.newsCard} ${
                      item.status === "past" ? styles.newsCardPast : styles.newsCardUpcoming
                    }`}
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
    </NetworkingLayout>
  );
}
