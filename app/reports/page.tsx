"use client";

import { TrendingUp, Smile, Mic, Eye, FileText } from "lucide-react";
import { motion } from "framer-motion";

const scores = [
  { title: "Confidence", value: 72, icon: <Smile /> },
  { title: "Communication", value: 68, icon: <Mic /> },
  { title: "Body Language", value: 60, icon: <Eye /> },
  { title: "Content Quality", value: 75, icon: <FileText /> },
];

const feedback = [
  {
    q: "Tell me about yourself",
    good: "Clear introduction and good flow.",
    improve: "Reduce filler words and slow down slightly.",
  },
  {
    q: "Explain one challenging project you worked on",
    good: "Good technical depth.",
    improve: "Structure your answer using STAR format.",
  },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen pt-24 px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Interview Report</h1>
      <p className="text-gray-400 mb-8">
        Here’s your detailed AI analysis and improvement suggestions.
      </p>

      {/* Overall Score */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Overall Score</h2>
          <p className="text-gray-400 text-sm">
            Based on speech, facial expressions, and content analysis
          </p>
        </div>
        <div className="text-4xl font-bold text-purple-400 flex items-center gap-2">
          <TrendingUp /> 71%
        </div>
      </div>

      {/* Score Cards */}
    {/* Score Cards */}
<div className="grid md:grid-cols-4 gap-6 mb-10">
  {scores.map((s) => (
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

      {/* Graph Placeholders */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-64 flex items-center justify-center text-gray-500">
          📈 Confidence Over Time (Graph Placeholder)
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-64 flex items-center justify-center text-gray-500">
          🎯 Fillers & Eye Contact Stats (Graph Placeholder)
        </div>
      </div>

      {/* Per Question Feedback */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Per-Question Feedback</h2>
        <div className="space-y-4">
          {feedback.map((f, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="font-semibold mb-2">Q: {f.q}</h3>
              <p className="text-green-400 text-sm mb-1">
                ✅ What you did well: {f.good}
              </p>
              <p className="text-yellow-400 text-sm">
                ⚠️ Needs improvement: {f.improve}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Before vs After */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Before vs After Progress</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-black/40 rounded-lg p-4 text-gray-400">
            Before: High filler words, low eye contact, unstructured answers
          </div>
          <div className="bg-black/40 rounded-lg p-4 text-gray-400">
            After: Improved clarity, better eye contact, more structured answers
          </div>
        </div>
      </div>
    </div>
  );
}