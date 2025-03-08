import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <Link href="/tests/412/edit" prefetch={false}>
        вперёд
      </Link>
    </div>
  );
}
