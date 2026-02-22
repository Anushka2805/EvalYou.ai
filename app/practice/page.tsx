"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, StopCircle, ArrowRight, Video } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const dummyQuestions = [
  "Tell me about yourself.",
  "Explain one challenging project you worked on.",
  "What are your strengths and weaknesses?",
  "Why should we hire you?",
];

export default function PracticePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [currentQ, setCurrentQ] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progress = ((currentQ + 1) / dummyQuestions.length) * 100;

  // Start camera + mic
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
      setError(null);
    } catch (err) {
      setError("Camera/Microphone access denied.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraOn(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextQuestion = () => {
    if (currentQ < dummyQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Practice Interview</h1>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-6">
        <div
          className="bg-purple-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Camera Section */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="w-full aspect-video bg-black/60 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
            {cameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">🎥 Camera Preview</span>
            )}
          </div>

          {error && (
            <div className="text-red-400 text-sm mb-2">{error}</div>
          )}

          <div className="flex gap-3 flex-wrap">
            {!cameraOn ? (
              <button
                onClick={startCamera}
                className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition"
              >
                <Video size={18} /> Turn On Camera
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition"
              >
                <Video size={18} /> Turn Off Camera
              </button>
            )}

            {!isRecording ? (
              <button
                onClick={() => setIsRecording(true)}
                disabled={!cameraOn}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition ${
                  cameraOn
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                <Mic size={18} /> Start Recording
              </button>
            ) : (
              <button
                onClick={() => setIsRecording(false)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-lg font-medium"
              >
                <StopCircle size={18} /> Stop Recording
              </button>
            )}
          </div>

          {isRecording && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-red-400 text-sm"
            >
              ● Recording... (audio + video)
            </motion.div>
          )}
        </div>

        {/* Question Panel */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-sm text-gray-400 mb-2">
              Question {currentQ + 1} of {dummyQuestions.length}
            </h2>
            <p className="text-xl font-semibold">
              {dummyQuestions[currentQ]}
            </p>

            <p className="text-gray-400 text-sm mt-4">
              Tip: Maintain eye contact with the camera, speak clearly, and avoid
              filler words.
            </p>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={nextQuestion}
              className="flex items-center gap-2 border border-white/20 px-5 py-3 rounded-lg hover:bg-white/10 transition"
            >
              Skip <ArrowRight size={18} />
            </button>

            {currentQ === dummyQuestions.length - 1 ? (
              <Link
                href="/analyzing"
                className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-lg font-medium"
              >
                Finish & Analyze
              </Link>
            ) : (
              <button
                onClick={nextQuestion}
                className="bg-purple-500 hover:bg-purple-600 transition px-6 py-3 rounded-lg font-medium"
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}