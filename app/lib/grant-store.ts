export type Grant = {
  id: string;
  principalType: "user" | "role";
  principalId: string;
  scope: string;
  actions: string[];
};

const STORAGE_KEY = "convengers-grants";

const isBrowser = () => typeof window !== "undefined";

export const getStoredGrants = (): Grant[] => {
  if (!isBrowser()) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as Grant[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

export const saveStoredGrants = (grants: Grant[]) => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(grants));
  window.dispatchEvent(new Event("grants-updated"));
};

export const upsertGrant = (grant: Grant) => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredGrants();
  const next = existing.some((item) => item.id === grant.id)
    ? existing.map((item) => (item.id === grant.id ? grant : item))
    : [grant, ...existing];
  saveStoredGrants(next);
};

export const deleteGrant = (grantId: string) => {
  if (!isBrowser()) {
    return;
  }
  const next = getStoredGrants().filter((item) => item.id !== grantId);
  saveStoredGrants(next);
};
