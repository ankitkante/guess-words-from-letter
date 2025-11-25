import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Handle, Position } from "@xyflow/react";

export default function WordNode({ data: {label, point} }) {
  return (
    <div className="flex items-center gap-1" key={label}>
      <Button
        className={cn(
          "p-3 text-sm",
          point === -1 ? "bg-red-600 hover:bg-red-600" : "bg-green-600 hover:bg-green-600"
        )}
      >
        {label}
        <Handle type="source" position={Position.Right} className="!bg-white"></Handle>
        <Handle type="target" position={Position.Left} className="!bg-white"></Handle>
      </Button>
    </div>
  )
}