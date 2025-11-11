import { useRouter } from "next/navigation";
import { motion, stagger } from "motion/react"
import { useEffect } from "react";
import { animate } from "motion";
import { cn } from "@/lib/utils";

export default function AlphabetGrid({
  setSelectedAlphabet
}) {
  const router = useRouter();

  const letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  useEffect(() => {
    animate(
      ".alphabet",
      { opacity: [0, 1], x: [-20, 0] },
      { delay: stagger(0.01) }
    )
  }, []);

  return (
    <div className="font-sans flex flex-col items-center justify-center p-4 gap-3 sm:p-8">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
        {letters.map((letter) => (
          <motion.button
            key={letter}
            onClick={() => router.push(`/alphabet/${letter}`)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "w-12 h-12 sm:w-14 sm:h-14",
              "flex items-center justify-center",
              "bg-gradient-to-b from-cyan-600 to-cyan-800 text-white border border-cyan-400/50 hover:from-cyan-500 hover:to-cyan-700 transition-colors",
              "border rounded-lg  text-xl sm:text-2xl alphabet"
            )}
          >
            {letter}
          </motion.button>
        ))}
      </div>
    </div>
  );
}