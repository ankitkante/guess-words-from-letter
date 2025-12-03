import { Spinner } from "@/components/ui/spinner";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Mic, Speech } from "lucide-react";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import { cn } from "@/lib/utils";

export default function WordInput({
	setWordList,
	selectedLetter
}) {

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [inputWord, setInputWord] = useState('');
	const [voiceState, setVoiceState] = useState('idle'); // 'idle', 'initiating', 'listening', 'processing'

	const microphoneRef = useRef(null);
	const recorderRef = useRef(null);
	const connectionRef = useRef(null);

	const deepgramClient = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);

	const setupMicrophone = async () => {
		try {
			const microphone = await navigator.mediaDevices.getUserMedia({
				audio: {
					noiseSuppression: true,
					echoCancellation: true
				},
			});
			microphoneRef.current = microphone;

			const recorder = new MediaRecorder(microphone, {
				mimeType: "audio/webm;codecs=opus",
			})
			return recorder;
		} catch (err) {
			alert("Error accessing microphone:", err.message);
		}
	}

	const onAudioDataAvailable = useCallback((e) => {
		if (e.data.size > 0) {
			connectionRef.current?.send(e.data)
		}
	}, [])

	const onTranscript = useCallback((data) => {
		const transcript = data.channel.alternatives[0].transcript;

		if (!transcript) return
		if (!data.speech_final) return

		setInputWord(transcript);
		setVoiceState('processing');
		recorderRef.current?.stop()
		microphoneRef.current?.getTracks().forEach(track => track.stop())
		connectionRef.current?.finish()
		setTimeout(() => setVoiceState('idle'), 500);
	}, [])

	const onOpen = useCallback(() => {
		recorderRef.current?.addEventListener("dataavailable", onAudioDataAvailable)
		connectionRef.current?.addListener(LiveTranscriptionEvents.Transcript, onTranscript)
		recorderRef.current?.start(250);
		setVoiceState('listening');
	}, [onAudioDataAvailable, onTranscript])

	useEffect(() => {
		return () => {
			connectionRef.current?.removeListener(LiveTranscriptionEvents.Open, onOpen)
			connectionRef.current?.removeListener(LiveTranscriptionEvents.Transcript, onTranscript)
			recorderRef.current?.removeEventListener("dataavailable", onAudioDataAvailable)
		}
	}, [onOpen, onTranscript, onAudioDataAvailable])

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

	const onSpeechMode = async () => {
		try {
			setVoiceState('initiating');

			const recorder = await setupMicrophone();
			recorderRef.current = recorder;

			const connection = deepgramClient.listen.live()
			connectionRef.current = connection;

			connectionRef.current.addListener(LiveTranscriptionEvents.Open, onOpen)
		} catch (err) {
			alert("Error:", err.message);
			setVoiceState('idle');
		}
	}

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
					<Button 
						variant="ghost" 
						size="icon"
						onClick={onSpeechMode}
						disabled={voiceState !== 'idle'}
						className={cn(
							"rounded-full shrink-0 cursor-pointer",
							voiceState === 'initiating' && "bg-amber-400 hover:bg-amber-400 text-black",
							voiceState === 'listening' && "bg-emerald-300 hover:bg-emerald-500 text-black",
							voiceState === 'processing' && "bg-indigo-500 hover:bg-indigo-500"
						)}
					>
						{voiceState === 'idle' && <Mic className="size-5" />}
						{voiceState === 'initiating' && <Spinner />}
						{voiceState === 'listening' && <Mic className="size-5" />}
						{voiceState === 'processing' && <Spinner />}
					</Button>
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
