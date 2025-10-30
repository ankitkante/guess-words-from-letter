import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function WordChip({
  wordItem,
  showPoints = true
}) {
  return (
    <div className="flex items-center gap-1" key={wordItem.word}>
      <Button
        className={cn(
          "p-3 text-sm",
          wordItem.point === -1 ? "bg-red-600 hover:bg-red-600" : "bg-green-600 hover:bg-green-600"
        )}
      >
        {wordItem.word}
      </Button>
      { showPoints && <span className="font-medium">{wordItem.point === -1 ? '-1' : '+1'}</span>}
    </div>
  )
}