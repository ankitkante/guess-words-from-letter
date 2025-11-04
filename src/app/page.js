'use client';
import AlphabetGrid from "@/components/alphabet-grid";
import WordInput from "@/components/word-input";
import WordList from "@/components/word-list";

export default function Home() {
  return (
    <div className="flex flex-col bg-black h-[calc(100vh-64px)] text-white">
      <div className="flex flex-col items-center justify-center h-full gap-4 p-4">
        <h2 className="text-2xl">Select an alphabet</h2>
        <AlphabetGrid></AlphabetGrid>
      </div>
    </div>
  );
}
