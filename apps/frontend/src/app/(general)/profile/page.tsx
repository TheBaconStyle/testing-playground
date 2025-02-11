import Link from "next/link";
import BreadcrumbLabel from "../../../widgets/Breadcrumbs/ui/BreadcrumbLabel";
export default async function ProtectedPage() {
  return (
    <div>
      <BreadcrumbLabel href="/profile" label="Профиль" />
      <Link href="/" scroll={false} prefetch={false}>
        назад
      </Link>
    </div>
  );
}
