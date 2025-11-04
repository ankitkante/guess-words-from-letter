import { Spinner } from "@/components/ui/spinner";
import { useState, useRef, useEffect } from "react";

export default function WordInput({
	setWordList,
	selectedLetter
}) {

	const [loading, setLoading] = useState(false);


	const [inputWord, setInputWord] = useState('');


	const handleWordSubmit = async () => {
		if (!inputWord) return;

		if (!inputWord.toUpperCase().startsWith(selectedLetter)) {
			alert(`Word must start with ${selectedLetter}`);
			return;
		}

		const isValid = await verifyWord(inputWord);

		if (isValid) {
			setWordList(prevList => [...prevList, { word: inputWord, point: 1 }]);
			setInputWord('');
		} else {
			setWordList(prevList => [...prevList, { word: inputWord, point: -1 }]);
			setInputWord('');

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
		} finally {
			setLoading(false)
		}
	};

	return (
		<div className="font-sans flex flex-col items-center justify-center p-4 gap-3 sm:p-8">
			<div className="mt-2">
				<label className="block mb-2 text-sm sm:text-base">
					Enter words that start with &apos;{selectedLetter}&apos; and press Enter:
				</label>
				<div className="flex items-center justify-center">
					<input
						type="text"
						value={inputWord}
						onChange={(e) => setInputWord(e.target.value)}
						onKeyDown={handleKeyPress}
						className="border rounded-lg p-2 w-48 sm:w-64 m-2"
						placeholder={`Enter here`}
						autoFocus
					/>
					{loading && <Spinner />}
				</div>
			</div>
		</div>
	)
}
