import { cn } from "@/lib/utils";
import { Button } from "./ui/button"
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import { Speech } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SpeechToTextBtn({ onResult }) {
  const microphoneRef = useRef(null);
  const recorderRef = useRef(null);
  const connectionRef = useRef(null);

  const [buttonState, setButtonState] = useState('idle'); // 'idle', 'listening', 'processing'

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

  const onAudioDataAvailable = (e) => {
    if (e.data.size > 0) {
      // Stream data to Deepgram
      connectionRef.current.send(e.data)
    }
  }

  const onTranscript = (data) => {
    const transcript = data.channel.alternatives[0].transcript;

    if (!transcript) return
    if (!data.speech_final) return // Only execute next code if speech has ended

    onResult(transcript)

    recorderRef.current.stop()
    microphoneRef.current.getTracks().forEach(track => track.stop())
    connectionRef.current.finish()
    setButtonState('idle')

  }

  const onOpen = () => {
    // Setup event to capture audio data
    recorderRef.current.addEventListener("dataavailable", onAudioDataAvailable)

    // Setup event to handle transcription results
    connectionRef.current.addListener(LiveTranscriptionEvents.Transcript, onTranscript)

    // Start recording audio
    // 250 will send data after each 250ms
    recorderRef.current.start(250);

    // Update button state
    setButtonState('listening');
  }

  useEffect(() => {
    return () => {
      // Cleanup listeners on unmount
      connectionRef.current.removeListener(LiveTranscriptionEvents.Open, onOpen)
      connectionRef.current.removeListener(LiveTranscriptionEvents.Transcript, onTranscript)
      recorderRef.current.removeEventListener("dataavailable", onAudioDataAvailable)
    }
  }, [])

  const onSpeechMode = async () => {
    try {
      setButtonState('initiating');

      // Setup microphone
      const recorder = await setupMicrophone();
      recorderRef.current = recorder;

      // Establish socket connection to Deepgram
      const connection = deepgramClient.listen.live()
      connectionRef.current = connection;

      // When connection establish, call onOpen
      connectionRef.current.addListener(LiveTranscriptionEvents.Open, onOpen)
    } catch (err) {
      alert("Error:", err.message);
      setButtonState('idle');
    }
  }

  return (
    <Button className={
      cn(
        "rounded-full cursor-pointer",
        buttonState === 'initiating' ? 'bg-amber-400 hover:bg-amber-400' : '',
        buttonState === 'listening' ? 'bg-emerald-300 hover:bg-emerald-500' : '',
        buttonState === 'processing' ? 'bg-indigo-500 hover:bg-indigo-500' : ''
      )
    } onClick={onSpeechMode}>
      <Speech />
      {buttonState === 'idle' && 'Voice Mode'}
      {buttonState === 'initiating' && 'Please wait...'}
      {buttonState === 'listening' && 'Speak Now...'}
      {buttonState === 'processing' && 'Processing...'}
    </Button>
  )
}