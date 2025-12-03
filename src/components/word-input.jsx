import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Check, X } from "lucide-react";
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
	const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', points: number }

	const handleWordSubmit = async () => {
		if (!inputWord) return;
		setError('');

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
			setFeedback({ type: 'success', points: 1 });
			setTimeout(() => setFeedback(null), 2000);
		} else {
			setWordList(prevList => [...prevList, { word: inputWord, point: -1 }]);
			setInputWord('');
			setFeedback({ type: 'error', points: -1 });
			setTimeout(() => setFeedback(null), 2000);

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
				<div className={`flex items-center justify-center gap-2 bg-input/30 border rounded-full px-3 py-2 hover:bg-input/50 transition-colors sm:px-4 sm:py-2 ${feedback ? (feedback.type === 'success' ? 'border-emerald-400 bg-emerald-900/5 shadow-[0_0_10px_rgba(52,211,153,0.06)]' : 'border-rose-500 bg-rose-900/5 shadow-[0_0_10px_rgba(239,68,68,0.06)]') : 'border-input'}`}>
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
					<p className="text-emerald-400 text-xs sm:text-sm text-center font-medium animate-pulse">Speak now!</p>
				)}
				{voiceState === 'processing' && (
					<p className="text-indigo-400 text-xs sm:text-sm text-center font-medium">Processing your speech...</p>
				)}
				{error && <p className="text-red-500 text-xs sm:text-sm text-center">{error}</p>}
				{feedback && (
					<p className={`text-xs sm:text-sm text-center font-medium ${feedback.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
						{feedback.type === 'success' ? (
							<><Check className="inline mr-1" /> Correct! {feedback.points > 0 ? `+${feedback.points}` : feedback.points} point</>
						) : (
							<><X className="inline mr-1" /> Incorrect {feedback.points < 0 ? `${feedback.points}` : `+${feedback.points}`} point</>
						)}
					</p>
				)}
			</div>
		</div>
	)
}
