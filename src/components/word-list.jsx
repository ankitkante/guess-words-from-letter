import WordNode from "./word-node";

export default function WordList({
  wordList = []
}) {
  return (
    <div className="flex flex-col p-0 sm:p-2 flex-1 min-h-0">
      {wordList.length === 0 ? (
        <p className="text-gray-500 text-sm">No words added yet</p>
      ) : (
        <div className="flex flex-col gap-2 w-full p-2">
          {wordList.map((item) => (
            <div key={item.word} className="w-auto">
              <WordNode label={item.word} point={item.point} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
