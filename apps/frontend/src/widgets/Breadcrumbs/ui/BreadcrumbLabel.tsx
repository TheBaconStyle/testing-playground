"use client";

import { useEffect } from "react";
import { useBreadcrumbs } from "../model/store";

export type TBReadcrumb = {
  href: string;
  label: string;
  link?: boolean;
};

export default function BreadcrumbLabel({ label, href }: TBReadcrumb) {
  const replasePathLabel = useBreadcrumbs((b) => b.replacePathLabel);

  useEffect(() => {
    replasePathLabel(href, label);
  }, [label, href, replasePathLabel]);

  return null;
}
