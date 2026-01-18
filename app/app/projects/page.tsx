"use client";

import { useState } from "react";
import styles from "../portal.module.css";
import { projectStatus } from "../../lib/sample-data";

export default function ProjectStatusPage() {
  const [selected, setSelected] = useState<{
    title: string;
    image: string;
  } | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [draftCategories, setDraftCategories] = useState<string[]>([]);

  const aiCategories = ["전체", "AI Solution", "AI Image/Video", "LLM"];

  const filteredProjects =
    selectedCategories.length === 0
      ? projectStatus.upcoming
      : projectStatus.upcoming.filter((item) =>
          item.category ? selectedCategories.includes(item.category) : false
        );

  const toggleCategory = (category: string) => {
    setDraftCategories((prev) => {
      if (category === "전체") {
        return prev.includes("전체") ? [] : ["전체"];
      }
      const next = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev.filter((c) => c !== "전체"), category];
      return next;
    });
  };

  const applyCategoryFilter = () => {
    if (draftCategories.length === 0 || draftCategories.includes("전체")) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(draftCategories);
    }
    setFilterOpen(false);
  };

  const removeSelectedCategory = (category: string) => {
    setSelectedCategories((prev) => prev.filter((item) => item !== category));
    setDraftCategories((prev) => prev.filter((item) => item !== category));
  };

  const toggleQuickFilter = (label: string) => {
    setActiveQuickFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    );
  };

  const openModal = (item: { title: string; image: string }) => {
    setSelected(item);
  };

  const closeModal = () => {
    setSelected(null);
  };

  return (
    <div className={styles.statusPage}>
      <section className={styles.statusSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderText}>
            <h2 className={styles.sectionTitle}>모집중 프로젝트</h2>
            <p className={styles.sectionSubtitle}>현재 지원 가능한 프로젝트입니다.</p>
          </div>
        </div>
        <div className={styles.sectionDivider} />
        <div className={styles.filterRow}>
          <div className={styles.filterButtons}>
            <div className={styles.filterButtonWrap}>
              <button
                className={`${styles.filterButton} ${
                  selectedCategories.length > 0 ? styles.filterButtonActiveBlue : ""
                }`}
                type="button"
                onClick={() => {
                  setDraftCategories(selectedCategories.length ? selectedCategories : []);
                  setFilterOpen(true);
                }}
              >
                전체필터
              </button>
              {selectedCategories.length > 0 ? (
                <span className={styles.filterBadge}>{selectedCategories.length}</span>
              ) : null}
            </div>
            <button
              className={`${styles.filterButton} ${
                activeQuickFilters.includes("상주") ? styles.filterButtonActive : ""
              }`}
              type="button"
              onClick={() => toggleQuickFilter("상주")}
            >
              상주
            </button>
            <button
              className={`${styles.filterButton} ${
                activeQuickFilters.includes("단독") ? styles.filterButtonActive : ""
              }`}
              type="button"
              onClick={() => toggleQuickFilter("단독")}
            >
              단독
            </button>
            <button
              className={styles.filterReset}
              type="button"
              onClick={() => {
                setActiveQuickFilters([]);
                setSelectedCategories([]);
              }}
              aria-label="필터 초기화"
            >
              <span className={styles.filterResetIcon}>⟳</span>
              <span>필터 초기화</span>
            </button>
          </div>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16.5 16.5L21 21" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
            <input
              className={styles.searchInput}
              type="search"
              placeholder="프로젝트 검색"
              aria-label="프로젝트 검색"
            />
          </div>
        </div>
        {selectedCategories.length > 0 ? (
          <div className={styles.selectedFilters}>
            {selectedCategories.map((category) => (
              <span key={category} className={styles.filterSelectedItem}>
                <span>{category}</span>
                <button
                  type="button"
                  className={styles.filterSelectedClose}
                  onClick={() => removeSelectedCategory(category)}
                  aria-label={`${category} 필터 제거`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : null}
        <div className={styles.statusList}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((item) => (
              <div key={item.id} className={styles.statusRow}>
                <div className={styles.statusBody}>
                  <div className={styles.statusMetaRow}>
                    <div className={styles.statusBadgeRow}>
                      <span className={styles.statusBadge}>{item.badge ?? "모집중"}</span>
                      <span className={styles.statusDday}>{item.dday ?? "D-?"}</span>
                    </div>
                    {item.category ? (
                      <span className={styles.statusCategory}>{item.category}</span>
                    ) : null}
                  </div>
                  <button
                    className={styles.statusTitleButton}
                    type="button"
                    onClick={() => openModal(item)}
                  >
                    {item.title}
                  </button>
                  <div className={styles.statusSplit}>
                    <span>
                      예상 견적:{" "}
                      <strong className={styles.statusBudget}>{item.budget ?? "협의"}</strong>
                    </span>
                    <span className={styles.dot}>·</span>
                    <span>
                      프로젝트 기간:{" "}
                      <strong className={styles.statusBudget}>
                        {item.duration ?? "기간 미정"}
                      </strong>
                    </span>
                  </div>
                  <div className={styles.statusMetaRow}>
                    <div className={styles.statusSkills}>
                      {(item.skills ?? []).map((skill: string) => (
                        <span key={skill} className={styles.statusSkill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                    <span className={styles.statusDate}>{item.postedAt ?? "등록일 미정"}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.muted}>현재 모집중인 프로젝트가 없습니다.</p>
          )}
        </div>
      </section>

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

      {filterOpen && (
        <div className={styles.modalOverlay} onClick={() => setFilterOpen(false)}>
          <div className={styles.filterModal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.sectionTitle}>AI 카테고리</h3>
                <p className={styles.sectionSubtitle}>필터 항목을 선택하세요.</p>
              </div>
            </div>
            <div className={styles.filterList}>
              {aiCategories.map((category) => (
                <button
                  key={category}
                  className={`${styles.filterOption} ${
                    draftCategories.includes(category) ? styles.filterOptionActive : ""
                  }`}
                  type="button"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className={styles.sectionDivider} />
            <div className={styles.filterActions}>
              <button
                className={styles.filterReset}
                type="button"
                onClick={() => {
                  setDraftCategories([]);
                  setSelectedCategories([]);
                }}
                aria-label="필터 초기화"
              >
                <span className={styles.filterResetIcon}>⟳</span>
                <span>필터 초기화</span>
              </button>
              <div className={styles.filterActionsRight}>
                <button
                  className={`${styles.primaryButton} ${styles.filterApplyButton}`}
                  type="button"
                  onClick={applyCategoryFilter}
                >
                  필터 적용
                </button>
                <button
                  className={styles.closeButton}
                  type="button"
                  onClick={() => setFilterOpen(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
