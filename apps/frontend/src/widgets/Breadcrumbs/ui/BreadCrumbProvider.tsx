'use client';
import { PropsWithChildren, useCallback, useState } from 'react';
import {
  BreadCrumbContext,
  BreadCrumbServiceContext,
  CrumbPath,
  TBreadCrumbsData,
} from '../lib';

export function BreadCrumbProvider({ children }: PropsWithChildren) {
  const [paths, setPaths] = useState<CrumbPath[]>([]);

  const replacePathLabel = useCallback<TBreadCrumbsData['replacePathLabel']>(
    (href, newSettings) => {
      let searchedPathIndex = -1;

      for (let pathIndex = 0; pathIndex < paths.length; pathIndex++) {
        const currentPath = paths.at(pathIndex);

        if (!currentPath) continue;

        if (currentPath.href.includes(href)) {
          searchedPathIndex = pathIndex;
          break;
        }
      }

      if (searchedPathIndex === -1) {
        return false;
      }

      setPaths([
        ...paths.slice(0, searchedPathIndex),
        { ...paths[searchedPathIndex], ...newSettings },
        ...paths.slice(searchedPathIndex + 1),
      ]);

      return true;
    },
    [paths],
  );

  return (
    <BreadCrumbServiceContext.Provider value={{ paths, setPaths }}>
      <BreadCrumbContext.Provider value={{ paths, replacePathLabel }}>
        {children}
      </BreadCrumbContext.Provider>
    </BreadCrumbServiceContext.Provider>
  );
}
