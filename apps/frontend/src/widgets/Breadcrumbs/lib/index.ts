import { URLPattern } from 'urlpattern-polyfill';
export const BREADCRUMBS_ID = 'breadCrumbs';

export type CrumbPath = {
  label: string;
  href?: string;
};

export function generateBreadCrumbs(
  pathname: string,
  localization?: Partial<Record<string, string>>,
): CrumbPath[] {
  const pattern = new URLPattern({
    pathname,
  });

  const paths = pathname.split('/').filter(Boolean);

  return paths.map((path, index) => {
    const crumbURL = new URL(
      paths.slice(0, index + 1).join('/'),
      process.env.NEXT_PUBLIC_DOMAIN!,
    );

    const isCurrent = pattern.test(crumbURL);

    const label = localization?.[crumbURL.pathname] ?? path;

    if (!isCurrent)
      return {
        href: crumbURL.pathname,
        label,
      };

    return {
      label,
    };
  });
}
