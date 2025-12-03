import { Spinner } from "@/components/ui/spinner";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Mic } from "lucide-react";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import { cn } from "@/lib/utils";

export default function MicButton({ onResult, onStateChange, selectedLetter }) {
	const [voiceState, setVoiceState] = useState('idle');

	const microphoneRef = useRef(null);
	const recorderRef = useRef(null);
	const connectionRef = useRef(null);
	const listenerCleanupRef = useRef(null);

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
			console.error("Error accessing microphone:", err.message);
			setVoiceState('idle');
			onStateChange?.('idle');
		}
	}

	const handleTranscript = useCallback((data) => {
		const transcript = data.channel.alternatives[0]?.transcript;

		if (!transcript) return;
		if (!data.speech_final) return;

		// Transcript received, reset state
		onResult(transcript);
		setVoiceState('idle');
		onStateChange?.('idle');

		// Clean up
		recorderRef.current?.stop();
		microphoneRef.current?.getTracks().forEach(track => track.stop());
		connectionRef.current?.finish();
	}, [onResult, onStateChange]);

	const handleConnectionOpen = useCallback(() => {
		recorderRef.current?.addEventListener("dataavailable", (e) => {
			if (e.data.size > 0) {
				connectionRef.current?.send(e.data);
			}
		});

		connectionRef.current?.addListener(LiveTranscriptionEvents.Transcript, handleTranscript);
		recorderRef.current?.start(250);
		setVoiceState('listening');
		onStateChange?.('listening');
	}, [handleTranscript, onStateChange]);

	const handleConnectionError = useCallback((error) => {
		console.error("Connection error:", error);
		setVoiceState('idle');
		onStateChange?.('idle');
		recorderRef.current?.stop();
		microphoneRef.current?.getTracks().forEach(track => track.stop());
	}, [onStateChange]);

	useEffect(() => {
		return () => {
			if (connectionRef.current) {
				connectionRef.current?.removeListener(LiveTranscriptionEvents.Open, handleConnectionOpen);
				connectionRef.current?.removeListener(LiveTranscriptionEvents.Transcript, handleTranscript);
				connectionRef.current?.removeListener(LiveTranscriptionEvents.Error, handleConnectionError);
			}
		}
	}, [handleConnectionOpen, handleTranscript, handleConnectionError]);

	const onSpeechMode = async () => {
		try {
			setVoiceState('initiating');
			onStateChange?.('initiating');

			const recorder = await setupMicrophone();
			recorderRef.current = recorder;

			const connection = deepgramClient.listen.live();
			connectionRef.current = connection;

			connectionRef.current.addListener(LiveTranscriptionEvents.Open, handleConnectionOpen);
			connectionRef.current.addListener(LiveTranscriptionEvents.Error, handleConnectionError);
		} catch (err) {
			console.error("Error:", err.message);
			setVoiceState('idle');
			onStateChange?.('idle');
		}
	}

	return (
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
	);
}
