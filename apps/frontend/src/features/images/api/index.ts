import type { ImageLoader } from "next/image";
import proxyUrlBuilder, { ResizeType } from "@bitpatty/imgproxy-url-builder";

const imgproxyLoader: ImageLoader = ({ src, width, quality = 75 }) => proxyUrlBuilder()
    .resize({ type: ResizeType.FIT, width })
    .quality(quality)
    .build({
      path: `${process.env.S3_URL}/${src}`,
      baseUrl: process.env.NEXT_PUBLIC_IMGPROXY_URL,
    });

export default imgproxyLoader;
