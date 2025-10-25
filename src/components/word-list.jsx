import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function WordList({
  wordList = []
}) {
  return (
    <div className="flex flex-col p-8">
      {
        wordList.map((item, index) => (
          <div className="flex items-center mb-2 " key={item.word}>
            <Button 
              key={index} 
              className={cn(
                "p-4 mr-2",
                item.point === -1 ? "bg-red-600 hover:bg-red-600": "bg-green-600 hover:bg-green-600"
              )}
            >
              {item.word}
            </Button>
            {item.point === -1 ? '-1' : '+1'}
          </div>

        ))
      }
    </div>
  );
}