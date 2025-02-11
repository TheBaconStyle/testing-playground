"use client";
import { Breadcrumbs, BreadcrumbsProps, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useBreadcrumbs } from "../model/store";
import { Crumb } from "./Crumb";

export type TBreadcrumbsContainer = {
  basePath?: string;
  basePathLabel?: string;
} & BreadcrumbsProps;

export function BreadcrumbsContainer({
  basePath = "/",
  basePathLabel = "Главная",
  ...props
}: TBreadcrumbsContainer) {
  const pathname = usePathname();

  const generatedPaths = useMemo(() => {
    return pathname.split("/").filter(Boolean);
  }, [pathname]);

  const generatedBreadcrumbs = useMemo(() => {
    return generatedPaths.map((path, index, paths) => ({
      href: `/${paths.slice(0, index + 1).join("/")}`,
      label: path,
    }));
  }, [generatedPaths]);

  const paths = useBreadcrumbs((b) => b.paths);

  const setPaths = useBreadcrumbs((b) => b.setPaths);

  useEffect(() => {
    setPaths([
      { href: basePath, label: basePathLabel },
      ...generatedBreadcrumbs,
    ]);
  }, [setPaths, generatedBreadcrumbs, basePath, basePathLabel]);

  return (
    <Breadcrumbs {...props}>
      {paths.map(({ label, href }) => (
        <>
          {href ? (
            <Crumb href={href} key={href} underline="hover">
              {label}
            </Crumb>
          ) : (
            <Typography key={label}>{label}</Typography>
          )}
        </>
      ))}
    </Breadcrumbs>
  );
}
