import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function WordNode({ label, point }) {
  return (
    <div className="flex items-center">
      <Button
        className={cn(
          "px-4 py-2 text-sm rounded-full shadow-sm transition-transform transform-gpu hover:-translate-y-0.5",
          point === -1
            ? "bg-red-600 hover:bg-red-500"
            : "bg-emerald-600 hover:bg-emerald-500"
        )}
      >
        {label}
      </Button>
    </div>
  );
}