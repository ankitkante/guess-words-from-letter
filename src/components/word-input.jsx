import { Spinner } from "@/components/ui/spinner";
import { useState, useRef, useEffect } from "react";
import { ButtonGroup } from "./ui/button-group";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function WordInput({
	setWordList,
	selectedLetter
}) {

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');


	const [inputWord, setInputWord] = useState('');


	const handleWordSubmit = async () => {
		if (!inputWord) return;

		if (!inputWord.toUpperCase().startsWith(selectedLetter)) {
			setError(`Word must start with ${selectedLetter}`);
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
		setError('');
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
		<div className="font-sans flex flex-col items-center justify-center px-4 gap-3 sm:px-8">
			<div className="flex flex-col justify-center">
				<div className="flex flex-1 items-center justify-center">
					<ButtonGroup>
						<input
							type="text"
							value={inputWord}
							onChange={(e) => setInputWord(e.target.value)}
							onKeyDown={handleKeyPress}
							className="border border-white rounded-lg w-60 sm:w-72 px-2"
							placeholder={`Enter words with ${selectedLetter}`}
						/>
						<Button 
							variant="outline" 
							onClick={handleWordSubmit} 
							className="cursor-pointer"
							disabled={loading || error}
						>
							{loading ? <Spinner />: <ArrowRight/>}
						</Button>
					</ButtonGroup>
				</div>
				{error && <p className="text-red-500 text-sm">{error}</p>}
			</div>
		</div>
	)
}
