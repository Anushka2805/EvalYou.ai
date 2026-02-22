"use client";

import { useEffect } from "react";
import { useInterviewStore } from "@/store/useInterviewStore";

export default function ProgressPage() {
  const sessions = useInterviewStore((s) => s.sessions);
  const loadSessions = useInterviewStore((s) => s.loadSessions);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  // take last 10 sessions, oldest → newest for graph
  const data = [...sessions]
    .slice(0, 10)
    .reverse()
    .map((s, i) => ({
      index: i + 1,
      score: s.results?.overall ?? 0,
    }));

  return (
    <div className="min-h-screen pt-24 px-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
      <p className="text-gray-400 mb-8">
        Track how your interview performance is improving over time.
      </p>

      {data.length === 0 ? (
        <div className="text-gray-400">No data yet. Complete some interviews.</div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-end gap-4 h-64">
            {data.map((d) => (
              <div key={d.index} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs text-gray-400">{d.score}%</div>
                <div
                  className="w-full bg-purple-500 rounded-md transition-all"
                  style={{ height: `${d.score * 2}px` }}
                  title={`Session ${d.index}: ${d.score}%`}
                />
                <div className="text-xs text-gray-500">#{d.index}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}