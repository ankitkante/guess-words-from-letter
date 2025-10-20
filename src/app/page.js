'use client';
import { Spinner } from "@/components/ui/spinner";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  const [selectedLetter, setSelectedLetter] = useState(null);
  const [loading, setLoading] = useState(false);

  const [inputWord, setInputWord] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (selectedLetter && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedLetter]);
  const handleWordSubmit = async () => {
    if (!inputWord) return;
    
    if (!inputWord.toUpperCase().startsWith(selectedLetter)) {
      alert(`Word must start with ${selectedLetter}`);
      return;
    }

    const isValid = await verifyWord(inputWord);

    if (isValid) {
      alert('Valid word!');
      setInputWord('');
    } else {
      alert('Not a valid word');
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleWordSubmit();
    }
  };

  const verifyWord = async (word) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/verifyWord?word=${word}`);
      const result = await response.json();
      return result.valid;
    } catch (error) {
      return false;
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 gap-4 sm:p-20">
      <h1 className="text-4xl font-bold text-center">
        {selectedLetter ? `You selected ${selectedLetter}` : "Please select a letter"}
      </h1>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className="w-16 h-16 flex items-center justify-center border rounded-lg hover:bg-gray-100 text-2xl"
          >
            {letter}
          </button>
        ))}
      </div>
      {selectedLetter && (
        <div className="mt-4">
          <label className="block mb-2">
            Enter words that start with '{selectedLetter}':
          </label>
          <div className="flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              onKeyDown={handleKeyPress}
              className="border rounded-lg p-2 w-64 m-2"
              placeholder={`Enter here`}
            />
            {loading && <Spinner/>}
          </div>
        </div>
      )}
    </div>
  );
}
