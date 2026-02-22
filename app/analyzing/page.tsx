"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mic, Eye, FileText, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { useInterviewStore } from "@/store/useInterviewStore";

const steps = [
  { icon: <Mic />, text: "Analyzing your speech & confidence..." },
  { icon: <Eye />, text: "Analyzing facial expressions & eye contact..." },
  { icon: <FileText />, text: "Analyzing your answers & structure..." },
  { icon: <Brain />, text: "Generating personalized feedback..." },
];

// helper to get random score in range
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default function AnalyzingPage() {
  const router = useRouter();
  const answers = useInterviewStore((s) => s.answers);
  const setResults = useInterviewStore((s) => s.setResults);
  const saveSessionToHistory = useInterviewStore((s) => s.saveSessionToHistory);

  useEffect(() => {
    // Fake AI processing
    const timer = setTimeout(() => {
      // Generate per-question results
      const perQuestion = answers.map(() => {
        const confidence = rand(55, 85);
        const communication = rand(50, 85);
        const bodyLanguage = rand(45, 80);
        const content = rand(55, 90);

        return {
          confidence,
          communication,
          bodyLanguage,
          content,
          feedbackGood: "Good clarity and flow in your answer.",
          feedbackImprove: "Try to reduce filler words and add more structure.",
        };
      });

      // Aggregate
      const avg = (key: keyof (typeof perQuestion)[0]) =>
        Math.round(
          perQuestion.reduce((s, q) => s + (q[key] as number), 0) /
            perQuestion.length
        );

      const confidence = avg("confidence");
      const communication = avg("communication");
      const bodyLanguage = avg("bodyLanguage");
      const content = avg("content");

      const overall = Math.round(
        (confidence + communication + bodyLanguage + content) / 4
      );

      setResults({
        overall,
        confidence,
        communication,
        bodyLanguage,
        content,
        perQuestion,
      });

      saveSessionToHistory();
      router.push("/reports");
    }, 3500);

    return () => clearTimeout(timer);
  }, [answers, router, setResults]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 px-6">
      <div className="max-w-xl w-full text-center bg-white/5 border border-white/10 rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-2">Analyzing Your Interview</h1>
        <p className="text-gray-400 mb-8">
          Our AI is processing your responses. This will just take a moment…
        </p>

        <div className="space-y-4 mb-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
              className="flex items-center gap-3 bg-black/40 rounded-lg p-3 text-left"
            >
              <div className="text-purple-400">{step.icon}</div>
              <div className="text-sm text-gray-300">{step.text}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-purple-400 text-sm"
        >
          ⏳ Please wait, generating your report...
        </motion.div>
      </div>
    </div>
  );
}