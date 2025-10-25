import { Button } from "./ui/button";

export default function WordList({
  wordList = []
}) {
  return (
    <div className="flex flex-col p-8">
      {
        wordList.map((word, index) => (
          <Button key={index} className="p-4 mb-2 bg-green-600 hover:bg-green-600">
            {word}
          </Button>
        ))
      }
    </div>
  );
}