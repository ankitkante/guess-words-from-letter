import WordChip from "./word-chip";

export default function WordList({
  wordList = []
}) {

  return (
    <div className="flex flex-col p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-3 sticky top-0 pb-2">Word List</h2>
      {wordList.length === 0 ? (
        <p className="text-gray-500 text-sm">No words added yet</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {
            wordList.map((item, index) => {
              if (wordList.length > 50) {
                if (index > 50 && index < wordList.length - 2) {
                  return null
                } else if (index > 50 && index >= wordList.length - 2) {
                  return (
                    <WordChip
                      key={item.word}
                      wordItem={item}
                      showPoints={true}
                    ></WordChip>
                  )
                } else if (index === 50) {
                  return (
                    <WordChip
                      key="..."
                      wordItem={{ word: '...', point: 0 }}
                      showPoints={false}
                    ></WordChip>
                  )
                }
                else {
                  return (
                    <WordChip
                      key={item.word}
                      wordItem={item}
                      showPoints={true}
                    ></WordChip>
                  )
                }

              } else {
                return (
                  <WordChip
                    key={item.word}
                    wordItem={item}
                    showPoints={true}
                  ></WordChip>
                )
              }

            })
          }
        </div>
      )}
    </div>
  );
}