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
  { path: "/app/gallery", requiredTags: [] },
  { path: "/app/postings", requiredTags: [] },
  { path: "/app/networkings", requiredTags: [] },
  { path: "/app/applications", requiredTags: [] },
  { path: "/app/profile", requiredTags: [] },
  { path: "/app/portfolio", requiredTags: ["PORTFOLIO_VIEW"] },
  { path: "/app/ratings", requiredTags: ["RATINGS_VIEW"] },
  { path: "/app/billing", requiredTags: ["BILLING_VIEW"] },
  { path: "/app/admin", requiredTags: ["ADMIN"] },
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
