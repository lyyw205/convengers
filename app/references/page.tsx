"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import styles from "./references.module.css";
import { referenceItems } from "../lib/sample-data";

export default function ReferencesPage() {
  const categories = ["전체", "AI Solution", "AI Image/Video", "LLM"] as const;
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>(
    categories[0]
  );
  const filtered = useMemo(
    () =>
      activeCategory === "전체"
        ? referenceItems
        : referenceItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <PublicLayout
      title="Project Portfolio"
      align="left"
      titleClassName={styles.pageTitle}
      topSlot={
        <div className={styles.banner}>
          <img
            className={styles.bannerImage}
            src="/banners/references-hero.png"
            alt="AI conversion banner"
          />
          <div className={styles.bannerOverlay} />
          <div className={styles.bannerText}>
            <div className={styles.bannerTitle}>브랜드를 위한 AI 매칭 솔루션</div>
            <div className={styles.bannerSubtitle}>
              당신의 캠페인에 완벽하게 어울리는 AI 전환을 도와드립니다.
            </div>
          </div>
        </div>
      }
    >
      <section className={styles.section}>
        <div className={styles.slider}>
          <div className={styles.sliderTrack}>
            {[...filtered, ...filtered].map((item, index) => (
              <Link
                key={`${item.slug}-${index}`}
                href={`/references/${item.slug}`}
                className={styles.cardGroup}
              >
                <article className={`${styles.card} ${styles.cardMedia}`}>
                  <div
                    className={styles.thumb}
                    style={
                      item.image ? { backgroundImage: `url(${item.image})` } : undefined
                    }
                  />
                </article>
                <div className={styles.cardFooter}>
                  <div className={styles.cardLabel}>{item.category}</div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {filtered.length === 0 && (
          <p className={styles.emptyState}>해당 카테고리의 레퍼런스가 없습니다.</p>
        )}
      </section>
    </PublicLayout>
  );
}
