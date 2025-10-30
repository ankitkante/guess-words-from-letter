'use client';
import WordInput from "@/components/word-input";
import WordList from "@/components/word-list";
import { useMemo, useState } from "react";

export default function Home() {
  const [wordList, setWordList] = useState([]);

  const totalPoints = useMemo(() => {
    return wordList.reduce((acc, item) => acc + item.point, 0);
  }, [wordList]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="sticky top-0 bg-white z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="text-center">
            <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-0.5">Total Points</h2>
            <p className="text-3xl font-bold text-gray-900">{totalPoints}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <WordInput setWordList={setWordList}></WordInput>
        </div>
        <div className="flex-1 overflow-y-auto border-l">
          <WordList wordList={wordList}></WordList>
        </div>
      </div>
    </div>
  );
}
