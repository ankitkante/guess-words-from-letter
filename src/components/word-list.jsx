import { ReactFlow } from "@xyflow/react";
import WordNode from "./word-node";

export default function WordList({
  wordList = []
}) {
  let nodes = []
  let edges = []
  const nodeTypes = {
    wordNode: WordNode
  }
  const proOptions = {
    hideAttribution: true,
  }


  wordList.forEach((item, index) => {
    nodes.push({
      type: 'wordNode',
      id: item.word,
      data: { label: item.word, point: item.point },
      position: { x: index * 100, y: 0 },
    })

    if (index > 0) {
      edges.push({
        id: `${wordList[index - 1].word}-${item.word}`,
        source: wordList[index - 1].word,
        target: item.word,
        style: { stroke: '#fff', strokeWidth: 2 },
      })
    }
  })


  return (
    <div className="flex flex-col p-4 sm:p-6 flex-1 min-h-0">
      <h2 className="text-xl font-semibold mb-3">Word List</h2>

      {wordList.length === 0 ? (
        <p className="text-gray-500 text-sm">No words added yet</p>
      ) : (
        <div className="flex-1 min-h-0 w-full h-full p-3">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            proOptions={proOptions}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
          />
        </div>
      )}
    </div>
  );
}
