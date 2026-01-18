export type StoredCategoryGroup = "projects" | "networkings" | "postings";

export type StoredCategory = {
  id: string;
  group: StoredCategoryGroup;
  name: string;
};

const STORAGE_KEY = "convengers-categories";

const defaultCategories: StoredCategory[] = [
  { id: "cat-projects-01", group: "projects", name: "Web Development" },
  { id: "cat-projects-02", group: "projects", name: "AI Solution" },
  { id: "cat-projects-03", group: "projects", name: "AI Image/Video" },
  { id: "cat-projects-04", group: "projects", name: "LLM" },
  { id: "cat-networkings-01", group: "networkings", name: "Networking" },
  { id: "cat-networkings-02", group: "networkings", name: "길드 모임" },
  { id: "cat-networkings-03", group: "networkings", name: "Conference/포럼" },
  { id: "cat-networkings-04", group: "networkings", name: "Hackathon" },
  { id: "cat-postings-01", group: "postings", name: "News" },
  { id: "cat-postings-02", group: "postings", name: "Blog" },
  { id: "cat-postings-03", group: "postings", name: "Case Study" },
  { id: "cat-postings-04", group: "postings", name: "Guide" },
  { id: "cat-postings-05", group: "postings", name: "Report" },
];

const isBrowser = () => typeof window !== "undefined";

export const getStoredCategories = (): StoredCategory[] => {
  if (!isBrowser()) {
    return defaultCategories;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultCategories;
    }
    const parsed = JSON.parse(raw) as StoredCategory[];
    if (!Array.isArray(parsed)) {
      return defaultCategories;
    }
    return parsed;
  } catch {
    return defaultCategories;
  }
};

export const saveStoredCategories = (categories: StoredCategory[]) => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};

export const seedStoredCategories = () => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredCategories();
  if (existing.length > 0) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCategories));
};
