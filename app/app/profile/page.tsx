"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./page.module.css";
import { profileTimelines } from "../../lib/sample-data";

export default function ProfilePage() {
  const tabs = [
    { key: "in_progress", label: "진행중" },
    { key: "done", label: "진행완료" },
  ] as const;
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["key"]>("in_progress");
  const filteredTimelines = useMemo(
    () => profileTimelines.filter((item) => item.status === activeTab),
    [activeTab]
  );
  const skills = ["AI Agent", "AI Coding", "LLM", "RAG", "Product Strategy"];
  const categories = ["AI Solution", "AI Image/Video", "Web Development"];
  const portfolios = [
    { title: "AI 고객지원 포털 리뉴얼", href: "/references/ai-support-portal" },
    { title: "커머스 추천 엔진 대시보드", href: "/references/commerce-reco" },
    { title: "AI 브랜딩 자동화 웹앱", href: "/references/ai-branding" },
  ];
  const verificationBadges = ["검증 완료", "리뷰 12", "ADMIN", "PROJECT_VIEW"];

  return (
    <div className={styles.profilePage}>
      <div className={styles.card}>
        <h2>내 정보</h2>
        <p className={styles.muted}>
          기본 정보와 가용 시간을 관리하세요.
        </p>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>이름</th>
              <td>진 박</td>
            </tr>
            <tr>
              <th>역할</th>
              <td>프로덕트 전략</td>
            </tr>
            <tr>
              <th>가용 시간</th>
              <td>주 20시간</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.card}>
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>스킬/카테고리</h3>
            <p className={styles.sectionSubtitle}>주요 전문 영역과 선호 카테고리입니다.</p>
          </div>
        </div>
        <div className={styles.tagGroup}>
          <div className={styles.tagLabel}>스킬</div>
          <div className={styles.tagRow}>
            {skills.map((skill) => (
              <span key={skill} className={styles.tag}>
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.tagGroup}>
          <div className={styles.tagLabel}>카테고리</div>
          <div className={styles.tagRow}>
            {categories.map((category) => (
              <span key={category} className={styles.tag}>
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>대표 포트폴리오</h3>
            <p className={styles.sectionSubtitle}>매칭에 활용되는 주요 작업입니다.</p>
          </div>
        </div>
        <ul className={styles.list}>
          {portfolios.map((item) => (
            <li key={item.href} className={styles.listItem}>
              <Link href={item.href}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.card}>
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>검증/권한</h3>
            <p className={styles.sectionSubtitle}>현재 상태와 접근 권한입니다.</p>
          </div>
        </div>
        <div className={styles.pillRow}>
          {verificationBadges.map((badge) => (
            <span key={badge} className={styles.pill}>
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryRow}>
            <div className={`${styles.summaryIcon} ${styles.iconBlue}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className={styles.summaryLabel}>진행한 프로젝트</div>
              <div className={styles.summaryValue}>8</div>
            </div>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryRow}>
            <div className={`${styles.summaryIcon} ${styles.iconGreen}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 3h12v18H6z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 7h8M8 11h8M8 15h5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className={styles.summaryLabel}>지원한 프로젝트</div>
              <div className={styles.summaryValue}>5</div>
            </div>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryRow}>
            <div className={`${styles.summaryIcon} ${styles.iconOrange}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5h16v10H7l-3 3z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className={styles.summaryLabel}>받은 제안</div>
              <div className={styles.summaryValue}>3</div>
            </div>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryRow}>
            <div className={`${styles.summaryIcon} ${styles.iconPurple}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 4l2.2 4.5 5 .7-3.6 3.4.9 5-4.5-2.4-4.5 2.4.9-5L4.8 9.2l5-.7z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className={styles.summaryLabel}>관심 프로젝트</div>
              <div className={styles.summaryValue}>4</div>
            </div>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryRow}>
            <div className={`${styles.summaryIcon} ${styles.iconTeal}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 6h10l4 4v8H5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M15 6v4h4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className={styles.summaryLabel}>내 포트폴리오</div>
              <div className={styles.summaryValue}>6</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.timelineSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>프로젝트 타임라인</h3>
            <p className={styles.sectionSubtitle}>진행중 프로젝트의 주요 일정</p>
          </div>
        </div>
        <div className={styles.timelineTabs}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`${styles.tabButton} ${
                activeTab === tab.key ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={styles.timelineList}>
          {filteredTimelines.map((timeline) => (
            <div key={timeline.id} className={styles.timelineCard}>
              <div className={styles.timelineTitle}>{timeline.title}</div>
              <div className={styles.timelineTrackHorizontal}>
                {timeline.stages.map((stage, index) => (
                  <div
                    key={`${timeline.id}-${stage.label}`}
                    className={styles.timelineNodeHorizontal}
                  >
                    <div className={styles.timelineBadge}>{index + 1}</div>
                    <div className={styles.timelineLabel}>{stage.label}</div>
                    <div className={styles.timelineDate}>{stage.range}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {filteredTimelines.length === 0 && (
            <div className={styles.emptyState}>해당 상태의 프로젝트가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
