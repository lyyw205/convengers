export type NetworkingApplicant = {
  id: string;
  networkingId: string;
  name: string;
  email: string;
  appliedAt: string;
};

const STORAGE_KEY = "convengers-networking-applicants";

const isBrowser = () => typeof window !== "undefined";

const getAllApplicants = (): NetworkingApplicant[] => {
  if (!isBrowser()) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as NetworkingApplicant[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

const saveAllApplicants = (items: NetworkingApplicant[]) => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const addNetworkingApplicant = (
  payload: Omit<NetworkingApplicant, "id" | "appliedAt">
) => {
  if (!isBrowser()) {
    return;
  }
  const next: NetworkingApplicant = {
    ...payload,
    id: `networking-applicant-${Date.now()}`,
    appliedAt: new Date().toISOString(),
  };
  const existing = getAllApplicants();
  saveAllApplicants([next, ...existing]);
};

export const getNetworkingApplicantsById = (networkingId: string) => {
  return getAllApplicants().filter((item) => item.networkingId === networkingId);
};
