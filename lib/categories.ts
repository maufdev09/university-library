export const bookCategories = [
  "Academic",
  "Novel",
  "Fiction",
  "Nonfiction",
  "Religious",
  "Admission",
  "Children",
  "Comics",
  "Reference",
  "Other",
] as const;

export type BookCategory = (typeof bookCategories)[number];
