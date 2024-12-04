//@ts-nocheck
"use client";
import "regenerator-runtime/runtime";
import { FC } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "@nextui-org/react";

interface TextProps {
  onFinish: (text: string) => void;
}

const VoiceRecorder: FC<TextProps> = ({ onFinish }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleSend = () => {
    SpeechRecognition.stopListening().then(() => {
      setTimeout(() => onFinish(transcript), 1000);
      resetTranscript();
    });
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div>
      <p className="mb-4 rounded-md bg-base-100">{transcript}</p>
      <p className="mb-2 text-xl font-bold">
        Microphone: {listening ? "Listing to your voice.." : "off"}
      </p>
      <div className="flex gap-3 justify-center">
        {listening ? (
          <Button onClick={handleSend}>Send</Button>
        ) : (
          <Button onClick={SpeechRecognition.startListening}>Start</Button>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
