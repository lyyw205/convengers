"use client";

import { useMemo, useState } from "react";
import styles from "./portal.module.css";
import {
  activityFeed,
  inProgressProjects,
  pipelineStats,
  todoItems,
  upcomingProjects,
  weeklyPortfolio,
} from "../lib/sample-data";

export default function PortalDashboardPage() {
  const tabs = ["전체", "내 참여", "업데이트 필요"] as const;
  const sortOptions = [
    { key: "deadline", label: "마감 임박" },
    { key: "latest", label: "업데이트 최신" },
    { key: "risk", label: "리스크 우선" },
  ] as const;

  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("전체");
  const [sortKey, setSortKey] = useState<(typeof sortOptions)[number]["key"]>(
    "deadline"
  );
  const [selectedProject, setSelectedProject] = useState<(typeof upcomingProjects)[number] | null>(
    null
  );
  const [applyStep, setApplyStep] = useState<1 | 2>(1);
  const [applyDone, setApplyDone] = useState(false);

  const filteredProjects = useMemo(() => {
    let items = [...inProgressProjects];
    if (activeTab === "내 참여") {
      items = items.filter((item) => item.isMine);
    }
    if (activeTab === "업데이트 필요") {
      items = items.filter((item) => item.needsUpdate);
    }

    if (sortKey === "deadline") {
      items.sort((a, b) => a.endInDays - b.endInDays);
    } else if (sortKey === "latest") {
      items.sort((a, b) => a.updatedHours - b.updatedHours);
    } else if (sortKey === "risk") {
      items.sort((a, b) => Number(b.risk) - Number(a.risk));
    }

    return items;
  }, [activeTab, sortKey]);

  const urgentProjects = useMemo(
    () => upcomingProjects.filter((item) => item.status === "recruiting").slice(0, 2),
    []
  );

  const openProject = (project: (typeof upcomingProjects)[number]) => {
    setSelectedProject(project);
    setApplyStep(1);
    setApplyDone(false);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setApplyStep(1);
    setApplyDone(false);
  };

  return (
    <div className={styles.dashboard}>
      <section className={styles.kpiGrid}>
        {pipelineStats.map((stat) => (
          <div key={stat.label} className={styles.kpiCard}>
            <div className={styles.kpiLabel}>{stat.label}</div>
            <div className={styles.kpiValue}>{stat.value}</div>
            <div className={styles.muted}>{stat.note}</div>
          </div>
        ))}
      </section>

      <section className={styles.mainGrid}>
        <div className={styles.mainColumn}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>진행중</h2>
              <p className={styles.sectionSubtitle}>
                실시간 진행 현황과 주간 업데이트를 확인하세요.
              </p>
            </div>
            <div className={styles.controls}>
              <div className={styles.tabRow}>
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`${styles.tabButton} ${
                      activeTab === tab ? styles.tabActive : ""
                    }`}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <select
                className={styles.select}
                value={sortKey}
                onChange={(event) =>
                  setSortKey(event.target.value as (typeof sortOptions)[number]["key"])
                }
              >
                {sortOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.progressList}>
            {filteredProjects.map((project) => (
              <div key={project.id} className={styles.progressCard}>
                <div className={styles.progressHeader}>
                  <div>
                    <div className={styles.projectTitle}>{project.name}</div>
                    <div className={styles.muted}>
                      {project.category} · {project.stage}
                    </div>
                  </div>
                  <div className={styles.projectMeta}>
                    {project.risk && <span className={styles.riskBadge}>리스크</span>}
                    {project.needsUpdate && (
                      <span className={styles.warnBadge}>업데이트 필요</span>
                    )}
                    <span className={styles.muted}>{project.updatedAt}</span>
                  </div>
                </div>
                <div className={styles.progressBody}>
                  <div className={styles.progressRow}>
                    <span>기간</span>
                    <strong>{project.period}</strong>
                  </div>
                  <div className={styles.progressRow}>
                    <span>담당 구성원</span>
                    <div className={styles.memberRow}>
                      {project.members.map((member) => (
                        <span key={member} className={styles.memberBadge}>
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.progressRow}>
                    <span>이번 주 업데이트</span>
                    <strong>{project.update}</strong>
                  </div>
                </div>
                <div className={styles.progressFooter}>
                  <div className={styles.progressBar}>
                    <span style={{ width: `${project.progress}%` }} />
                  </div>
                  <div className={styles.muted}>이번 주 {project.progress}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.sideColumn}>
          <div className={styles.sideCard}>
            <div className={styles.sectionHeader}>
              <div>
                <h3 className={styles.sectionTitle}>진행 예정</h3>
                <p className={styles.sectionSubtitle}>지원/매칭 파이프라인</p>
              </div>
            </div>
            <div className={styles.upcomingList}>
              {upcomingProjects.map((project) => (
                <button
                  key={project.id}
                  className={styles.upcomingCard}
                  type="button"
                  onClick={() => openProject(project)}
                >
                  <div className={styles.projectTitle}>{project.name}</div>
                  <div className={styles.muted}>
                    시작 {project.start} · {project.duration}
                  </div>
                  <div className={styles.tagRow}>
                    {project.positions.map((role) => (
                      <span key={role} className={styles.tag}>
                        {role}
                      </span>
                    ))}
                  </div>
                  <div className={styles.muted}>
                    {project.budget} · 마감 {project.deadline}
                  </div>
                  <div className={styles.applyRow}>
                    <span className={styles.muted}>지원 {project.applicants}명</span>
                    <span className={styles.applyCta}>
                      {project.status === "planned" ? "관심 등록" : "지원하기"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sideCard}>
            <div className={styles.sectionHeader}>
              <div>
                <h3 className={styles.sectionTitle}>긴급 모집</h3>
                <p className={styles.sectionSubtitle}>48시간 내 마감</p>
              </div>
            </div>
            <div className={styles.urgentList}>
              {urgentProjects.map((project) => (
                <div key={project.id} className={styles.urgentCard}>
                  <div className={styles.projectTitle}>{project.name}</div>
                  <div className={styles.muted}>
                    마감 {project.deadline} · {project.positions.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className={styles.bottomGrid}>
        <div className={styles.feedCard}>
          <h3>활동 피드</h3>
          <ul className={styles.list}>
            {activityFeed.map((item) => (
              <li key={item.id}>
                <strong>{item.message}</strong>
                <div className={styles.muted}>{item.time}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.feedCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.sectionTitle}>이번 주 공개 포트폴리오</h3>
              <p className={styles.sectionSubtitle}>
                공개 레퍼런스가 수요를 만듭니다.
              </p>
            </div>
            <span className={styles.pill}>이번 주 1회 남음</span>
          </div>
          <div className={styles.portfolioGrid}>
            {weeklyPortfolio.map((item) => (
              <div key={item.id} className={styles.portfolioCard}>
                <strong>{item.title}</strong>
                <div className={styles.muted}>
                  {item.views} 조회 · {item.likes} 좋아요
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.feedCard}>
          <h3>내 할 일</h3>
          <ul className={styles.list}>
            {todoItems.map((item) => (
              <li key={item.id} className={styles.todoItem}>
                <span>{item.title}</span>
                <span
                  className={`${styles.todoBadge} ${
                    item.status === "due" ? styles.todoDue : ""
                  }`}
                >
                  {item.status === "due" ? "지연" : "진행"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {selectedProject && (
        <div className={styles.panelOverlay} onClick={closeProject}>
          <div className={styles.panel} onClick={(event) => event.stopPropagation()}>
            <div className={styles.panelHeader}>
              <div>
                <h3>{selectedProject.name}</h3>
                <p className={styles.muted}>
                  시작 {selectedProject.start} · {selectedProject.duration}
                </p>
              </div>
              <button className={styles.closeButton} type="button" onClick={closeProject}>
                닫기
              </button>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.panelSection}>
                <h4>요약</h4>
                <div className={styles.panelGrid}>
                  <div>
                    <strong>예산</strong>
                    <p className={styles.muted}>{selectedProject.budget}</p>
                  </div>
                  <div>
                    <strong>범위</strong>
                    <p className={styles.muted}>전략, 디자인, 개발</p>
                  </div>
                  <div>
                    <strong>모집 포지션</strong>
                    <p className={styles.muted}>{selectedProject.positions.join(", ")}</p>
                  </div>
                  <div>
                    <strong>요구 스킬</strong>
                    <p className={styles.muted}>{selectedProject.skills.join(", ")}</p>
                  </div>
                </div>
              </div>
              <div className={styles.panelSection}>
                <h4>평가 기준</h4>
                <ul className={styles.list}>
                  <li>성과가 있는 포트폴리오 우대</li>
                  <li>일정과 가용 시간이 맞는지</li>
                  <li>동일 도메인 경험</li>
                </ul>
              </div>
              <div className={styles.panelSection}>
                <h4>지원</h4>
                {!applyDone ? (
                  <div className={styles.applySteps}>
                    {applyStep === 1 ? (
                      <div className={styles.applyStep}>
                        <label className={styles.label}>포지션 선택</label>
                        <select className={styles.select}>
                          {selectedProject.positions.map((role) => (
                            <option key={role}>{role}</option>
                          ))}
                        </select>
                        <label className={styles.label}>가용 시간</label>
                        <select className={styles.select}>
                          <option>주 10시간</option>
                          <option>주 20시간</option>
                          <option>주 40시간</option>
                        </select>
                        <label className={styles.label}>시작 가능일</label>
                        <input className={styles.input} placeholder="MM/DD" />
                        <button
                          className={styles.primaryButton}
                          type="button"
                          onClick={() => setApplyStep(2)}
                        >
                          다음 단계
                        </button>
                      </div>
                    ) : (
                      <div className={styles.applyStep}>
                        <label className={styles.label}>포트폴리오 링크</label>
                        <input
                          className={styles.input}
                          placeholder="내 포트폴리오에서 선택"
                        />
                        <label className={styles.label}>지원 사유</label>
                        <textarea
                          className={styles.textarea}
                          placeholder="관련 경험을 적어주세요 (500자 이내)"
                        />
                        <label className={styles.label}>희망 단가 (선택)</label>
                        <input className={styles.input} placeholder="₩ / hour" />
                        <div className={styles.buttonRow}>
                          <button
                            className={styles.secondaryButton}
                            type="button"
                            onClick={() => setApplyStep(1)}
                          >
                            이전
                          </button>
                          <button
                            className={styles.primaryButton}
                            type="button"
                            onClick={() => setApplyDone(true)}
                          >
                            제출
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={styles.successBox}>지원 완료되었습니다.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
