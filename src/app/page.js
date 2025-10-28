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
    <div className="flex flex-col ">
      <div className="text-center">Total Points: {totalPoints}</div>
      <div className="flex">
        <WordInput setWordList={setWordList}></WordInput>
        <WordList wordList={wordList}></WordList>
      </div>
    </div>
  );
}
