export type SectionPermissionConfig = {
  id: string;
  requiredTags: string[];
};

const STORAGE_KEY = "convengers-section-permissions";

const defaultPermissions: SectionPermissionConfig[] = [
  { id: "/app/projects:recruiting", requiredTags: ["ADMIN"] },
  { id: "/app/projects:portfolio", requiredTags: [] },
];

const isBrowser = () => typeof window !== "undefined";

export const getStoredSectionPermissions = (): SectionPermissionConfig[] => {
  if (!isBrowser()) {
    return defaultPermissions;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultPermissions;
    }
    const parsed = JSON.parse(raw) as SectionPermissionConfig[];
    if (!Array.isArray(parsed)) {
      return defaultPermissions;
    }
    return parsed;
  } catch {
    return defaultPermissions;
  }
};

export const saveStoredSectionPermissions = (permissions: SectionPermissionConfig[]) => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(permissions));
};

export const resetStoredSectionPermissions = () => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPermissions));
};
