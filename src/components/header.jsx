import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 text-center text-2xl font-bold">
      <Link href={`/`}>A Simple Word Game</Link> 
    </header>
  );
}