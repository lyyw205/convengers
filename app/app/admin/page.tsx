"use client";

import { useEffect, useState } from "react";
import styles from "./admin.module.css";
import { projectStatus } from "../../lib/sample-data";
import {
  activityFeed,
  inProgressProjects,
  pipelineStats,
  todoItems,
  upcomingProjects,
  weeklyPortfolio,
} from "../../lib/sample-data";
import {
  deleteStoredProject,
  getStoredProjects,
  seedStoredProjects,
  saveStoredProject,
  updateStoredProject,
  type StoredProject,
} from "../../lib/project-store";
import { getApplicantsByProjectId } from "../../lib/applicant-store";
import {
  deleteStoredPosting,
  getStoredPostings,
  saveStoredPosting,
  seedStoredPostings,
  updateStoredPosting,
  type StoredPosting,
} from "../../lib/posting-store";
import {
  deleteStoredNetworkings,
  getStoredNetworkings,
  saveStoredNetworking,
  seedStoredNetworkings,
  updateStoredNetworking,
  type StoredNetworking,
} from "../../lib/networking-store";
import { getNetworkingApplicantsById } from "../../lib/networking-applicant-store";
import {
  getStoredCategories,
  saveStoredCategories,
  seedStoredCategories,
  type StoredCategory,
  type StoredCategoryGroup,
} from "../../lib/category-store";
import {
  getStoredPagePermissions,
  resetStoredPagePermissions,
  saveStoredPagePermissions,
  type PagePermissionConfig,
} from "../../lib/page-permission-store";
import {
  getStoredTags,
  saveStoredTags,
  type StoredTag,
} from "../../lib/tag-store";

export default function AdminHomePage() {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "postings", label: "PROJECTS" },
    { id: "applications", label: "Postings" },
    { id: "networkings", label: "Networkings" },
    { id: "categories", label: "Categories" },
    { id: "tags", label: "Tag settings" },
    { id: "users", label: "User permissions" },
    { id: "page-permissions", label: "Page permissions" },
  ] as const;

  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>(
    "dashboard"
  );
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [storedProjects, setStoredProjects] = useState(() => getStoredProjects());
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [applicantModalOpen, setApplicantModalOpen] = useState(false);
  const [applicantProjectTitle, setApplicantProjectTitle] = useState("");
  const [applicants, setApplicants] = useState<
    ReturnType<typeof getApplicantsByProjectId>
  >([]);
  const [postingModalOpen, setPostingModalOpen] = useState(false);
  const [storedPostings, setStoredPostings] = useState(() => getStoredPostings());
  const [editingPostingId, setEditingPostingId] = useState<string | null>(null);
  const [networkingModalOpen, setNetworkingModalOpen] = useState(false);
  const [storedNetworkings, setStoredNetworkings] = useState(() => getStoredNetworkings());
  const [editingNetworkingId, setEditingNetworkingId] = useState<string | null>(null);
  const [networkingApplicantModalOpen, setNetworkingApplicantModalOpen] = useState(false);
  const [networkingApplicantTitle, setNetworkingApplicantTitle] = useState("");
  const [networkingApplicants, setNetworkingApplicants] = useState<
    ReturnType<typeof getNetworkingApplicantsById>
  >([]);
  const [storedCategories, setStoredCategories] = useState<StoredCategory[]>([]);
  const [projectForm, setProjectForm] = useState({
    title: "B2B SaaS 운영 대시보드 리뉴얼",
    category: "Web Development",
    summary:
      "기존 운영 대시보드의 정보 구조를 재정비하고, 핵심 지표를 빠르게 확인할 수 있는 UI로 개선합니다.",
    goals: "업무 처리 시간 30% 단축, 전환율 15% 개선",
    targetUsers: "운영 매니저, 고객지원 리드",
    features: "실시간 KPI 보드, 이슈 트래킹, 사용자 세그먼트 분석",
    techStack: "Next.js, Node.js, PostgreSQL, Redis",
    roles: "프론트엔드, 백엔드, 제품 디자이너",
    workType: "Hybrid",
    location: "Seoul / Gangnam",
    duration: "12주",
    budget: "7,500만원",
    deadline: "2026-02-15",
    contactEmail: "pm@company.com",
    thumbnail: "",
  });
  const [postingForm, setPostingForm] = useState({
    title: "",
    category: "News",
    excerpt: "",
    source: "",
    date: "",
    href: "",
    image: "",
  });
  const [networkingForm, setNetworkingForm] = useState({
    title: "",
    category: "Networking",
    date: "",
    location: "",
    status: "upcoming",
    description: "",
    image: "",
  });
  const [activeProjectTab, setActiveProjectTab] = useState("전체");
  const [projectSortKey, setProjectSortKey] = useState("deadline");
  const [selectedProject, setSelectedProject] = useState<
    (typeof upcomingProjects)[number] | null
  >(null);
  const [applyStep, setApplyStep] = useState<1 | 2>(1);
  const [applyDone, setApplyDone] = useState(false);

  useEffect(() => {
    seedStoredProjects();
    seedStoredPostings();
    seedStoredNetworkings();
    seedStoredCategories();
    setStoredProjects(getStoredProjects());
    setStoredPostings(getStoredPostings());
    setStoredNetworkings(getStoredNetworkings());
    setStoredCategories(getStoredCategories());
    const refreshCategories = () => setStoredCategories(getStoredCategories());
    window.addEventListener("categories-updated", refreshCategories);
    return () => {
      window.removeEventListener("categories-updated", refreshCategories);
    };
  }, []);

  const resetProjectForm = () => {
    setProjectForm({
      title: "B2B SaaS 운영 대시보드 리뉴얼",
      category: "Web Development",
      summary:
        "기존 운영 대시보드의 정보 구조를 재정비하고, 핵심 지표를 빠르게 확인할 수 있는 UI로 개선합니다.",
      goals: "업무 처리 시간 30% 단축, 전환율 15% 개선",
      targetUsers: "운영 매니저, 고객지원 리드",
      features: "실시간 KPI 보드, 이슈 트래킹, 사용자 세그먼트 분석",
      techStack: "Next.js, Node.js, PostgreSQL, Redis",
      roles: "프론트엔드, 백엔드, 제품 디자이너",
      workType: "Hybrid",
      location: "Seoul / Gangnam",
      duration: "12주",
      budget: "7,500만원",
      deadline: "2026-02-15",
      contactEmail: "pm@company.com",
      thumbnail: "",
    });
  };

  const resetPostingForm = () => {
    setPostingForm({
      title: "",
      category: "News",
      excerpt: "",
      source: "",
      date: "",
      href: "",
      image: "",
    });
  };

  const filteredProjects = (() => {
    let items = [...inProgressProjects];
    if (activeProjectTab === "내 참여") {
      items = items.filter((item) => item.isMine);
    }
    if (activeProjectTab === "업데이트 필요") {
      items = items.filter((item) => item.needsUpdate);
    }
    if (projectSortKey === "deadline") {
      items.sort((a, b) => a.endInDays - b.endInDays);
    } else if (projectSortKey === "latest") {
      items.sort((a, b) => a.updatedHours - b.updatedHours);
    } else if (projectSortKey === "risk") {
      items.sort((a, b) => Number(b.risk) - Number(a.risk));
    }
    return items;
  })();

  const urgentProjects = upcomingProjects
    .filter((item) => item.status === "recruiting")
    .slice(0, 2);

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
  const resetNetworkingForm = () => {
    setNetworkingForm({
      title: "",
      category: "Networking",
      date: "",
      location: "",
      status: "upcoming",
      description: "",
      image: "",
    });
  };

  const openNewProjectModal = () => {
    setEditingProjectId(null);
    resetProjectForm();
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (project: StoredProject) => {
    setEditingProjectId(project.id);
    setProjectForm({
      title: project.title ?? "",
      category: project.category ?? "Web Development",
      summary: project.summary ?? "",
      goals: project.goals ?? "",
      targetUsers: project.targetUsers ?? "",
      features: project.features ?? "",
      techStack: project.techStack ?? "",
      roles: project.roles ?? "",
      workType: project.workType ?? "Remote",
      location: project.location ?? "",
      duration: project.duration ?? "",
      budget: project.budget ?? "",
      deadline: project.deadline ?? "",
      contactEmail: project.contactEmail ?? "",
      thumbnail: project.thumbnail ?? "",
    });
    setProjectModalOpen(true);
  };

  const openApplicantsModal = (project: StoredProject) => {
    setApplicantProjectTitle(project.title);
    setApplicants(getApplicantsByProjectId(project.id));
    setApplicantModalOpen(true);
  };

  const projectCategories = storedCategories
    .filter((category) => category.group === "projects")
    .map((category) => category.name);
  const networkingCategories = storedCategories
    .filter((category) => category.group === "networkings")
    .map((category) => category.name);

  const openNewNetworkingModal = () => {
    setEditingNetworkingId(null);
    resetNetworkingForm();
    setNetworkingModalOpen(true);
  };

  const openEditNetworkingModal = (networking: StoredNetworking) => {
    setEditingNetworkingId(networking.id);
    setNetworkingForm({
      title: networking.title ?? "",
      category: networking.category ?? "Networking",
      date: networking.date ?? "",
      location: networking.location ?? "",
      status: networking.status ?? "upcoming",
      description: networking.description ?? "",
      image: networking.image ?? "",
    });
    setNetworkingModalOpen(true);
  };

  const openNetworkingApplicantsModal = (networking: StoredNetworking) => {
    setNetworkingApplicantTitle(networking.title);
    setNetworkingApplicants(getNetworkingApplicantsById(networking.id));
    setNetworkingApplicantModalOpen(true);
  };

  const openNewPostingModal = () => {
    setEditingPostingId(null);
    resetPostingForm();
    setPostingModalOpen(true);
  };

  const openEditPostingModal = (posting: StoredPosting) => {
    setEditingPostingId(posting.id);
    setPostingForm({
      title: posting.title ?? "",
      category: posting.category ?? "News",
      excerpt: posting.excerpt ?? "",
      source: posting.source ?? "",
      date: posting.date ?? "",
      href: posting.href ?? "",
      image: posting.image ?? "",
    });
    setPostingModalOpen(true);
  };

  const handleProjectSave = () => {
    if (!projectForm.title.trim()) {
      return;
    }

    const existingProject = editingProjectId
      ? storedProjects.find((item) => item.id === editingProjectId)
      : null;
    const imagePool = ["/refs/ref-01.svg", "/refs/ref-02.svg", "/refs/ref-03.svg"];
    const image =
      projectForm.thumbnail ||
      existingProject?.image ||
      imagePool[Math.floor(Math.random() * imagePool.length)];
    const deadlineDate = projectForm.deadline ? new Date(projectForm.deadline) : null;
    const today = new Date();
    const dday =
      deadlineDate && !Number.isNaN(deadlineDate.getTime())
        ? `D-${Math.max(
            0,
            Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
          )}`
        : "D-?";
    const postedAt = existingProject?.postedAt ?? today.toISOString().slice(0, 10);
    const skills = projectForm.techStack
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const newProject = {
      id: existingProject?.id ?? `custom-${Date.now()}`,
      title: projectForm.title,
      image,
      badge: "모집중",
      category: projectForm.category,
      budget: projectForm.budget || "협의",
      duration: projectForm.duration || "기간 미정",
      skills,
      postedAt,
      dday,
      summary: projectForm.summary,
      goals: projectForm.goals,
      targetUsers: projectForm.targetUsers,
      features: projectForm.features,
      techStack: projectForm.techStack,
      roles: projectForm.roles,
      workType: projectForm.workType,
      location: projectForm.location,
      deadline: projectForm.deadline,
      contactEmail: projectForm.contactEmail,
      thumbnail: projectForm.thumbnail,
    };

    if (existingProject) {
      updateStoredProject(newProject);
    } else {
      saveStoredProject(newProject);
    }
    setStoredProjects(getStoredProjects());
    setProjectModalOpen(false);
    setEditingProjectId(null);
    resetProjectForm();
  };

  const handlePostingSave = () => {
    if (!postingForm.title.trim()) {
      return;
    }

    const existingPosting = editingPostingId
      ? storedPostings.find((item) => item.id === editingPostingId)
      : null;
    const today = new Date().toISOString().slice(0, 10);
    const newPosting = {
      id: existingPosting?.id ?? `posting-${Date.now()}`,
      title: postingForm.title,
      category: postingForm.category,
      excerpt: postingForm.excerpt,
      source: postingForm.source || "Convengers",
      date: postingForm.date || today,
      href: postingForm.href || "#",
      image: postingForm.image || existingPosting?.image || "",
    };

    if (existingPosting) {
      updateStoredPosting(newPosting);
    } else {
      saveStoredPosting(newPosting);
    }

    setStoredPostings(getStoredPostings());
    setPostingModalOpen(false);
    setEditingPostingId(null);
    resetPostingForm();
  };

  const handleNetworkingSave = () => {
    if (!networkingForm.title.trim()) {
      return;
    }

    const existingNetworking = editingNetworkingId
      ? storedNetworkings.find((item) => item.id === editingNetworkingId)
      : null;
    const newNetworking = {
      id: existingNetworking?.id ?? `networking-${Date.now()}`,
      title: networkingForm.title,
      category: networkingForm.category,
      date: networkingForm.date,
      location: networkingForm.location,
      status: networkingForm.status,
      description: networkingForm.description,
      image: networkingForm.image || existingNetworking?.image || "",
    };

    if (existingNetworking) {
      updateStoredNetworking(newNetworking);
    } else {
      saveStoredNetworking(newNetworking);
    }

    setStoredNetworkings(getStoredNetworkings());
    setNetworkingModalOpen(false);
    setEditingNetworkingId(null);
    resetNetworkingForm();
  };

  const handleProjectDelete = (projectId: string) => {
    if (!window.confirm("이 프로젝트를 삭제할까요?")) {
      return;
    }
    deleteStoredProject(projectId);
    setStoredProjects(getStoredProjects());
  };

  const handlePostingDelete = (postingId: string) => {
    if (!window.confirm("이 게시글을 삭제할까요?")) {
      return;
    }
    deleteStoredPosting(postingId);
    setStoredPostings(getStoredPostings());
  };

  const handleNetworkingDelete = (networkingId: string) => {
    if (!window.confirm("이 네트워킹을 삭제할까요?")) {
      return;
    }
    deleteStoredNetworkings(networkingId);
    setStoredNetworkings(getStoredNetworkings());
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Operations console</h2>
          <p className={styles.sectionSubtitle}>
            Manage partners, postings, leads, references, and settlements.
          </p>
        </div>
      </div>

      <div className={styles.adminLayout}>
        <aside className={styles.adminSidebar}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.sidebarButton} ${
                activeTab === tab.id ? styles.sidebarActive : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </aside>
        <div className={styles.adminContent}>
          {activeTab === "dashboard" && (
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
                    {["전체", "내 참여", "업데이트 필요"].map((tab) => (
                      <button
                        key={tab}
                        className={`${styles.tabButton} ${
                          activeProjectTab === tab ? styles.tabActive : ""
                        }`}
                        type="button"
                        onClick={() => setActiveProjectTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <select
                    className={styles.select}
                    value={projectSortKey}
                    onChange={(event) => setProjectSortKey(event.target.value)}
                  >
                    <option value="deadline">마감 임박</option>
                    <option value="latest">업데이트 최신</option>
                    <option value="risk">리스크 우선</option>
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
        </div>
          )}

          {activeTab === "postings" && (
            <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Projects</h2>
              <p className={styles.muted}>프로젝트 등록 및 모집 관리</p>
            </div>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={openNewProjectModal}
            >
              프로젝트 등록
            </button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Duration</th>
                <th>Actions</th>
                <th>Applicants</th>
              </tr>
            </thead>
            <tbody>
              {storedProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.category ?? "일반"}</td>
                  <td>{project.badge ?? "모집중"}</td>
                  <td>{project.budget ?? "협의"}</td>
                  <td>{project.duration ?? "기간 미정"}</td>
                  <td>
                    <div className={styles.actionRow}>
                      <button
                        type="button"
                        className={styles.iconButton}
                        aria-label="프로젝트 수정"
                        onClick={() => openEditProjectModal(project)}
                      >
                        ✎
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() => openApplicantsModal(project)}
                    >
                      지원자 보기
                    </button>
                  </td>
                </tr>
              ))}
              {projectStatus.upcoming.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.category ?? "일반"}</td>
                  <td>{project.badge ?? "모집중"}</td>
                  <td>{project.budget ?? "협의"}</td>
                  <td>{project.duration ?? "기간 미정"}</td>
                  <td>
                    <div className={styles.actionRow}>
                      <button
                        type="button"
                        className={styles.iconButton}
                        aria-label="프로젝트 수정"
                        onClick={() => openEditProjectModal(project)}
                      >
                        ✎
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() => openApplicantsModal(project)}
                    >
                      지원자 보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

          {activeTab === "applications" && (
            <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Postings</h2>
              <p className={styles.muted}>
                /app/postings 페이지에 노출되는 게시글을 관리합니다.
              </p>
            </div>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={openNewPostingModal}
            >
              포스팅 등록
            </button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Source</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {storedPostings.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.muted}>
                    등록된 게시글이 없습니다.
                  </td>
                </tr>
              ) : (
                storedPostings.map((posting) => (
                  <tr key={posting.id}>
                    <td>{posting.title}</td>
                    <td>{posting.category}</td>
                    <td>{posting.date}</td>
                    <td>{posting.source}</td>
                    <td>
                      <div className={styles.actionRow}>
                        <button
                          type="button"
                          className={styles.iconButton}
                          aria-label="포스팅 수정"
                          onClick={() => openEditPostingModal(posting)}
                        >
                          ✎
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
          )}

          {activeTab === "networkings" && (
            <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Networkings</h2>
              <p className={styles.muted}>/networking 페이지 콘텐츠를 관리합니다.</p>
            </div>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={openNewNetworkingModal}
            >
              네트워킹 등록
            </button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Applicants</th>
              </tr>
            </thead>
            <tbody>
              {storedNetworkings.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.muted}>
                    등록된 네트워킹이 없습니다.
                  </td>
                </tr>
              ) : (
                storedNetworkings.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.date || "-"}</td>
                    <td>{item.location || "-"}</td>
                    <td>{item.status === "past" ? "지난 일정" : "예정"}</td>
                    <td>
                      <div className={styles.actionRow}>
                        <button
                          type="button"
                          className={styles.iconButton}
                          aria-label="네트워킹 수정"
                          onClick={() => openEditNetworkingModal(item)}
                        >
                          ✎
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={() => openNetworkingApplicantsModal(item)}
                      >
                        지원자 보기
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

          {activeTab === "categories" && <AdminCategoriesTab />}

          {activeTab === "tags" && <AdminTagsTab />}

          {activeTab === "users" && <AdminUsersTab />}

          {activeTab === "page-permissions" && <AdminPagePermissionsTab />}
        </div>
      </div>

      {projectModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setProjectModalOpen(false)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>프로젝트 등록</h3>
                <p className={styles.muted}>웹 개발 프로젝트 기본 정보를 입력하세요.</p>
              </div>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="프로젝트 삭제"
                onClick={() => {
                  if (!editingProjectId) {
                    setProjectModalOpen(false);
                    return;
                  }
                  if (!window.confirm("이 프로젝트를 삭제할까요?")) {
                    return;
                  }
                  handleProjectDelete(editingProjectId);
                  setProjectModalOpen(false);
                  setEditingProjectId(null);
                }}
              >
                🗑
              </button>
            </div>
            <div className={styles.modalBody}>
              <label className={styles.label}>프로젝트명</label>
              <input
                className={styles.input}
                value={projectForm.title}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, title: event.target.value }))
                }
                placeholder="예: 웹 서비스 리뉴얼 프로젝트"
              />
              <label className={styles.label}>카테고리</label>
              <select
                className={styles.select}
                value={projectForm.category}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, category: event.target.value }))
                }
              >
                {projectCategories.length === 0 ? (
                  <option>Web Development</option>
                ) : (
                  projectCategories.map((category) => (
                    <option key={category}>{category}</option>
                  ))
                )}
              </select>
              <label className={styles.label}>프로젝트 요약</label>
              <textarea
                className={styles.textarea}
                value={projectForm.summary}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, summary: event.target.value }))
                }
                placeholder="프로젝트 배경과 핵심 목표를 요약하세요."
              />
              <label className={styles.label}>목표</label>
              <textarea
                className={styles.textarea}
                value={projectForm.goals}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, goals: event.target.value }))
                }
                placeholder="핵심 성과 지표 또는 기대 결과를 적어주세요."
              />
              <label className={styles.label}>타겟 사용자</label>
              <input
                className={styles.input}
                value={projectForm.targetUsers}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, targetUsers: event.target.value }))
                }
                placeholder="예: B2B SaaS 운영팀"
              />
              <label className={styles.label}>핵심 기능</label>
              <textarea
                className={styles.textarea}
                value={projectForm.features}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, features: event.target.value }))
                }
                placeholder="필수 기능 목록을 작성하세요."
              />
              <label className={styles.label}>기술 스택</label>
              <input
                className={styles.input}
                value={projectForm.techStack}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, techStack: event.target.value }))
                }
                placeholder="예: Next.js, Node.js, PostgreSQL (쉼표로 구분)"
              />
              <label className={styles.label}>모집 포지션</label>
              <input
                className={styles.input}
                value={projectForm.roles}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, roles: event.target.value }))
                }
                placeholder="예: 프론트엔드, 백엔드, 디자이너"
              />
              <label className={styles.label}>근무 형태</label>
              <select
                className={styles.select}
                value={projectForm.workType}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, workType: event.target.value }))
                }
              >
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>
              <label className={styles.label}>지역/오피스</label>
              <input
                className={styles.input}
                value={projectForm.location}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, location: event.target.value }))
                }
                placeholder="예: Seoul / Gangnam"
              />
              <label className={styles.label}>프로젝트 기간</label>
              <input
                className={styles.input}
                value={projectForm.duration}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, duration: event.target.value }))
                }
                placeholder="예: 10주"
              />
              <label className={styles.label}>예산</label>
              <input
                className={styles.input}
                value={projectForm.budget}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, budget: event.target.value }))
                }
                placeholder="예: 5,000만원"
              />
              <label className={styles.label}>마감일</label>
              <input
                className={styles.input}
                type="date"
                value={projectForm.deadline}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, deadline: event.target.value }))
                }
              />
              <label className={styles.label}>담당자 이메일</label>
              <input
                className={styles.input}
                value={projectForm.contactEmail}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, contactEmail: event.target.value }))
                }
                placeholder="contact@company.com"
              />
              <label className={styles.label}>썸네일 업로드</label>
              <input
                className={styles.input}
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) {
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (typeof reader.result === "string") {
                      setProjectForm((prev) => ({ ...prev, thumbnail: reader.result }));
                    }
                  };
                  reader.readAsDataURL(file);
                }}
              />
              {projectForm.thumbnail ? (
                <div className={styles.thumbPreview}>
                  <img src={projectForm.thumbnail} alt="프로젝트 썸네일 미리보기" />
                </div>
              ) : null}
            </div>
            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => {
                  resetProjectForm();
                  setProjectModalOpen(false);
                  setEditingProjectId(null);
                }}
              >
                취소
              </button>
              <button type="button" className={styles.primaryButton} onClick={handleProjectSave}>
                {editingProjectId ? "수정 저장" : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}

      {applicantModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setApplicantModalOpen(false)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>지원자 목록</h3>
                <p className={styles.muted}>{applicantProjectTitle}</p>
              </div>
            </div>
            <div className={styles.modalBody}>
              {applicants.length === 0 ? (
                <p className={styles.muted}>지원자가 없습니다.</p>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Applicant</th>
                      <th>Email</th>
                      <th>Applied at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicants.map((applicant) => (
                      <tr key={applicant.id}>
                        <td>{applicant.name}</td>
                        <td>{applicant.email}</td>
                        <td>{new Date(applicant.appliedAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setApplicantModalOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {postingModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setPostingModalOpen(false)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>포스팅 등록</h3>
                <p className={styles.muted}>/app/postings에 노출될 게시글 정보를 입력하세요.</p>
              </div>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="포스팅 삭제"
                onClick={() => {
                  if (!editingPostingId) {
                    setPostingModalOpen(false);
                    return;
                  }
                  handlePostingDelete(editingPostingId);
                  setPostingModalOpen(false);
                  setEditingPostingId(null);
                }}
              >
                🗑
              </button>
            </div>
            <div className={styles.modalBody}>
              <label className={styles.label}>제목</label>
              <input
                className={styles.input}
                value={postingForm.title}
                onChange={(event) =>
                  setPostingForm((prev) => ({ ...prev, title: event.target.value }))
                }
                placeholder="예: 웹 서비스 리뉴얼 케이스 스터디"
              />
              <label className={styles.label}>카테고리</label>
              <input
                className={styles.input}
                value={postingForm.category}
                onChange={(event) =>
                  setPostingForm((prev) => ({ ...prev, category: event.target.value }))
                }
                placeholder="예: News, Blog, Case Study"
              />
              <label className={styles.label}>요약</label>
              <textarea
                className={styles.textarea}
                value={postingForm.excerpt}
                onChange={(event) =>
                  setPostingForm((prev) => ({ ...prev, excerpt: event.target.value }))
                }
                placeholder="게시글 핵심 내용을 2~3문장으로 작성하세요."
              />
              <label className={styles.label}>출처/작성자</label>
              <input
                className={styles.input}
                value={postingForm.source}
                onChange={(event) =>
                  setPostingForm((prev) => ({ ...prev, source: event.target.value }))
                }
                placeholder="예: Convengers Lab"
              />
              <label className={styles.label}>게시 날짜</label>
              <input
                className={styles.input}
                type="date"
                value={postingForm.date}
                onChange={(event) =>
                  setPostingForm((prev) => ({ ...prev, date: event.target.value }))
                }
              />
              <label className={styles.label}>링크</label>
              <input
                className={styles.input}
                value={postingForm.href}
                onChange={(event) =>
                  setPostingForm((prev) => ({ ...prev, href: event.target.value }))
                }
                placeholder="https://"
              />
              <label className={styles.label}>썸네일 업로드</label>
              <input
                className={styles.input}
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) {
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (typeof reader.result === "string") {
                      setPostingForm((prev) => ({ ...prev, image: reader.result }));
                    }
                  };
                  reader.readAsDataURL(file);
                }}
              />
              {postingForm.image ? (
                <div className={styles.thumbPreview}>
                  <img src={postingForm.image} alt="업로드 썸네일 미리보기" />
                </div>
              ) : null}
            </div>
            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => {
                  resetPostingForm();
                  setPostingModalOpen(false);
                  setEditingPostingId(null);
                }}
              >
                취소
              </button>
              <button type="button" className={styles.primaryButton} onClick={handlePostingSave}>
                {editingPostingId ? "수정 저장" : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}

      {networkingModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setNetworkingModalOpen(false)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>네트워킹 등록</h3>
                <p className={styles.muted}>/networking에 노출될 항목을 입력하세요.</p>
              </div>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="네트워킹 삭제"
                onClick={() => {
                  if (!editingNetworkingId) {
                    setNetworkingModalOpen(false);
                    return;
                  }
                  handleNetworkingDelete(editingNetworkingId);
                  setNetworkingModalOpen(false);
                  setEditingNetworkingId(null);
                }}
              >
                🗑
              </button>
            </div>
            <div className={styles.modalBody}>
              <label className={styles.label}>제목</label>
              <input
                className={styles.input}
                value={networkingForm.title}
                onChange={(event) =>
                  setNetworkingForm((prev) => ({ ...prev, title: event.target.value }))
                }
                placeholder="예: SOLPCLUB 네트워킹 나이트"
              />
              <label className={styles.label}>카테고리</label>
              <select
                className={styles.select}
                value={networkingForm.category}
                onChange={(event) =>
                  setNetworkingForm((prev) => ({ ...prev, category: event.target.value }))
                }
              >
                {networkingCategories.length === 0 ? (
                  <option value="Networking">Networking</option>
                ) : (
                  networkingCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))
                )}
              </select>
              <label className={styles.label}>날짜</label>
              <input
                className={styles.input}
                type="date"
                value={networkingForm.date}
                onChange={(event) =>
                  setNetworkingForm((prev) => ({ ...prev, date: event.target.value }))
                }
              />
              <label className={styles.label}>장소</label>
              <input
                className={styles.input}
                value={networkingForm.location}
                onChange={(event) =>
                  setNetworkingForm((prev) => ({ ...prev, location: event.target.value }))
                }
                placeholder="예: Seoul"
              />
              <label className={styles.label}>상태</label>
              <select
                className={styles.select}
                value={networkingForm.status}
                onChange={(event) =>
                  setNetworkingForm((prev) => ({ ...prev, status: event.target.value }))
                }
              >
                <option value="upcoming">예정</option>
                <option value="past">지난 일정</option>
              </select>
              <label className={styles.label}>설명</label>
              <textarea
                className={styles.textarea}
                value={networkingForm.description}
                onChange={(event) =>
                  setNetworkingForm((prev) => ({ ...prev, description: event.target.value }))
                }
                placeholder="간단한 설명을 입력하세요."
              />
              <label className={styles.label}>이미지 업로드</label>
              <input
                className={styles.input}
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) {
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (typeof reader.result === "string") {
                      setNetworkingForm((prev) => ({ ...prev, image: reader.result }));
                    }
                  };
                  reader.readAsDataURL(file);
                }}
              />
              {networkingForm.image ? (
                <div className={styles.thumbPreview}>
                  <img src={networkingForm.image} alt="업로드 이미지 미리보기" />
                </div>
              ) : null}
            </div>
            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => {
                  resetNetworkingForm();
                  setNetworkingModalOpen(false);
                  setEditingNetworkingId(null);
                }}
              >
                취소
              </button>
              <button type="button" className={styles.primaryButton} onClick={handleNetworkingSave}>
                {editingNetworkingId ? "수정 저장" : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}

      {networkingApplicantModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setNetworkingApplicantModalOpen(false)}
        >
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>지원자 목록</h3>
                <p className={styles.muted}>{networkingApplicantTitle}</p>
              </div>
            </div>
            <div className={styles.modalBody}>
              {networkingApplicants.length === 0 ? (
                <p className={styles.muted}>지원자가 없습니다.</p>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Applicant</th>
                      <th>Email</th>
                      <th>Applied at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {networkingApplicants.map((applicant) => (
                      <tr key={applicant.id}>
                        <td>{applicant.name}</td>
                        <td>{applicant.email}</td>
                        <td>{new Date(applicant.appliedAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setNetworkingApplicantModalOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mockUsers = [
  {
    name: "Eunji Park",
    email: "eunji@convengers.studio",
    role: "Partner",
    tags: ["PROJECT_VIEW", "COMMUNITY_VIEW", "PROFILE_VIEW"],
  },
  {
    name: "Minho Lee",
    email: "minho@convengers.studio",
    role: "Contributor",
    tags: ["PROJECT_VIEW", "POSTING_VIEW"],
  },
  {
    name: "Jisoo Kim",
    email: "jisoo@convengers.studio",
    role: "Creator",
    tags: ["PROFILE_VIEW", "PORTFOLIO_VIEW", "RATINGS_VIEW"],
  },
  {
    name: "Daniel Choi",
    email: "daniel@convengers.studio",
    role: "Admin",
    tags: ["ADMIN", "BILLING_VIEW", "PROJECT_VIEW"],
  },
];

const defaultPagePermissionRows = [
  { path: "/app", name: "Dashboard" },
  { path: "/app/projects", name: "Projects" },
  { path: "/app/gallery", name: "Gallery" },
  { path: "/app/postings", name: "Postings" },
  { path: "/app/networkings", name: "Networkings" },
  { path: "/app/applications", name: "Community" },
  { path: "/app/profile", name: "Profile" },
  { path: "/app/admin", name: "Admin" },
];

function AdminTagsTab() {
  const [tags, setTags] = useState<StoredTag[]>(getStoredTags());
  const [newTagName, setNewTagName] = useState("");
  const [newTagDescription, setNewTagDescription] = useState("");
  const [newTagCategory, setNewTagCategory] = useState<StoredTag["category"]>("page");
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [tagError, setTagError] = useState("");
  const [editingTagName, setEditingTagName] = useState<string | null>(null);
  const [editTagName, setEditTagName] = useState("");
  const [editTagDescription, setEditTagDescription] = useState("");
  const [editTagCategory, setEditTagCategory] = useState<StoredTag["category"]>("page");
  const [editTagError, setEditTagError] = useState("");

  const normalizeTagName = (value: string) =>
    value
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "_")
      .replace(/[^A-Z0-9_]/g, "");

  useEffect(() => {
    setTags(getStoredTags());
  }, []);

  const handleAddTag = () => {
    const name = normalizeTagName(newTagName);
    if (!name) {
      setTagError("태그 이름을 입력하세요.");
      return;
    }
    if (tags.some((tag) => tag.name === name)) {
      setTagError("이미 존재하는 태그입니다.");
      return;
    }
    const updated = [...tags, { name, description: newTagDescription.trim() }];
    const categorized = updated.map((tag) => ({
      ...tag,
      category: tag.category ?? "page",
    }));
    categorized[categorized.length - 1] = {
      ...categorized[categorized.length - 1],
      category: newTagCategory ?? "page",
    };
    saveStoredTags(categorized);
    setTags(getStoredTags());
    setNewTagName("");
    setNewTagDescription("");
    setNewTagCategory("page");
    setTagError("");
    setTagModalOpen(false);
    window.dispatchEvent(new Event("tags-updated"));
  };

  const handleDeleteTag = (name: string) => {
    const updated = tags.filter((tag) => tag.name !== name);
    saveStoredTags(updated);
    setTags(getStoredTags());
    const cleanedPermissions = getStoredPagePermissions().map((item) => ({
      ...item,
      requiredTags: item.requiredTags.filter((tag) => tag !== name),
    }));
    saveStoredPagePermissions(cleanedPermissions);
    window.dispatchEvent(new Event("tags-updated"));
    window.dispatchEvent(new Event("page-permissions-updated"));
  };

  const openEditTagModal = (tag: StoredTag) => {
    setEditingTagName(tag.name);
    setEditTagName(tag.name);
    setEditTagDescription(tag.description ?? "");
    setEditTagCategory(tag.category ?? "page");
    setEditTagError("");
  };

  const handleEditTag = () => {
    const normalized = normalizeTagName(editTagName);
    if (!normalized) {
      setEditTagError("태그 이름을 입력하세요.");
      return;
    }
    if (normalized !== editingTagName && tags.some((tag) => tag.name === normalized)) {
      setEditTagError("이미 존재하는 태그입니다.");
      return;
    }
    const updated = tags.map((tag) => {
      if (tag.name !== editingTagName) {
        return tag;
      }
      return {
        ...tag,
        name: normalized,
        description: editTagDescription.trim(),
        category: editTagCategory ?? "page",
      };
    });
    saveStoredTags(updated);
    setTags(getStoredTags());
    setEditingTagName(null);
    setEditTagError("");
    window.dispatchEvent(new Event("tags-updated"));
  };

  const getUsage = (name: string) =>
    mockUsers.filter((user) => user.tags.includes(name)).length;

  return (
    <div className={styles.cardGrid}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3>Tag catalog</h3>
            <p className={styles.muted}>
              태그 추가/삭제는 임시 로컬 저장소에 반영됩니다.
            </p>
          </div>
          <button
            className={styles.primaryButton}
            type="button"
            onClick={() => {
              setTagError("");
              setTagModalOpen(true);
            }}
          >
            태그 추가하기
          </button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tag</th>
              <th>Description</th>
              <th>Usage</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.name}>
                <td>{tag.name}</td>
                <td>{tag.description || "-"}</td>
                <td>{getUsage(tag.name)}</td>
                <td>{tag.category === "event" ? "이벤트성" : "페이지 권한"}</td>
                <td>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label={`${tag.name} 편집`}
                    onClick={() => openEditTagModal(tag)}
                  >
                    ✎
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {tagModalOpen ? (
        <div className={styles.modalOverlay} onClick={() => setTagModalOpen(false)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>태그 추가</h3>
                <p className={styles.muted}>새 태그 정보를 입력하세요.</p>
              </div>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setTagModalOpen(false)}
              >
                닫기
              </button>
            </div>
            <div className={styles.modalBody}>
              <label className={styles.label}>Tag name</label>
              <input
                className={styles.input}
                value={newTagName}
                onChange={(event) => setNewTagName(event.target.value)}
                placeholder="예: PROJECT_VIEW"
              />
              <label className={styles.label}>Description</label>
              <input
                className={styles.input}
                value={newTagDescription}
                onChange={(event) => setNewTagDescription(event.target.value)}
                placeholder="태그 설명을 입력하세요"
              />
              <label className={styles.label}>Category</label>
              <select
                className={styles.select}
                value={newTagCategory ?? "page"}
                onChange={(event) =>
                  setNewTagCategory(event.target.value as StoredTag["category"])
                }
              >
                <option value="page">페이지 권한</option>
                <option value="event">이벤트성</option>
                </select>
              {tagError ? <p className={styles.formError}>{tagError}</p> : null}
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => setTagModalOpen(false)}
              >
                취소
              </button>
              <button className={styles.primaryButton} type="button" onClick={handleAddTag}>
                Add tag
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {editingTagName ? (
        <div className={styles.modalOverlay} onClick={() => setEditingTagName(null)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>태그 편집</h3>
                <p className={styles.muted}>태그 정보를 수정하세요.</p>
              </div>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="태그 삭제"
                onClick={() => {
                  if (!editingTagName) {
                    return;
                  }
                  if (!window.confirm("이 태그를 삭제할까요?")) {
                    return;
                  }
                  handleDeleteTag(editingTagName);
                  setEditingTagName(null);
                }}
              >
                🗑
              </button>
            </div>
            <div className={styles.modalBody}>
              <label className={styles.label}>Tag name</label>
              <input
                className={styles.input}
                value={editTagName}
                onChange={(event) => setEditTagName(event.target.value)}
                placeholder="예: PROJECT_VIEW"
              />
              <label className={styles.label}>Description</label>
              <input
                className={styles.input}
                value={editTagDescription}
                onChange={(event) => setEditTagDescription(event.target.value)}
                placeholder="태그 설명을 입력하세요"
              />
              <label className={styles.label}>Category</label>
              <select
                className={styles.select}
                value={editTagCategory ?? "page"}
                onChange={(event) =>
                  setEditTagCategory(event.target.value as StoredTag["category"])
                }
              >
                <option value="page">페이지 권한</option>
                <option value="event">이벤트성</option>
              </select>
              {editTagError ? <p className={styles.formError}>{editTagError}</p> : null}
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => setEditingTagName(null)}
              >
                취소
              </button>
              <button className={styles.primaryButton} type="button" onClick={handleEditTag}>
                저장
              </button>
            </div>
          </div>
        </div>
      ) : null}

    </div>
  );
}

function AdminUsersTab() {
  const [tags, setTags] = useState<StoredTag[]>(getStoredTags());
  const [users, setUsers] = useState(mockUsers);
  const [editingUserEmail, setEditingUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const refreshTags = () => setTags(getStoredTags());
    refreshTags();
    window.addEventListener("tags-updated", refreshTags);
    return () => {
      window.removeEventListener("tags-updated", refreshTags);
    };
  }, []);

  const editingUser = users.find((user) => user.email === editingUserEmail) ?? null;
  const pageTags = tags.filter((tag) => tag.category !== "event");
  const eventTags = tags.filter((tag) => tag.category === "event");

  const toggleUserTag = (email: string, tag: string) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.email !== email) {
          return user;
        }
        const hasTag = user.tags.includes(tag);
        const nextTags = hasTag
          ? user.tags.filter((existing) => existing !== tag)
          : [...user.tags, tag];
        return { ...user, tags: nextTags };
      })
    );
  };

  return (
    <div className={styles.cardGrid}>
      <div className={styles.card}>
        <h3>Users</h3>
        <p className={styles.muted}>
          Search/filter and tag assignment will be wired to DB later.
        </p>
        <div className={styles.searchRow}>
          <input className={styles.input} placeholder="Search by name or email" />
          <select className={styles.select}>
            <option value="">Role filter</option>
            <option>Partner</option>
            <option>Contributor</option>
            <option>Creator</option>
            <option>Admin</option>
          </select>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>
                  <strong>{user.name}</strong>
                  <div className={styles.muted}>{user.email}</div>
                </td>
                <td>{user.role}</td>
                <td>
                  <div className={styles.tagRow}>
                    {user.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label={`${user.name} 태그 편집`}
                    onClick={() => setEditingUserEmail(user.email)}
                  >
                    ✎
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser ? (
        <div className={styles.modalOverlay} onClick={() => setEditingUserEmail(null)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>{editingUser.name} 태그 편집</h3>
                <p className={styles.muted}>{editingUser.email}</p>
              </div>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setEditingUserEmail(null)}
              >
                닫기
              </button>
            </div>
            <div className={styles.modalBody}>
              {tags.length === 0 ? (
                <p className={styles.muted}>등록된 태그가 없습니다.</p>
              ) : (
                <div className={styles.formStack}>
                  <div className={styles.formBlock}>
                    <h4 className={styles.sectionTitle}>페이지 권한</h4>
                    {pageTags.length === 0 ? (
                      <p className={styles.muted}>페이지 권한 태그가 없습니다.</p>
                    ) : (
                      <div className={styles.checkboxGrid}>
                        {pageTags.map((tag) => (
                          <label key={tag.name} className={styles.checkboxItem}>
                            <input
                              type="checkbox"
                              checked={editingUser.tags.includes(tag.name)}
                              onChange={() => toggleUserTag(editingUser.email, tag.name)}
                            />
                            <span>{tag.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={styles.formBlock}>
                    <h4 className={styles.sectionTitle}>이벤트성</h4>
                    {eventTags.length === 0 ? (
                      <p className={styles.muted}>이벤트성 태그가 없습니다.</p>
                    ) : (
                      <div className={styles.checkboxGrid}>
                        {eventTags.map((tag) => (
                          <label key={tag.name} className={styles.checkboxItem}>
                            <input
                              type="checkbox"
                              checked={editingUser.tags.includes(tag.name)}
                              onChange={() => toggleUserTag(editingUser.email, tag.name)}
                            />
                            <span>{tag.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AdminPagePermissionsTab() {
  const [permissions, setPermissions] = useState<PagePermissionConfig[]>(
    getStoredPagePermissions()
  );
  const [tags, setTags] = useState<StoredTag[]>(getStoredTags());
  const [editingPath, setEditingPath] = useState<string | null>(null);

  useEffect(() => {
    const refresh = () => {
      setPermissions(getStoredPagePermissions());
      setTags(getStoredTags());
    };
    refresh();
    window.addEventListener("tags-updated", refresh);
    return () => {
      window.removeEventListener("tags-updated", refresh);
    };
  }, []);

  const toggleTag = (path: string, tag: string) => {
    setPermissions((prev) =>
      prev.map((item) => {
        if (item.path !== path) {
          return item;
        }
        const hasTag = item.requiredTags.includes(tag);
        const nextTags = hasTag
          ? item.requiredTags.filter((existing) => existing !== tag)
          : [...item.requiredTags, tag];
        return { ...item, requiredTags: nextTags };
      })
    );
  };

  const handleSave = () => {
    saveStoredPagePermissions(permissions);
    window.dispatchEvent(new Event("page-permissions-updated"));
  };

  const handleReset = () => {
    resetStoredPagePermissions();
    setPermissions(getStoredPagePermissions());
    window.dispatchEvent(new Event("page-permissions-updated"));
  };

  const editingRow = defaultPagePermissionRows.find((row) => row.path === editingPath);
  const editingPermissions = permissions.find((item) => item.path === editingPath);
  const activeTags = editingPermissions?.requiredTags ?? [];
  const pageTags = tags.filter((tag) => tag.category !== "event");

  return (
    <div className={styles.card}>
      <h3>페이지 권한</h3>
      <p className={styles.muted}>
        /app 헤더에 노출되는 페이지의 접근 태그를 관리합니다.
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Page</th>
            <th>Path</th>
            <th>Required tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {defaultPagePermissionRows.map((row) => {
            const current = permissions.find((item) => item.path === row.path);
            return (
              <tr key={row.path}>
                <td>{row.name}</td>
                <td>{row.path}</td>
                <td>
                  {current?.requiredTags.length ? (
                    <div className={styles.tagRow}>
                      {current.requiredTags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className={styles.muted}>없음</span>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label={`${row.name} 권한 수정`}
                    onClick={() => setEditingPath(row.path)}
                  >
                    ✎
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {editingRow ? (
        <div className={styles.modalOverlay} onClick={() => setEditingPath(null)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>{editingRow.name} 권한 편집</h3>
                <p className={styles.muted}>{editingRow.path} 접근 태그를 선택하세요.</p>
              </div>
            </div>
            <div className={styles.modalBody}>
              {pageTags.length === 0 ? (
                <p className={styles.muted}>등록된 태그가 없습니다.</p>
              ) : (
                <div className={styles.checkboxGrid}>
                  {pageTags.map((tag) => (
                    <label key={tag.name} className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        checked={activeTags.includes(tag.name)}
                        onChange={() => toggleTag(editingRow.path, tag.name)}
                      />
                      <span>{tag.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setEditingPath(null)}
              >
                닫기
              </button>
              <button type="button" className={styles.primaryButton} onClick={handleSave}>
                저장
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const categoryGroups: { value: StoredCategoryGroup; label: string }[] = [
  { value: "projects", label: "Projects" },
  { value: "networkings", label: "Networkings" },
  { value: "postings", label: "Postings" },
];

function AdminCategoriesTab() {
  const [categories, setCategories] = useState<StoredCategory[]>(getStoredCategories());
  const [editingGroup, setEditingGroup] = useState<StoredCategoryGroup | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    setCategories(getStoredCategories());
  }, []);

  const handleAddCategory = () => {
    if (!editingGroup) {
      return;
    }
    const name = newCategoryName.trim();
    if (!name) {
      setCategoryError("카테고리 이름을 입력하세요.");
      return;
    }
    const duplicate = categories.some(
      (item) => item.group === editingGroup && item.name === name
    );
    if (duplicate) {
      setCategoryError("이미 존재하는 카테고리입니다.");
      return;
    }
    const next = [...categories, { id: `cat-${Date.now()}`, group: editingGroup, name }];
    saveStoredCategories(next);
    setCategories(getStoredCategories());
    setNewCategoryName("");
    setCategoryError("");
    window.dispatchEvent(new Event("categories-updated"));
  };

  const handleDeleteCategory = (categoryId: string) => {
    const next = categories.filter((item) => item.id !== categoryId);
    saveStoredCategories(next);
    setCategories(getStoredCategories());
    window.dispatchEvent(new Event("categories-updated"));
  };

  const groupedLabel = (group: StoredCategoryGroup) =>
    categoryGroups.find((item) => item.value === group)?.label ?? group;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3>Categories</h3>
          <p className={styles.muted}>프로젝트, 포스팅, 네트워킹 카테고리를 관리합니다.</p>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Group</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryGroups.map((group) => {
            const groupItems = categories.filter((item) => item.group === group.value);
            return (
              <tr key={group.value}>
                <td>{group.label}</td>
                <td>
                  {groupItems.length === 0 ? (
                    <span className={styles.muted}>없음</span>
                  ) : (
                    <div className={styles.tagRow}>
                      {groupItems.map((item) => (
                        <span key={item.id} className={styles.tag}>
                          {item.name}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label={`${group.label} 편집`}
                    onClick={() => {
                      setEditingGroup(group.value);
                      setNewCategoryName("");
                      setCategoryError("");
                    }}
                  >
                    ✎
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {editingGroup ? (
        <div className={styles.modalOverlay} onClick={() => setEditingGroup(null)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>{groupedLabel(editingGroup)} 관리</h3>
                <p className={styles.muted}>카테고리를 추가하거나 삭제하세요.</p>
              </div>
            </div>
            <div className={styles.modalBody}>
              <label className={styles.label}>Category name</label>
              <input
                className={styles.input}
                value={newCategoryName}
                onChange={(event) => setNewCategoryName(event.target.value)}
                placeholder="예: Web Development"
              />
              {categoryError ? <p className={styles.formError}>{categoryError}</p> : null}
              <div className={styles.tagList}>
                {categories
                  .filter((item) => item.group === editingGroup)
                  .map((item) => (
                    <div key={item.id} className={styles.tagItem}>
                      <span className={styles.tag}>{item.name}</span>
                      <button
                        type="button"
                        className={styles.iconButton}
                        aria-label={`${item.name} 삭제`}
                        onClick={() => handleDeleteCategory(item.id)}
                      >
                        🗑
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => setEditingGroup(null)}
              >
                취소
              </button>
              <button className={styles.primaryButton} type="button" onClick={handleAddCategory}>
                Add category
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
