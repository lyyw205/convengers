export type PagePermission = {
  requiredTags: string[];
};

export type PagePermissionConfig = {
  path: string;
  requiredTags: string[];
};

const STORAGE_KEY = "convengers-page-permissions";

const defaultPermissions: PagePermissionConfig[] = [
  { path: "/app", requiredTags: [] },
  { path: "/app/projects", requiredTags: [] },
  { path: "/app/postings", requiredTags: [] },
  { path: "/app/applications", requiredTags: [] },
  { path: "/app/profile", requiredTags: [] },
  { path: "/app/ratings", requiredTags: ["scope:page:ratings"] },
  { path: "/app/billing", requiredTags: ["scope:page:billing"] },
  { path: "/app/admin", requiredTags: ["scope:page:admin"] },
];

const isBrowser = () => typeof window !== "undefined";

export const getStoredPagePermissions = (): PagePermissionConfig[] => {
  if (!isBrowser()) {
    return defaultPermissions;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultPermissions;
    }
    const parsed = JSON.parse(raw) as PagePermissionConfig[];
    if (!Array.isArray(parsed)) {
      return defaultPermissions;
    }
    return parsed;
  } catch {
    return defaultPermissions;
  }
};

export const saveStoredPagePermissions = (permissions: PagePermissionConfig[]) => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(permissions));
};

export const resetStoredPagePermissions = () => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPermissions));
};
