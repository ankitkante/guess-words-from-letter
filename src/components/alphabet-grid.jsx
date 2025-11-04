import { useRouter } from "next/navigation";
import { motion } from "motion/react"

export default function AlphabetGrid({
  setSelectedAlphabet
}) {
  const router = useRouter();

  const letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  return (
    <div className="font-sans flex flex-col items-center justify-center p-4 gap-3 sm:p-8">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
        {letters.map((letter) => (
          <motion.button
            key={letter}
            onClick={() => router.push(`/alphabet/${letter}`)}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border rounded-lg hover:bg-black-100 text-xl sm:text-2xl"
          >
            {letter}
          </motion.button>
        ))}
      </div>
    </div>
  );
}