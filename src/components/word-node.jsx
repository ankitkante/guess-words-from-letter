import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function WordNode({ label, point }) {
  return (
    <div className="inline-block">
      <Button
        className={cn(
          "inline-flex items-center justify-center px-3 py-1 text-sm rounded-full shadow-sm max-w-max",
          point === -1 ? "bg-red-600 hover:bg-red-500" : "bg-emerald-600 hover:bg-emerald-500",
          "text-white"
        )}
      >
        <span className="truncate max-w-[180px]">{label}</span>
      </Button>
    </div>
  );
}