"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, StopCircle, ArrowRight, Video, Timer } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useInterviewStore } from "@/store/useInterviewStore";

const QUESTION_TIME = 120; // seconds per question

export default function PracticePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const questions = useInterviewStore((s) => s.questions);
  const addAnswer = useInterviewStore((s) => s.addAnswer);

  const [currentQ, setCurrentQ] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIME);

  const progress = questions.length
    ? ((currentQ + 1) / questions.length) * 100
    : 0;

  // Camera
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    streamRef.current = stream;
    if (videoRef.current) videoRef.current.srcObject = stream;
    setCameraOn(true);
  };

  // Recording
  const startRecording = () => {
    if (!streamRef.current) return;

    chunksRef.current = [];
    const recorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

      addAnswer({
        question: questions[currentQ],
        videoUrl: url,
        timestamp: Date.now(),
      });
    };

    recorder.start();
    setIsRecording(true);

    // Start countdown
    setTimeLeft(QUESTION_TIME);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Auto-stop when time runs out
  useEffect(() => {
    if (isRecording && timeLeft <= 0) {
      stopRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const nextQuestion = () => {
    setPreviewUrl(null);
    setTimeLeft(QUESTION_TIME);
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
    }
  };

  if (!questions.length) {
    return (
      <div className="min-h-screen pt-24 px-8">
        <p className="text-gray-400">No questions loaded. Go back to Dashboard.</p>
      </div>
    );
  }

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const danger = timeLeft <= 10 && isRecording;

  return (
    <div className="min-h-screen pt-24 px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Practice Interview</h1>

      {/* Progress */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-6">
        <div
          className="bg-purple-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Camera */}
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
              <span className="text-gray-500">Camera Preview</span>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-3 flex-wrap items-center mb-4">
            {!cameraOn ? (
              <button
                onClick={startCamera}
                className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition"
              >
                <Video size={18} /> Turn On Camera
              </button>
            ) : (
              <>
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 transition px-5 py-2 rounded-lg font-medium"
                  >
                    <Mic size={18} /> Start Recording
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-lg font-medium"
                  >
                    <StopCircle size={18} /> Stop Recording
                  </button>
                )}
              </>
            )}

            {/* Timer */}
            <div
              className={`ml-auto flex items-center gap-2 px-3 py-2 rounded-lg border ${
                danger
                  ? "border-red-500 text-red-400"
                  : "border-white/20 text-gray-300"
              }`}
            >
              <Timer size={18} />
              <span className="font-mono">
                {mm}:{ss}
              </span>
            </div>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Recorded Preview</p>
              <video src={previewUrl} controls className="w-full rounded-lg" />
            </div>
          )}

          {isRecording && (
            <motion.div className="mt-2 text-red-400 text-sm">
              Recording in progress
            </motion.div>
          )}
        </div>

        {/* Question */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-sm text-gray-400 mb-2">
              Question {currentQ + 1} of {questions.length}
            </h2>
            <p className="text-xl font-semibold">{questions[currentQ]}</p>

            <p className="text-gray-400 text-sm mt-4">
              Maintain eye contact with the camera, speak clearly, and avoid filler
              words.
            </p>
          </div>

          <div className="flex justify-between mt-6">
            {currentQ === questions.length - 1 ? (
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
                Next Question <ArrowRight size={18} className="inline ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}