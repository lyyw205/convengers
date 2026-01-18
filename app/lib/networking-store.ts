export type StoredNetworking = {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  status: "upcoming" | "past";
  description: string;
  image?: string;
};

const STORAGE_KEY = "convengers-networkings";

const defaultNetworkings: StoredNetworking[] = [
  {
    id: "networking-01",
    title: "서울 커넥션 나이트",
    category: "Networking",
    date: "2025-02-12",
    location: "Seoul",
    status: "past",
    description: "초기 파트너와 네트워킹한 오프라인 모임입니다.",
    image: "",
  },
  {
    id: "networking-02",
    title: "오픈 미팅 라운드",
    category: "Networking",
    date: "2025-02-24",
    location: "Seoul",
    status: "past",
    description: "신규 멤버 소개 세션과 네트워킹을 진행합니다.",
    image: "",
  },
  {
    id: "networking-03",
    title: "지역 챕터 교류",
    category: "Networking",
    date: "2025-03-18",
    location: "Busan",
    status: "upcoming",
    description: "지역 파트너가 모여 협업 사례를 나눕니다.",
    image: "",
  },
  {
    id: "networking-04",
    title: "파트너 리셉션",
    category: "Networking",
    date: "2025-04-20",
    location: "Tokyo",
    status: "upcoming",
    description: "글로벌 파트너십 확대를 위한 네트워크 행사입니다.",
    image: "",
  },
  {
    id: "networking-05",
    title: "커뮤니티 네트워크 데이",
    category: "Networking",
    date: "2025-05-22",
    location: "Singapore",
    status: "upcoming",
    description: "커뮤니티 구성원들이 교류하는 정기 행사입니다.",
    image: "",
  },
  {
    id: "networking-06",
    title: "길드 모임: AI Creator",
    category: "길드 모임",
    date: "2025-02-05",
    location: "Seoul",
    status: "past",
    description: "크리에이터 협업 사례와 워크플로를 공유합니다.",
    image: "",
  },
  {
    id: "networking-07",
    title: "길드 모임: AI Coding",
    category: "길드 모임",
    date: "2025-02-26",
    location: "Seoul",
    status: "past",
    description: "개발 파트너들이 실전 구현 사례를 나눕니다.",
    image: "",
  },
  {
    id: "networking-08",
    title: "길드 모임: AI Branding",
    category: "길드 모임",
    date: "2025-03-27",
    location: "Online",
    status: "upcoming",
    description: "브랜딩 프로젝트의 인사이트와 운영 방식을 공유합니다.",
    image: "",
  },
  {
    id: "networking-09",
    title: "길드 모임: AI Agent",
    category: "길드 모임",
    date: "2025-04-18",
    location: "Seoul",
    status: "upcoming",
    description: "에이전트 설계/운영 사례를 중심으로 이야기합니다.",
    image: "",
  },
  {
    id: "networking-10",
    title: "길드 모임: 운영 자동화",
    category: "길드 모임",
    date: "2025-05-14",
    location: "Busan",
    status: "upcoming",
    description: "운영 효율화를 위한 자동화 사례를 공유합니다.",
    image: "",
  },
  {
    id: "networking-11",
    title: "Conference/포럼 사전 미팅",
    category: "Conference/포럼",
    date: "2025-03-11",
    location: "Online",
    status: "past",
    description: "연사 구성과 세션 방향을 논의합니다.",
    image: "",
  },
  {
    id: "networking-12",
    title: "AI 브랜드 포럼",
    category: "Conference/포럼",
    date: "2025-03-29",
    location: "Seoul",
    status: "upcoming",
    description: "브랜드 협업 사례를 중심으로 세션을 진행합니다.",
    image: "",
  },
  {
    id: "networking-13",
    title: "미디어 & 커머스 컨퍼런스",
    category: "Conference/포럼",
    date: "2025-04-25",
    location: "Seoul",
    status: "upcoming",
    description: "미디어/커머스 AI 활용 사례를 공유합니다.",
    image: "",
  },
  {
    id: "networking-14",
    title: "솔루션 쇼케이스",
    category: "Conference/포럼",
    date: "2025-05-30",
    location: "Tokyo",
    status: "upcoming",
    description: "파트너 솔루션을 소개하는 쇼케이스를 진행합니다.",
    image: "",
  },
  {
    id: "networking-15",
    title: "글로벌 파트너 포럼",
    category: "Conference/포럼",
    date: "2025-06-20",
    location: "Singapore",
    status: "upcoming",
    description: "글로벌 협업 사례 중심의 포럼을 진행합니다.",
    image: "",
  },
  {
    id: "networking-16",
    title: "Hackathon: Automation Lab",
    category: "Hackathon",
    date: "2025-03-08",
    location: "Busan",
    status: "past",
    description: "자동화 과제를 중심으로 팀 빌딩을 진행합니다.",
    image: "",
  },
  {
    id: "networking-17",
    title: "AI Sprint Hackathon",
    category: "Hackathon",
    date: "2025-03-28",
    location: "Seoul",
    status: "upcoming",
    description: "제품 아이디어 검증을 위한 스프린트 해커톤입니다.",
    image: "",
  },
  {
    id: "networking-18",
    title: "Creator Tech Jam",
    category: "Hackathon",
    date: "2025-04-30",
    location: "Online",
    status: "upcoming",
    description: "크리에이터 기술 실험 중심의 해커톤입니다.",
    image: "",
  },
  {
    id: "networking-19",
    title: "Agent Challenge",
    category: "Hackathon",
    date: "2025-05-25",
    location: "Seoul",
    status: "upcoming",
    description: "에이전트 기반 문제 해결을 주제로 진행합니다.",
    image: "",
  },
  {
    id: "networking-20",
    title: "Community Build Day",
    category: "Hackathon",
    date: "2025-06-28",
    location: "Busan",
    status: "upcoming",
    description: "커뮤니티와 함께하는 빌드 데이를 운영합니다.",
    image: "",
  },
];

const isBrowser = () => typeof window !== "undefined";

export const getStoredNetworkings = (): StoredNetworking[] => {
  if (!isBrowser()) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as StoredNetworking[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

export const seedStoredNetworkings = () => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredNetworkings();
  if (existing.length > 0) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNetworkings));
};

export const saveStoredNetworking = (networking: StoredNetworking) => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredNetworkings();
  const next = [networking, ...existing];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const updateStoredNetworking = (networking: StoredNetworking) => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredNetworkings();
  const next = existing.map((item) => (item.id === networking.id ? networking : item));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const deleteStoredNetworkings = (networkingId: string) => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredNetworkings();
  const next = existing.filter((item) => item.id !== networkingId);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};
