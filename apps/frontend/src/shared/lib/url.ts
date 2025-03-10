import { URLPattern } from 'next/server';

export async function pathTest(patterns: string[], href: string) {
  const pathPatterns = patterns.map(
    (path) => new URLPattern({ pathname: path }),
  );

  return pathPatterns.some((pattern) => pattern.test(href));
}
