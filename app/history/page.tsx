"use client";

import { useEffect } from "react";
import { useInterviewStore } from "@/store/useInterviewStore";
import { useRouter } from "next/navigation";
import { BarChart3, Clock, FileText, Trash2 } from "lucide-react";

export default function HistoryPage() {
  const sessions = useInterviewStore((s) => s.sessions);
  const loadSessions = useInterviewStore((s) => s.loadSessions);
  const loadSessionById = useInterviewStore((s) => s.loadSessionById);
  const deleteSession = useInterviewStore((s) => s.deleteSession);
  const clearSessions = useInterviewStore((s) => s.clearSessions);
  const router = useRouter();

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  return (
    <div className="min-h-screen pt-24 px-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Interview History</h1>
          <p className="text-gray-400">
            Review, resume, or delete your past interviews.
          </p>
        </div>

        {sessions.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to clear all history?")) {
                clearSessions();
              }
            }}
            className="flex items-center gap-2 border border-red-500/40 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/10 transition text-sm"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        )}
      </div>

      {sessions.length === 0 ? (
        <div className="text-gray-400">
          No sessions yet. Start your first interview!
        </div>
      ) : (
        <div className="grid gap-4">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="font-semibold">
                    {s.role} • {s.mode.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-400">
                    {s.company} • {s.experience}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                    <Clock size={14} />
                    {new Date(s.date).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <BarChart3 size={16} className="text-purple-400" />
                  <span className="font-semibold">
                    {s.results?.overall ?? "—"}%
                  </span>
                </div>

                <button
                  onClick={() => {
                    loadSessionById(s.id);
                    router.push("/reports");
                  }}
                  className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm"
                >
                  View
                </button>

                <button
                  onClick={() => {
                    if (confirm("Delete this session?")) {
                      deleteSession(s.id);
                    }
                  }}
                  className="border border-red-500/40 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/10 transition text-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}