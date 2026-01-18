"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import styles from "./projects.module.css";
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
      subtitle="컨벤저스에서 진행한 프로젝트입니다"
      align="center"
      titleClassName={styles.pageTitle}
      subtitleClassName={styles.pageSubtitle}
    >
      <section className={styles.section}>
        <div className={styles.filterRow}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`${styles.filterButton} ${
                activeCategory === category ? styles.filterActive : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className={styles.grid}>
          {filtered.map((item) => (
            <article key={item.slug} className={`${styles.card} ${styles.cardMedia}`}>
              <div
                className={styles.thumb}
                style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
              >
                <span className={styles.thumbText}>{item.title}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.badge}>{item.category}</div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.lead}>{item.summary}</p>
                <div className={styles.meta}>
                  {item.year} · {item.stack.join(", ")}
                </div>
                <Link
                  className={styles.cardLink}
                  href={`/references/${item.slug}`}
                  scroll={false}
                >
                  View reference →
                </Link>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className={styles.emptyState}>해당 카테고리의 레퍼런스가 없습니다.</p>
        )}
      </section>
    </PublicLayout>
  );
}
