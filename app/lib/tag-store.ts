export type StoredTag = {
  name: string;
  description?: string;
  category?: "page" | "event";
};

const STORAGE_KEY = "convengers-tags";

const defaultTags: StoredTag[] = [
  { name: "PROJECT_VIEW", description: "Access to project dashboards", category: "page" },
  { name: "POSTING_VIEW", description: "Access to postings and applicants", category: "page" },
  { name: "NETWORKINGS_VIEW", description: "Access to networking updates", category: "page" },
  { name: "COMMUNITY_VIEW", description: "Community and applications access", category: "page" },
  { name: "PROFILE_VIEW", description: "Profile management access", category: "page" },
  { name: "PORTFOLIO_VIEW", description: "Portfolio uploads and reviews", category: "page" },
  { name: "RATINGS_VIEW", description: "Ratings and feedback access", category: "page" },
  { name: "BILLING_VIEW", description: "Billing and settlements access", category: "page" },
  { name: "ADMIN", description: "Admin console access", category: "page" },
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
