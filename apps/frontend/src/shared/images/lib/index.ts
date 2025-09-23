'use client'
import { env } from '@/shared/env';

export function s3UrlBuilder(path: string) {
  return `${env.NEXT_PUBLIC_S3_URL}/${path}`;
}