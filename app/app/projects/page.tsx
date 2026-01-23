"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import { getStoredProjects, seedStoredProjects } from "../../lib/project-store";
import { addApplicant } from "../../lib/applicant-store";
import { seedStoredCategories } from "../../lib/category-store";
import { getMockUser, hasAllTags } from "../../lib/access-control";
import { getStoredSectionPermissions } from "../../lib/section-permission-store";

type ProjectItem = {
  id: string;
  title: string;
  image?: string;
  badge?: string;
  category?: string;
  budget?: string;
  duration?: string;
  skills?: string[];
  postedAt?: string;
  dday?: string;
  summary?: string;
  goals?: string;
  targetUsers?: string;
  features?: string;
  techStack?: string;
  roles?: string;
  workType?: string;
  location?: string;
  deadline?: string;
  contactEmail?: string;
  thumbnail?: string;
};

export default function ProjectStatusPage() {
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [draftCategories, setDraftCategories] = useState<string[]>([]);
  const [storedProjects, setStoredProjects] = useState<StoredProject[]>([]);
  const [activePublicCategory, setActivePublicCategory] = useState("전체");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionPermissions, setSectionPermissions] = useState(
    () => getStoredSectionPermissions()
  );

  const aiCategories = ["전체", "AI Solution", "AI Image/Video", "LLM"];

  useEffect(() => {
    seedStoredProjects();
    setStoredProjects(getStoredProjects());
  }, []);
  useEffect(() => {
    seedStoredCategories();
  }, []);
  useEffect(() => {
    const refresh = () => setSectionPermissions(getStoredSectionPermissions());
    window.addEventListener("section-permissions-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("section-permissions-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  const filteredProjects =
    selectedCategories.length === 0
      ? storedProjects
      : storedProjects.filter((item) =>
          item.category ? selectedCategories.includes(item.category) : false
        );
  const publicCategories = useMemo(() => {
    const unique = new Set<string>();
    storedProjects.forEach((project) => {
      if (project.category) {
        unique.add(project.category);
      }
    });
    return ["전체", ...Array.from(unique)];
  }, [storedProjects]);
  const filteredPublicProjects = useMemo(() => {
    const base =
      activePublicCategory === "전체"
        ? storedProjects
        : storedProjects.filter((project) => project.category === activePublicCategory);
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return base;
    }
    return base.filter(
      (project) =>
        project.title.toLowerCase().includes(term) ||
        (project.summary ?? "").toLowerCase().includes(term)
    );
  }, [storedProjects, activePublicCategory, searchTerm]);

  const mockUser = getMockUser();
  const sectionMap = useMemo(
    () => new Map(sectionPermissions.map((item) => [item.id, item.requiredTags])),
    [sectionPermissions]
  );
  const canViewSection = (id: string) =>
    hasAllTags(mockUser.tags, sectionMap.get(id) ?? []);

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

  const openModal = (item: ProjectItem) => {
    setSelected(item);
  };

  const closeModal = () => {
    setSelected(null);
  };

  useEffect(() => {
    const hasModal = Boolean(selected);
    document.documentElement.classList.toggle("no-scroll", hasModal);
    document.body.classList.toggle("no-scroll", hasModal);
    return () => {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, [selected]);

  return (
    <div className={styles.statusPage}>
      {canViewSection("/app/projects:recruiting") && (
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
                  <button
                    className={styles.statusTitleButton}
                    type="button"
                    onClick={() => openModal(item)}
                  >
                    {item.title}
                  </button>
                  <div className={styles.statusSkillRow}>
                    {item.category ? (
                      <span className={styles.statusCategoryTag}>{item.category}</span>
                    ) : null}
                    {item.category ? (
                      <span className={styles.statusDivider} aria-hidden="true" />
                    ) : null}
                    <div className={styles.statusSkills}>
                      {(item.skills ?? []).map((skill: string) => (
                        <span key={skill} className={styles.statusSkill}>
                          #{skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.statusInfo}>
                    <span className={styles.statusInfoItem}>
                      예상 금액 : {item.budget ?? "협의"}
                      {item.budget ? " 월 단위" : ""}
                    </span>
                    <span className={styles.statusInfoItem}>
                      시작 예정일 : {item.deadline ?? "협의 가능"}
                    </span>
                    <span className={styles.statusInfoItem}>
                      예상 기간 : {item.duration ?? "기간 미정"}
                    </span>
                  </div>
                  <div className={styles.statusTags}>
                    {item.workType ? (
                      <span className={styles.statusTag}>{item.workType}</span>
                    ) : null}
                    <span className={styles.statusTag}>{item.badge ?? "모집중"}</span>
                    <span className={styles.statusTag}>NEW</span>
                    <span className={styles.statusTag}>{item.dday ?? "D-?"}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.muted}>현재 모집중인 프로젝트가 없습니다.</p>
          )}
        </div>
        </section>
      )}

      <section className={styles.publicSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderText}>
            <h2 className={styles.sectionTitle}>Project Portfolio</h2>
            <p className={styles.sectionSubtitle}>
              컨벤저스에서 진행한 프로젝트입니다.
            </p>
          </div>
        </div>
        <div className={styles.sectionDivider} />
        <div className={styles.publicFilterBar}>
          <div className={styles.publicFilterRow}>
            {publicCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`${styles.publicFilterButton} ${
                  activePublicCategory === category ? styles.publicFilterActive : ""
                }`}
                onClick={() => setActivePublicCategory(category)}
              >
                {category}
              </button>
            ))}
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
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setSearchTerm(searchInput);
                }
              }}
            />
          </div>
        </div>
        <div className={styles.publicGrid}>
          {filteredPublicProjects.map((project) => (
            <article
              key={project.id}
              className={`${styles.publicCard} ${styles.publicCardMedia}`}
              role="button"
              tabIndex={0}
              onClick={() => openModal(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  openModal(project);
                }
              }}
            >
              <div
                className={styles.publicThumb}
                style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}
              >
                <span className={styles.publicThumbText}>{project.title}</span>
              </div>
              <div className={styles.publicCardContent}>
                <div className={styles.publicBadge}>{project.category ?? "Project"}</div>
                <h3 className={styles.publicCardTitle}>{project.title}</h3>
                <p className={styles.publicLead}>{project.summary}</p>
                <div className={styles.publicMeta}>
                  {project.deadline ?? "협의"} · {project.techStack ?? "Tech stack 협의"}
                </div>
              </div>
            </article>
          ))}
        </div>
        {filteredPublicProjects.length === 0 && (
          <p className={styles.publicEmptyState}>현재 등록된 프로젝트가 없습니다.</p>
        )}
      </section>

      {selected && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={`${styles.modal} ${styles.projectModal}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.sectionTitle}>{selected.title}</h3>
                <p className={styles.sectionSubtitle}>프로젝트 상세 정보</p>
              </div>
              <div className={styles.modalHeaderActions}>
                <button className={styles.bookmarkIconButton} type="button" aria-label="북마크">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 20.5l-7.2-7a4.6 4.6 0 0 1 6.5-6.5L12 7.8l.7-.8a4.6 4.6 0 0 1 6.5 6.5z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button className={styles.closeButton} type="button" onClick={closeModal}>
                  닫기
                </button>
              </div>
            </div>
            <div className={`${styles.modalBody} ${styles.projectModalBody}`}>
              <div className={styles.projectDetail}>
                <h4 className={styles.projectDetailTitle}>
                  [상주] [신용산]B2B SaaS 플랫폼(재고/물류) UI/UX 디자인 (상주) - Linguistic
                  Ability, SaaS
                </h4>

                <div className={styles.projectTagRow}>
                  <span className={styles.projectTag}>상주</span>
                  <span className={styles.projectTag}>모집중</span>
                  <span className={styles.projectTag}>NEW</span>
                </div>
                <div className={styles.projectDivider} />
                <div className={styles.projectInfoGrid}>
                  <div className={styles.projectInfoItem}>
                    <span className={styles.projectInfoLabel}>예상 금액</span>
                    <span className={styles.projectInfoValue}>
                      400만원 ~ 450만원
                      <br />
                      월 단위
                    </span>
                  </div>
                  <div className={styles.projectInfoItem}>
                    <span className={styles.projectInfoLabel}>시작 예정일</span>
                    <span className={styles.projectInfoValue}>
                      2026-02-09
                      <br />
                      협의 가능
                    </span>
                  </div>
                  <div className={styles.projectInfoItem}>
                    <span className={styles.projectInfoLabel}>직군/직무</span>
                    <span className={styles.projectInfoValue}>디자인 &gt; UX 디자이너</span>
                  </div>
                  <div className={styles.projectInfoItem}>
                    <span className={styles.projectInfoLabel}>예상 기간</span>
                    <span className={styles.projectInfoValue}>6개월</span>
                  </div>
                  <div className={styles.projectInfoItem}>
                    <span className={styles.projectInfoLabel}>근무 위치</span>
                    <span className={styles.projectInfoValue}>신용산/이촌역 부근</span>
                  </div>
                  <div className={styles.projectInfoItem}>
                    <span className={styles.projectInfoLabel}>근무 시간</span>
                    <span className={styles.projectInfoValue}>9시 ~ 18시</span>
                  </div>
                  <div className={styles.projectInfoItem}>
                    <span className={styles.projectInfoLabel}>근무 시간 조율</span>
                    <span className={styles.projectInfoValue}>조율 불가능</span>
                  </div>
                  <div className={styles.projectInfoItem}>
                    <span className={styles.projectInfoLabel}>월차 제공</span>
                    <span className={styles.projectInfoValue}>미제공</span>
                  </div>
                </div>

                <div className={styles.projectSkills}>
                  {[
                    "Linguistic Ability",
                    "SaaS",
                    "UX 디자인",
                    "UI 디자인",
                    "Figma",
                  ].map((skill) => (
                    <span key={skill} className={styles.projectSkill}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div className={styles.projectDivider} />

                <div className={styles.projectSection}>
                  <div className={styles.projectSectionTitle}>프로젝트 세부 내용</div>
                  <div className={styles.projectSectionSubtitle}>
                    현재 프로젝트 진행 상황
                  </div>
                  <p className={styles.projectParagraph}>
                    화학물질 재고관리 솔루션의 사용자 경험(UX)을 개선하고, 신규 기능(주문/배송
                    등)에 대한 UI를 설계합니다. 단순 웹사이트가 아닌 복잡한 데이터를 시각화하는
                    B2B SaaS 툴을 디자인합니다.
                  </p>
                  <ul className={styles.projectList}>
                    <li>투입시기: 2월 ~ 3월</li>
                    <li>근무기간: 6개월(연장가능)</li>
                  </ul>
                </div>

                <div className={styles.projectSection}>
                  <div className={styles.projectSectionTitle}>주요 담당 업무</div>
                  <ul className={styles.projectList}>
                    <li>기능 정의서를 바탕으로 한 UI/UX 화면 설계 및 디자인 (Web/Mobile)</li>
                    <li>
                      개발팀(FE) 전달을 위한 Figma 디자인 시스템 가이드 제작 및 핸드오프
                    </li>
                    <li>복잡한 재고/물류 데이터를 직관적으로 표현하는 대시보드 UI 구성</li>
                  </ul>
                </div>

                <div className={styles.projectSection}>
                  <div className={styles.projectSectionTitle}>세부 업무범위</div>
                  <div className={styles.projectSectionSubtitle}>[필수]</div>
                  <ul className={styles.projectList}>
                    <li>UI/UX 디자인 경력 5년 이상</li>
                    <li>Figma를 활용한 컴포넌트 관리 및 프로토타이핑 능숙자</li>
                    <li>개발자 및 기획자와 원활한 커뮤니케이션이 가능하신 분</li>
                  </ul>
                </div>

                <div className={styles.projectSection}>
                  <div className={styles.projectSectionTitle}>기타 전달사항 또는 우대사항</div>
                  <div className={styles.projectSectionSubtitle}>[우대]</div>
                  <ul className={styles.projectList}>
                    <li>B2B SaaS, 어드민(Admin), ERP, 물류/재고관리 시스템 디자인 경험</li>
                    <li>데이터 시각화(차트/그래프) 디자인 경험이 풍부하신 분</li>
                    <li>* 개인장비 지참 필수</li>
                  </ul>
                </div>

                <div className={styles.projectSection}>
                  <div className={styles.projectSectionTitle}>필요인력 및 희망 연차</div>
                  <ul className={styles.projectList}>
                    <li>필요 인력 : 1명</li>
                    <li>희망 연차 : 5 ~ 12년</li>
                  </ul>
                </div>
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
