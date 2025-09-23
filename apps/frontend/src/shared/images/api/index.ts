'use client'
import type { ImageLoader } from 'next/image';
import proxyUrlBuilder, { ResizeType } from '@bitpatty/imgproxy-url-builder';
import { env } from '@/shared/env';

const imgproxyLoader: ImageLoader = ({ src, width, quality = 75 }) =>
  proxyUrlBuilder()
    .resize({ type: ResizeType.FIT, width })
    .quality(quality)
    .build({
      path: src,
      baseUrl: env.NEXT_PUBLIC_IMGPROXY_URL,
      plain: true,
    });

export default imgproxyLoader;
