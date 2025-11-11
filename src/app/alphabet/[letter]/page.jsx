'use client';

import WordInput from "@/components/word-input";
import WordList from "@/components/word-list";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function AlphabetDetailPage() {
  const { letter: selectedAlphabet } = useParams();
  const [wordList, setWordList] = useState([]);

  const totalPoints = useMemo(() => {
    return wordList.reduce((acc, item) => acc + item.point, 0);
  }, [wordList]);

  return (
    <div className="flex flex-col bg-black h-[calc(100vh-64px)] text-white relative">
      <h2 className={cn(
        "text-6xl font-extrabold tracking-wide text-amber-300",
        "absolute left-1 top-1",
        "px-4 py-2 ",
      )} >{selectedAlphabet}</h2>
      <div className="p-4 text-center flex mb-2 items-center">
        <div className="flex-1">
          <h3 className="text-9xl ">{totalPoints}</h3>
          <p className="text-lg">Points</p>
        </div>
      </div>
      <WordList
        wordList={wordList}
      />
      <WordInput
        selectedLetter={selectedAlphabet}
        setWordList={setWordList}
      />
    </div>
  )
}