//@ts-nocheck
"use client";
import { FC, useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

interface TextProps {
  onFinish: (text: string) => void;
}

const VoiceRecorder: FC<TextProps> = ({ onFinish }) => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      console.log(recognitionInstance);

      recognitionInstance.onstart = () => {
        console.log("Recognition has started");
      };

      recognitionInstance.onresult = (event) => {
        console.log("Speech has been recognized");
        const interimTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join(" ");

        setTranscript(interimTranscript);
      };

      recognitionInstance.onend = () => {
        console.log("Recognition has ended");
        setListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [pauseTimeout, onFinish]);

  const handleStart = () => {
    if (recognition) {
      console.log("triggered");
      setListening(true);
      recognition.start();
    }
  };

  const handleStop = () => {
    if (recognition) {
      recognition.stop();
      if (transcript.trim()) {
        onFinish(transcript);
        setTranscript("");
      }
    }
  };

  if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div>
      <p className="mb-4 rounded-md bg-base-100">{transcript}</p>
      <p className="mb-2 text-xl font-bold">
        Microphone: {listening ? "Listening to your voice.." : "off"}
      </p>
      <div className="flex gap-3 justify-center">
        {listening ? (
          <Button onClick={handleStop}>Send</Button>
        ) : (
          <Button onClick={handleStart}>Start</Button>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
