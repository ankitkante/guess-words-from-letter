import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function WordList({
  wordList = []
}) {
  return (
    <div className="flex flex-col p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-3 sticky top-0 bg-white pb-2">Word List</h2>
      {wordList.length === 0 ? (
        <p className="text-gray-500 text-sm">No words added yet</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {wordList.map((item, index) => (
            <div className="flex items-center gap-1" key={item.word}>
              <Button
                key={index}
                className={cn(
                  "p-3 text-sm",
                  item.point === -1 ? "bg-red-600 hover:bg-red-600": "bg-green-600 hover:bg-green-600"
                )}
              >
                {item.word}
              </Button>
              <span className="font-medium">{item.point === -1 ? '-1' : '+1'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}