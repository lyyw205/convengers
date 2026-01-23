export type StoredTag = {
  name: string;
  description?: string;
  category?: "page" | "event";
};

const STORAGE_KEY = "convengers-tags";

const defaultTags: StoredTag[] = [
  { name: "scope:page:dashboard", description: "Admin dashboard access", category: "page" },
  { name: "scope:page:projects", description: "Projects page access", category: "page" },
  { name: "scope:page:postings", description: "Postings management access", category: "page" },
  { name: "scope:page:applications", description: "Applications access", category: "page" },
  { name: "scope:page:profile", description: "Profile access", category: "page" },
  { name: "scope:page:admin", description: "Admin console access", category: "page" },
  { name: "scope:page:networkings", description: "Networking access", category: "page" },
  { name: "scope:page:portfolio", description: "Portfolio access", category: "page" },
  { name: "scope:page:ratings", description: "Ratings access", category: "page" },
  { name: "scope:page:billing", description: "Billing access", category: "page" },
  { name: "scope:section:projects:recruiting", description: "Projects recruiting", category: "page" },
  { name: "ST_3", description: "3회 혜택", category: "event" },
  { name: "ST_5", description: "5회 혜택", category: "event" },
  { name: "OFF_5", description: "5% 할인", category: "event" },
];

const isBrowser = () => typeof window !== "undefined";

export const getStoredTags = (): StoredTag[] => {
  if (!isBrowser()) {
    return defaultTags;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultTags;
    }
    const parsed = JSON.parse(raw) as StoredTag[];
    if (!Array.isArray(parsed)) {
      return defaultTags;
    }
    return parsed.map((tag) => ({
      ...tag,
      category: tag.category ?? "page",
    }));
  } catch {
    return defaultTags;
  }
};

export const saveStoredTags = (tags: StoredTag[]) => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tags));
};
