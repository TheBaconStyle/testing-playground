"use client";

import { create } from "zustand";

export type CrumbPath = {
  href: string;
  label: string;
  isLink?: boolean;
};

export type TBreadcrumbsStore = {
  paths: CrumbPath[];
  setPaths: (newPaths: CrumbPath[]) => void;
  replacePathLabel: (
    href: string,
    newSettings: Partial<Omit<CrumbPath, "href">>
  ) => void;
};

export const useBreadcrumbs = create<TBreadcrumbsStore>((set) => ({
  paths: [],
  setPaths: (newPaths: CrumbPath[]) => set(() => ({ paths: newPaths })),
  replacePathLabel: (href, newSettings) =>
    set((state) => {
      const pathIndex = state.paths.findIndex((path) =>
        path.href?.includes(href)
      );
      return {
        paths: [
          ...state.paths.slice(0, pathIndex),
          { ...state.paths[pathIndex], ...newSettings },
          ...state.paths.slice(pathIndex + 1),
        ],
      };
    }),
}));
