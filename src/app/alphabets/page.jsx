import AlphabetGrid from "@/components/alphabet-grid";

export default function AlphabetsPage() {
  return (
    <div className="flex flex-col h-[calc(100dvh-64px)]">
      <div className="flex flex-col items-center justify-center h-full gap-4 p-4">
        <h2 className="text-2xl">Select an alphabet</h2>
        <AlphabetGrid></AlphabetGrid>
      </div>
    </div>
  );
}
