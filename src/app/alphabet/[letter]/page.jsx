'use client';

import { Button } from "@/components/ui/button";
import WordInput from "@/components/word-input";
import WordList from "@/components/word-list";
import { cn } from "@/lib/utils";
import { ClipboardList } from "lucide-react";
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
        // "absolute left-1 top-1",
        "px-4 py-2 ",
      )} >{selectedAlphabet}</h2>
      <div className="p-4 text-center flex mb-10 items-center">
        <div className="flex-1">
          <h3 className="text-9xl ">{totalPoints}</h3>
          <p className="text-lg">Points</p>
        </div>
      </div>
      <WordInput
        selectedLetter={selectedAlphabet}
        setWordList={setWordList}
      />
      <Button
        variant="outline"
        size="icon-lg"
        className="
          rounded-full absolute bottom-4 right-4
          bg-black
          border-cyan-400/40 text-cyan-300
          shadow-[0_0_12px_rgba(34,211,238,0.35)]
          hover:bg-black hover:text-cyan-200 hover:border-cyan-300
        "
        title="Submitted word list"
      >
        <ClipboardList className="h-6 w-6" />

        {wordList.length > 0 && (
          <span
            className="
              absolute -bottom-1 right-1
              bg-cyan-400/20 text-cyan-200
              rounded-full 
              w-4 h-4 
              flex items-center justify-center
              text-[10px] leading-none
            "
          >
            {wordList.length > 99 ? '99+' : wordList.length}
          </span>
        )}
      </Button>
      
      <WordList wordList={wordList} />

    </div>
  )
}