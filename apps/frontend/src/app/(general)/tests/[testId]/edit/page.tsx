"use client";

import { BreadCrumbs } from "@/widgets/Breadcrumbs/ui/BreadCrumbs";
import CrumbLabel from "@/widgets/Breadcrumbs/ui/СrumbLabel";

export default function EditTestPage({
  params,
}: {
  params: { testId: string };
}) {
  return (
    <div>
      <BreadCrumbs />
      <CrumbLabel href="/tests" label="Тесты" />
      <CrumbLabel href={`/${params.testId}`} label="Тест 1" />
      <CrumbLabel href={`/${params.testId}/edit`} label="Редактировать" />
      <div>EditTestPage</div>
    </div>
  );
}
