"use client";

import { useEffect } from "react";
import { type CrumbPath, useBreadcrumbs } from "../model/store";

export type TBReadcrumb = {} & CrumbPath;

export default function CrumbLabel({ label, href, isLink }: TBReadcrumb) {
  const replasePathLabel = useBreadcrumbs((b) => b.replacePathLabel);

  useEffect(() => {
    replasePathLabel(href, { label, isLink });
  }, [label, href, replasePathLabel, isLink]);

  return null;
}
