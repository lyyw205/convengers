export type CurrentUser = {
  isAuthenticated: boolean;
  tags: string[];
};

export const getMockUser = (): CurrentUser => ({
  isAuthenticated: true,
  tags: [
    "scope:page:projects",
    "scope:page:postings",
    "scope:page:networkings",
    "scope:page:applications",
    "scope:page:profile",
    "scope:page:admin",
    "scope:section:projects:recruiting",
  ],
});

export const hasAllTags = (userTags: string[], requiredTags: string[] = []) =>
  requiredTags.every((tag) => userTags.includes(tag));
