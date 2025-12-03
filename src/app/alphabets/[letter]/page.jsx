'use client';

import SpeechToTextBtn from "@/components/speech-to-text-btn";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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

  const onResult = (word) => {
    console.log(word)
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-64px)] relative">
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
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <SpeechToTextBtn onResult={onResult}/>
        <span>OR</span>
        <WordInput
          selectedLetter={selectedAlphabet}
          setWordList={setWordList}
        />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon-lg"
            className="absolute bottom-4 right-4"
          >
            <ClipboardList />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[60vh]">
          <SheetHeader>
            <SheetTitle>Word List</SheetTitle>
            <SheetDescription>
              All words you have submitted
            </SheetDescription>
          </SheetHeader>
          <WordList wordList={wordList} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
