export type StoredProject = {
  id: string;
  title: string;
  image: string;
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

const STORAGE_KEY = "convengers-projects";

const defaultProjects: StoredProject[] = [
  {
    id: "project-sample-01",
    title: "AI 고객지원 포털 리뉴얼",
    image: "/refs/ref-01.svg",
    badge: "모집중",
    category: "AI Solution",
    budget: "6,200만원",
    duration: "10주",
    skills: ["LLM", "NLP", "Dashboard"],
    postedAt: "2026-01-02",
    dday: "D-12",
    summary:
      "기존 고객지원 포털의 워크플로를 개선하고, AI 상담 요약 기능을 도입합니다.",
    goals: "응답 시간 25% 개선, CS 처리량 20% 확대",
    targetUsers: "CS 리드, 운영 매니저",
    features: "자동 요약, 티켓 분류, SLA 모니터링",
    techStack: "Next.js, Node.js, PostgreSQL, Redis",
    roles: "프론트엔드, 백엔드, 디자이너",
    workType: "Hybrid",
    location: "Seoul",
    deadline: "2026-02-10",
    contactEmail: "support@company.com",
  },
  {
    id: "project-sample-02",
    title: "커머스 추천 엔진 대시보드",
    image: "/refs/ref-02.svg",
    badge: "모집중",
    category: "LLM",
    budget: "5,400만원",
    duration: "9주",
    skills: ["LLM", "Analytics", "BI"],
    postedAt: "2026-01-04",
    dday: "D-14",
    summary:
      "추천 모델의 성능을 모니터링하고 캠페인 효과를 시각화하는 대시보드 구축.",
    goals: "CTR 10% 개선, 모델 운영 리드타임 30% 단축",
    targetUsers: "데이터팀, 마케팅팀",
    features: "모델 성능 추적, 캠페인 리포트, 알림 시스템",
    techStack: "Next.js, Python, BigQuery",
    roles: "프론트엔드, 데이터 엔지니어",
    workType: "Remote",
    location: "Remote",
    deadline: "2026-02-18",
    contactEmail: "data@company.com",
  },
  {
    id: "project-sample-03",
    title: "AI 브랜딩 자동화 웹앱",
    image: "/refs/ref-03.svg",
    badge: "모집중",
    category: "AI Image/Video",
    budget: "4,800만원",
    duration: "8주",
    skills: ["Vision", "Design Systems", "Web"],
    postedAt: "2026-01-06",
    dday: "D-16",
    summary:
      "브랜드 가이드와 시각 자산을 자동 생성하는 웹앱을 개발합니다.",
    goals: "디자인 제작 시간 40% 단축",
    targetUsers: "브랜드 매니저, 디자이너",
    features: "브랜드 키트 생성, 템플릿 관리, 내보내기",
    techStack: "Next.js, Node.js, S3",
    roles: "프론트엔드, 백엔드, UX 디자이너",
    workType: "Hybrid",
    location: "Seoul / Pangyo",
    deadline: "2026-02-22",
    contactEmail: "brand@company.com",
  },
  {
    id: "project-sample-04",
    title: "기업용 협업 툴 마이그레이션",
    image: "/refs/ref-01.svg",
    badge: "모집중",
    category: "Web Development",
    budget: "7,000만원",
    duration: "12주",
    skills: ["React", "TypeScript", "Migration"],
    postedAt: "2026-01-08",
    dday: "D-18",
    summary:
      "레거시 협업 툴을 신규 스택으로 이전하고 사용자 교육을 지원합니다.",
    goals: "이관 오류율 0.5% 이하",
    targetUsers: "대기업 운영팀",
    features: "데이터 이관, 사용자 온보딩, 권한 관리",
    techStack: "React, Node.js, PostgreSQL",
    roles: "프론트엔드, 백엔드, PM",
    workType: "On-site",
    location: "Seoul",
    deadline: "2026-03-05",
    contactEmail: "ops@company.com",
  },
  {
    id: "project-sample-05",
    title: "AI 리서치 리포트 생성 플랫폼",
    image: "/refs/ref-02.svg",
    badge: "모집중",
    category: "AI Solution",
    budget: "6,800만원",
    duration: "11주",
    skills: ["LLM", "RAG", "Frontend"],
    postedAt: "2026-01-10",
    dday: "D-20",
    summary:
      "리서치 자료를 자동 수집하고 보고서를 생성하는 플랫폼을 구축합니다.",
    goals: "리서치 제작 리드타임 50% 단축",
    targetUsers: "리서치팀, 전략기획팀",
    features: "문서 수집, 자동 요약, 템플릿 생성",
    techStack: "Next.js, Node.js, Vector DB",
    roles: "프론트엔드, 백엔드, AI 엔지니어",
    workType: "Remote",
    location: "Remote",
    deadline: "2026-03-10",
    contactEmail: "research@company.com",
  },
];

const isBrowser = () => typeof window !== "undefined";

export const getStoredProjects = (): StoredProject[] => {
  if (!isBrowser()) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as StoredProject[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

export const seedStoredProjects = () => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredProjects();
  if (existing.length > 0) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
};

export const saveStoredProject = (project: StoredProject) => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredProjects();
  const next = [project, ...existing];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const updateStoredProject = (project: StoredProject) => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredProjects();
  const next = existing.map((item) => (item.id === project.id ? project : item));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const deleteStoredProject = (projectId: string) => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredProjects();
  const next = existing.filter((item) => item.id !== projectId);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};
