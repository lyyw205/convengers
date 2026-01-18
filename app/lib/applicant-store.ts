export type Applicant = {
  id: string;
  projectId: string;
  name: string;
  email: string;
  appliedAt: string;
};

const STORAGE_KEY = "convengers-applicants";

const isBrowser = () => typeof window !== "undefined";

const getAllApplicants = (): Applicant[] => {
  if (!isBrowser()) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as Applicant[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

const saveAllApplicants = (items: Applicant[]) => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const addApplicant = (payload: Omit<Applicant, "id" | "appliedAt">) => {
  if (!isBrowser()) {
    return;
  }
  const next: Applicant = {
    ...payload,
    id: `applicant-${Date.now()}`,
    appliedAt: new Date().toISOString(),
  };
  const existing = getAllApplicants();
  saveAllApplicants([next, ...existing]);
};

export const getApplicantsByProjectId = (projectId: string): Applicant[] => {
  return getAllApplicants().filter((item) => item.projectId === projectId);
};
