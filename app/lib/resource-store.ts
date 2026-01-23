export type PageResource = {
  key: string;
  title: string;
  path: string;
};

export type SectionResource = {
  key: string;
  pageKey: string;
  title: string;
};

const PAGE_KEY = "convengers-page-resources";
const SECTION_KEY = "convengers-section-resources";

const defaultPages: PageResource[] = [
  { key: "dashboard", title: "Dashboard", path: "/app" },
  { key: "projects", title: "Projects", path: "/app/projects" },
  { key: "postings", title: "Postings", path: "/app/postings" },
  { key: "applications", title: "Community", path: "/app/applications" },
  { key: "profile", title: "Profile", path: "/app/profile" },
  { key: "admin", title: "Admin", path: "/app/admin" },
  { key: "ratings", title: "Ratings", path: "/app/ratings" },
  { key: "billing", title: "Billing", path: "/app/billing" },
  { key: "networkings", title: "Networkings", path: "/networking" },
  { key: "portfolio", title: "Portfolio", path: "/portfolio" },
  { key: "contact", title: "Contact", path: "/contact" },
];

const defaultSections: SectionResource[] = [
  { key: "projects:recruiting", pageKey: "projects", title: "모집중 프로젝트" },
];

const isBrowser = () => typeof window !== "undefined";

export const getStoredPageResources = (): PageResource[] => {
  if (!isBrowser()) {
    return defaultPages;
  }
  try {
    const raw = window.localStorage.getItem(PAGE_KEY);
    if (!raw) {
      return defaultPages;
    }
    const parsed = JSON.parse(raw) as PageResource[];
    if (!Array.isArray(parsed)) {
      return defaultPages;
    }
    return parsed.length > 0 ? parsed : defaultPages;
  } catch {
    return defaultPages;
  }
};

export const saveStoredPageResources = (pages: PageResource[]) => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(PAGE_KEY, JSON.stringify(pages));
  window.dispatchEvent(new Event("resources-updated"));
};

export const resetStoredPageResources = () => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(PAGE_KEY, JSON.stringify(defaultPages));
  window.dispatchEvent(new Event("resources-updated"));
};

export const getStoredSectionResources = (): SectionResource[] => {
  if (!isBrowser()) {
    return defaultSections;
  }
  try {
    const raw = window.localStorage.getItem(SECTION_KEY);
    if (!raw) {
      return defaultSections;
    }
    const parsed = JSON.parse(raw) as SectionResource[];
    if (!Array.isArray(parsed)) {
      return defaultSections;
    }
    return parsed.length > 0 ? parsed : defaultSections;
  } catch {
    return defaultSections;
  }
};

export const saveStoredSectionResources = (sections: SectionResource[]) => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(SECTION_KEY, JSON.stringify(sections));
  window.dispatchEvent(new Event("resources-updated"));
};

export const resetStoredSectionResources = () => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(SECTION_KEY, JSON.stringify(defaultSections));
  window.dispatchEvent(new Event("resources-updated"));
};
