"use client";

import { create } from "zustand";

export type CrumbPath = {
  href?: string;
  label: string;
};

export type TBreadcrumbsStore = {
  paths: CrumbPath[];
  setPaths: (newPaths: CrumbPath[]) => void;
  replacePathLabel: (href: string, newLabel: string, link?: boolean) => void;
};

export const useBreadcrumbs = create<TBreadcrumbsStore>((set) => ({
  paths: [],
  setPaths: (newPaths: CrumbPath[]) => set(() => ({ paths: newPaths })),
  replacePathLabel: (href: string, newLabel: string) =>
    set((state) => {
      const pathIndex = state.paths.findIndex((path) => path.href === href);
      return {
        paths: [
          ...state.paths.slice(0, pathIndex),
          { ...state.paths[pathIndex], label: newLabel },
          ...state.paths.slice(pathIndex + 1),
        ],
      };
    }),
}));
