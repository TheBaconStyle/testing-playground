import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <Link href="/profile" prefetch={false}>
        вперёд
      </Link>
    </div>
  );
}
