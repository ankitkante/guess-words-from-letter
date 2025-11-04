import { useRouter } from "next/navigation";

export default function AlphabetGrid({
  setSelectedAlphabet
}) {
  const router = useRouter();

  const letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  return (
    <div className="font-sans flex flex-col items-center justify-center p-4 gap-3 sm:p-8">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => router.push(`/alphabet/${letter}`)}
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border rounded-lg hover:bg-gray-100 text-xl sm:text-2xl"
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}