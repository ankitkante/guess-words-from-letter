export default function WordList({
  wordList = []
}) {
  return (
    <div className="flex flex-col p-8">
      {
        wordList.map((word, index) => (
          <div key={index} className="p-2 border-b">
            {word}
          </div>
        ))
      }
    </div>
  );
}