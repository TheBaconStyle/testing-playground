'use client';
import { createContext, use } from 'react';

export type CrumbPath = {
  href: string;
  label: string;
  isLink?: boolean;
};

export type TBreadcrumbsServiceData = {
  paths: CrumbPath[];
  setPaths: (newPaths: CrumbPath[]) => void;
};

export type TBreadCrumbsData = {
  paths: CrumbPath[];
  replacePathLabel: (
    href: string,
    newSettings: Partial<Omit<CrumbPath, 'href'>>,
  ) => boolean;
};

const breadCrumbsDefaultServiceData: TBreadcrumbsServiceData = {
  paths: [],
  setPaths: () => {},
};

const breadCrumbDefaultData: TBreadCrumbsData = {
  paths: [],
  replacePathLabel: () => false,
};

export const BreadCrumbServiceContext = createContext<TBreadcrumbsServiceData>(
  breadCrumbsDefaultServiceData,
);

export const BreadCrumbContext = createContext<TBreadCrumbsData>(
  breadCrumbDefaultData,
);

export const useBreadCrumbService = () => use(BreadCrumbServiceContext);

export const useBreadCrumbs = () => use(BreadCrumbContext);
