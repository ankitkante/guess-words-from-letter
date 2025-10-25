'use client';
import WordInput from "@/components/word-input";
import WordList from "@/components/word-list";
import { useState } from "react";

export default function Home() {
  const [wordList, setWordList] = useState([]);

  return (
    <div className="flex">
      <WordInput setWordList={setWordList}></WordInput>
      <WordList wordList={wordList}></WordList>
    </div>
  );
}
