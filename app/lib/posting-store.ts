export type StoredPosting = {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  date: string;
  category: string;
  href: string;
  image?: string;
};

const STORAGE_KEY = "convengers-postings";

const defaultPostings: StoredPosting[] = [
  {
    id: "posting-sample-01",
    title: "AI 기반 웹 서비스 리뉴얼 케이스 스터디",
    excerpt: "기존 서비스의 구조를 재설계하고 사용자 경험을 개선한 프로젝트입니다.",
    source: "Convengers Lab",
    date: "2025-01-12",
    category: "Case Study",
    href: "https://example.com/posting-01",
  },
  {
    id: "posting-sample-02",
    title: "B2B 대시보드 구축을 위한 데이터 아키텍처",
    excerpt: "확장 가능한 데이터 구조와 운영 전략을 정리한 글입니다.",
    source: "Convengers Lab",
    date: "2025-01-20",
    category: "Blog",
    href: "https://example.com/posting-02",
  },
  {
    id: "posting-sample-03",
    title: "LLM 기반 고객 지원 자동화 파일럿",
    excerpt: "FAQ 자동응답 시스템의 설계와 운영 지표를 공유합니다.",
    source: "Convengers Insight",
    date: "2025-02-02",
    category: "News",
    href: "https://example.com/posting-03",
  },
  {
    id: "posting-sample-04",
    title: "디자인 시스템 구축 체크리스트",
    excerpt: "디자인 팀과 개발팀이 합의해야 할 핵심 항목을 정리했습니다.",
    source: "Convengers Design",
    date: "2025-02-10",
    category: "Guide",
    href: "https://example.com/posting-04",
  },
  {
    id: "posting-sample-05",
    title: "프로덕트 리포트: 신규 기능 성공 요인",
    excerpt: "런칭 성과를 바탕으로 기능 기획의 성공 요인을 분석합니다.",
    source: "Convengers Lab",
    date: "2025-02-18",
    category: "Report",
    href: "https://example.com/posting-05",
  },
];

const isBrowser = () => typeof window !== "undefined";

export const getStoredPostings = (): StoredPosting[] => {
  if (!isBrowser()) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as StoredPosting[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

export const seedStoredPostings = () => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredPostings();
  if (existing.length > 0) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPostings));
};

export const saveStoredPosting = (posting: StoredPosting) => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredPostings();
  const next = [posting, ...existing];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const updateStoredPosting = (posting: StoredPosting) => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredPostings();
  const next = existing.map((item) => (item.id === posting.id ? posting : item));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const deleteStoredPosting = (postingId: string) => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredPostings();
  const next = existing.filter((item) => item.id !== postingId);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};
