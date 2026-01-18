"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import styles from "./references.module.css";
import { referenceItems } from "../lib/sample-data";

export default function ReferencesPage() {
  const categories = ["전체", "AI Creator", "AI Coding", "AI Branding", "AI Agent"] as const;
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>(
    categories[0]
  );
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const filtered = useMemo(
    () =>
      activeCategory === "전체"
        ? referenceItems
        : referenceItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );
  const filteredBySearch = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return filtered;
    }
    return filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term)
    );
  }, [filtered, searchTerm]);
  const columns = useMemo(() => {
    const output = [[], [], [], []] as typeof filteredBySearch[];
    filteredBySearch.forEach((item, index) => {
      output[index % 4].push(item);
    });
    return output;
  }, [filteredBySearch]);

  return (
    <PublicLayout
      align="left"
      topSlot={
        <div className={styles.banner}>
          <img
            className={styles.bannerImage}
            src="/banners/references-hero.png"
            alt="AI conversion banner"
          />
          <div className={styles.bannerOverlay} />
          <div className={styles.bannerText}>
            <div className={styles.bannerTitle}>SOLPCLUB 멤버들의 작품입니다.</div>
            <div className={styles.bannerSubtitle}>
              레퍼런스를 기반으로 원하는 작품을 의뢰하실 수 있습니다.
            </div>
          </div>
        </div>
      }
    >
      <section className={styles.section}>
        <div className={styles.filterRow}>
          <div className={styles.filterButtons}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`${styles.filterButton} ${
                  activeCategory === category ? styles.filterButtonActive : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className={styles.filterDivider} aria-hidden="true" />
          <form
            className={styles.searchForm}
            onSubmit={(event) => {
              event.preventDefault();
              setSearchTerm(searchInput);
            }}
          >
            <div className={styles.searchField}>
              <input
                className={styles.filterInput}
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="{검색어}"
                aria-label="{검색어}"
              />
              <button className={styles.searchButton} type="submit" aria-label="검색">
                <svg viewBox="0 0 24 24" role="img" focusable="false">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className={styles.referenceGrid}>
          {columns.map((column, columnIndex) => (
            <div key={`col-${columnIndex}`} className={styles.referenceColumn}>
              {column.map((item) => (
                <Link
                  key={item.slug}
                  href={`/references/${item.slug}`}
                  className={styles.gridCard}
                >
                  <div className={styles.gridMedia}>
                    <img
                      className={styles.gridImage}
                      src={item.image}
                      alt={item.title}
                    />
                    <span className={styles.gridBadge}>{item.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
        {filteredBySearch.length === 0 && (
          <p className={styles.emptyState}>해당 카테고리의 레퍼런스가 없습니다.</p>
        )}
      </section>
    </PublicLayout>
  );
}
