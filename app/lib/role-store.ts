export type RolePermission = {
  scope: string;
  actions: string[];
};

export type StoredRole = {
  id: string;
  name: string;
  description: string;
  permissions: RolePermission[];
};

const STORAGE_KEY = "convengers-roles";

const defaultRoles: StoredRole[] = [
  {
    id: "role-guest",
    name: "role_guest",
    description: "Public pages view only",
    permissions: [],
  },
  {
    id: "role-member-basic",
    name: "role_member_basic",
    description: "Member pages view + create",
    permissions: [],
  },
  {
    id: "role-member-regular",
    name: "role_member_regular",
    description: "Regular member with edit own",
    permissions: [],
  },
  {
    id: "role-member-pro",
    name: "role_member_pro",
    description: "Pro member with edit any",
    permissions: [],
  },
  {
    id: "role-leader",
    name: "role_leader",
    description: "Leader with publish permissions",
    permissions: [],
  },
  {
    id: "role-admin",
    name: "role_admin",
    description: "Admin manage roles and assign",
    permissions: [],
  },
  {
    id: "role-master",
    name: "role_master",
    description: "Master system manage",
    permissions: [],
  },
];

const isBrowser = () => typeof window !== "undefined";

export const getStoredRoles = (): StoredRole[] => {
  if (!isBrowser()) {
    return defaultRoles;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultRoles;
    }
    const parsed = JSON.parse(raw) as StoredRole[];
    if (!Array.isArray(parsed)) {
      return defaultRoles;
    }
    return parsed.length > 0 ? parsed : defaultRoles;
  } catch {
    return defaultRoles;
  }
};

export const saveStoredRoles = (roles: StoredRole[]) => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
  window.dispatchEvent(new Event("roles-updated"));
};

export const resetStoredRoles = () => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRoles));
  window.dispatchEvent(new Event("roles-updated"));
};
