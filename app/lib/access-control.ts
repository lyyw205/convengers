export type CurrentUser = {
  isAuthenticated: boolean;
  tags: string[];
};

export const getMockUser = (): CurrentUser => ({
  isAuthenticated: true,
  tags: [
    "PROJECT_VIEW",
    "POSTING_VIEW",
    "NETWORKINGS_VIEW",
    "COMMUNITY_VIEW",
    "PROFILE_VIEW",
    "ADMIN",
  ],
});

export const hasAllTags = (userTags: string[], requiredTags: string[] = []) =>
  requiredTags.every((tag) => userTags.includes(tag));
