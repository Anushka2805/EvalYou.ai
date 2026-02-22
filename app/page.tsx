"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-24">
      <div className="text-center max-w-3xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Crack Interviews with{" "}
          <span className="text-purple-400">AI Feedback</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 mb-8 text-lg"
        >
          EvalYou.ai analyzes your speech, confidence, facial expressions and
          answers to help you improve with personalized insights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          <Link
            href="/signup"
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition"
          >
            Get Started
          </Link>
          <Link
            href="/signin"
            className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
          >
            Sign In
          </Link>
        </motion.div>
      </div>
    </main>
  );
}