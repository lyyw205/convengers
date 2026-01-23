export type ContactField = {
  label: string;
  value: string;
};

export type ContactSubmission = {
  id: string;
  tabId: string;
  tabLabel: string;
  submittedAt: string;
  fields: ContactField[];
};

const STORAGE_KEY = "convengers-contact-submissions";
const READ_KEY = "convengers-contact-submissions-read";

const sampleSubmission: ContactSubmission = {
  id: "contact-sample-01",
  tabId: "estimate",
  tabLabel: "견적의뢰",
  submittedAt: "2026-01-20T09:30:00+09:00",
  fields: [
    { label: "회사/팀/개인 이름", value: "Convengers Studio" },
    { label: "연락 이메일", value: "hello@convengers.studio" },
    { label: "프로젝트 유형", value: "AI CODING" },
    { label: "견적 내용", value: "고객지원 챗봇 + 운영 대시보드 구축 문의" },
  ],
};

const isBrowser = () => typeof window !== "undefined";

export const getStoredContactSubmissions = (): ContactSubmission[] => {
  if (!isBrowser()) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [sampleSubmission];
    }
    const parsed = JSON.parse(raw) as ContactSubmission[];
    if (!Array.isArray(parsed)) {
      return [sampleSubmission];
    }
    return parsed.length > 0 ? parsed : [sampleSubmission];
  } catch {
    return [sampleSubmission];
  }
};

export const saveContactSubmission = (submission: ContactSubmission) => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredContactSubmissions();
  const next = [submission, ...existing];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("contact-submissions-updated"));
};

export const getReadContactSubmissionIds = (): string[] => {
  if (!isBrowser()) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(READ_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

export const markContactSubmissionRead = (id: string) => {
  if (!isBrowser()) {
    return;
  }
  const existing = getReadContactSubmissionIds();
  if (existing.includes(id)) {
    return;
  }
  const next = [id, ...existing];
  window.localStorage.setItem(READ_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("contact-submissions-updated"));
};
