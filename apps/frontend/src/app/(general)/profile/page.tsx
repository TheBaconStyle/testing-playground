import Link from "next/link";
import CrumbLabel from "@/widgets/Breadcrumbs/ui/СrumbLabel";
export default async function ProtectedPage() {
  return (
    <div>
      <CrumbLabel href="/profile" label="Профиль" />
      <Link href="/" scroll={false} prefetch={false}>
        назад
      </Link>
    </div>
  );
}
