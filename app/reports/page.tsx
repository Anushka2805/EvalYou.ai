"use client";

import { TrendingUp, Smile, Mic, Eye, FileText } from "lucide-react";
import { useInterviewStore } from "@/store/useInterviewStore";
import Link from "next/link";

export default function ReportsPage() {
  const results = useInterviewStore((s) => s.results);
  const questions = useInterviewStore((s) => s.questions);

  if (!results) {
    return (
      <div className="min-h-screen pt-24 px-8 max-w-4xl mx-auto">
        <p className="text-gray-400">
          No report found. Please complete an interview first.
        </p>
        <Link
          href="/dashboard"
          className="text-purple-400 underline mt-4 inline-block"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  const cards = [
    { title: "Confidence", value: results.confidence, icon: <Smile /> },
    { title: "Communication", value: results.communication, icon: <Mic /> },
    { title: "Body Language", value: results.bodyLanguage, icon: <Eye /> },
    { title: "Content Quality", value: results.content, icon: <FileText /> },
  ];

  return (
    <div className="min-h-screen pt-24 px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Interview Report</h1>
      <p className="text-gray-400 mb-8">
        Here’s your detailed AI analysis and improvement suggestions.
      </p>

      {/* Overall */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Overall Score</h2>
          <p className="text-gray-400 text-sm">
            Based on speech, facial expressions, and content analysis
          </p>
        </div>
        <div className="text-4xl font-bold text-purple-400 flex items-center gap-2">
          <TrendingUp /> {results.overall}%
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        {cards.map((s) => (
          <div
            key={s.title}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <div className="text-purple-400 mb-2">{s.icon}</div>
            <h3 className="text-sm text-gray-400">{s.title}</h3>
            <p className="text-2xl font-bold mb-2">{s.value}%</p>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${s.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Per Question Feedback */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Per-Question Feedback</h2>
        <div className="space-y-4">
          {results.perQuestion.map((r, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="font-semibold mb-2">
                Q{i + 1}: {questions[i]}
              </h3>
              <p className="text-green-400 text-sm mb-1">
                ✅ What you did well: {r.feedbackGood}
              </p>
              <p className="text-yellow-400 text-sm">
                ⚠️ Needs improvement: {r.feedbackImprove}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/dashboard"
        className="inline-block bg-purple-500 hover:bg-purple-600 transition px-6 py-3 rounded-lg font-medium"
      >
        Start Another Interview
      </Link>
    </div>
  );
}