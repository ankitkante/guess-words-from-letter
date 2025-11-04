'use client';

import WordInput from "@/components/word-input";
import WordList from "@/components/word-list";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function AlphabetDetailPage() {
  const { letter: selectedAlphabet } = useParams();
  const [wordList, setWordList] = useState([]);

  const totalPoints = useMemo(() => {
    return wordList.reduce((acc, item) => acc + item.point, 0);
  }, [wordList]);

  return (
    <div className="flex flex-col bg-black h-[calc(100vh-64px)] text-white">
      <div className="p-4 text-center">
        <h2 className="text-xl mb-2">Selected Letter: {selectedAlphabet}</h2>
        <h3 className="text-lg">Total Points: {totalPoints}</h3>
      </div>
      <WordInput
        selectedLetter={selectedAlphabet}
        setWordList={setWordList}
      />
      <WordList
        wordList={wordList}
      />
    </div>
  )
}