import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import MicButton from "./mic-button";

export default function WordInput({
	setWordList,
	selectedLetter,
	wordList = []
}) {

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [inputWord, setInputWord] = useState('');
	const [voiceState, setVoiceState] = useState('idle');

	const handleWordSubmit = async () => {
		if (!inputWord) return;

		// Check if word already exists in the list
		const isDuplicate = wordList.some(item => item.word.toLowerCase() === inputWord.toLowerCase())
		if (isDuplicate) {
			setError(`"${inputWord}" has already been submitted`);
			return;
		}

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

	const handleMicResult = (transcript) => {
		setInputWord(transcript);
		setError('');
	};

	const handleVoiceStateChange = (state) => {
		setVoiceState(state);
	};

	return (
		<div className="font-sans flex flex-col items-center justify-center px-4 gap-2 sm:px-8 w-full max-w-md">
			<div className="flex flex-col justify-center w-full gap-2">
				<div className="flex items-center justify-center gap-2 bg-input/30 border border-input rounded-full px-3 py-2 hover:bg-input/50 transition-colors sm:px-4 sm:py-2">
					<input
						type="text"
						value={inputWord}
						onChange={(e) => setInputWord(e.target.value)}
						onKeyDown={handleKeyPress}
						className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground text-sm sm:text-base"
						placeholder={`Enter words with ${selectedLetter}`}
					/>
					<MicButton onResult={handleMicResult} onStateChange={handleVoiceStateChange} selectedLetter={selectedLetter} />
					<Button
						variant="ghost"
						size="icon"
						onClick={handleWordSubmit}
						className="rounded-full shrink-0 cursor-pointer hover:bg-accent"
						disabled={loading || error}
					>
						{loading ? <Spinner /> : <ArrowRight className="size-5" />}
					</Button>
				</div>
				{voiceState === 'initiating' && (
					<p className="text-amber-400 text-xs sm:text-sm text-center font-medium">Setting up microphone...</p>
				)}
				{voiceState === 'listening' && (
					<p className="text-emerald-400 text-xs sm:text-sm text-center font-medium animate-pulse">🎤 Speak now!</p>
				)}
				{voiceState === 'processing' && (
					<p className="text-indigo-400 text-xs sm:text-sm text-center font-medium">Processing your speech...</p>
				)}
				{error && <p className="text-red-500 text-xs sm:text-sm text-center">{error}</p>}
			</div>
		</div>
	)
}
