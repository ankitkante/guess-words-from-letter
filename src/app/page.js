import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col h-[calc(100dvh-64px)]">
      <div className="flex flex-col items-center justify-center h-full gap-8 p-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">Word Game Challenge</h1>
          <p className="text-xl text-gray-400 mb-8">
            Test your vocabulary and quick thinking! Select a letter and suggest words that start with it.
            The faster you think, the more points you earn. Can you become a word master?
          </p>
          <div className="text-lg text-gray-300 mb-8">
            <p>✨ Challenge yourself with different letters</p>
            <p>🎯 Earn points for valid words</p>
            <p>⚡ Beat the clock for bonus points</p>
          </div>
        </div>

        <Button
          className="px-8 py-6 text-lg font-semibold bg-gradient-to-b from-cyan-600 to-cyan-800 hover:from-cyan-500 hover:to-cyan-700 text-white border border-cyan-400/50"
        >
          <Link href="/alphabets">
            Play Now
          </Link>
        </Button>
      </div>
    </div>
  );
}
