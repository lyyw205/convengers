export type PortfolioUpload = {
  id: string;
  url: string;
  category: string;
  hashtags: string[];
  description: string;
  ownerName: string;
  createdAt: string;
};

const STORAGE_KEY = "convengers-portfolio-uploads";

const isBrowser = () => typeof window !== "undefined";

export const getStoredPortfolioUploads = (): PortfolioUpload[] => {
  if (!isBrowser()) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as PortfolioUpload[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

export const addPortfolioUpload = (upload: PortfolioUpload) => {
  if (!isBrowser()) {
    return;
  }
  const existing = getStoredPortfolioUploads();
  const next = [upload, ...existing];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("portfolio-uploads-updated"));
};
