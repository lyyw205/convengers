export type SectionPermissionConfig = {
  id: string;
  requiredTags: string[];
};

const STORAGE_KEY = "convengers-section-permissions";

const defaultPermissions: SectionPermissionConfig[] = [
  { id: "/app/projects:recruiting", requiredTags: ["scope:section:projects:recruiting"] },
];

const isBrowser = () => typeof window !== "undefined";

const normalizePermissions = (permissions: SectionPermissionConfig[]) =>
  permissions.map((permission) => {
    const hasLegacyTag = permission.requiredTags.some((tag) => !tag.startsWith("scope:"));
    if (!hasLegacyTag) {
      return permission;
    }
    return {
      ...permission,
      requiredTags: ["scope:section:projects:recruiting"],
    };
  });

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
    const normalized = normalizePermissions(parsed);
    if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
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
