export function s3UrlBuilder(path: string) {
  return `${process.env.NEXT_PUBLIC_S3_URL}/${path}`;
}
