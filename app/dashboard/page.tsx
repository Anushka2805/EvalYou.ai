"use client";

import { useState, useEffect } from "react";
import { FileText, Briefcase, Building2, BarChart3, Clock, Play, Layers } from "lucide-react";
import Link from "next/link";
import { useInterviewStore } from "@/store/useInterviewStore";
import { useRouter } from "next/navigation";

type Mode = "cv" | "hr" | "company";

export default function Dashboard() {
  const [mode, setMode] = useState<Mode>("cv");
  const setConfig = useInterviewStore((s) => s.setConfig);
  const setQuestions = useInterviewStore((s) => s.setQuestions);
  const sessions = useInterviewStore((s) => s.sessions);
  const loadSessions = useInterviewStore((s) => s.loadSessions);
  const loadSessionById = useInterviewStore((s) => s.loadSessionById);
  const getLastSession = useInterviewStore((s) => s.getLastSession);
  const router = useRouter();
  useEffect(() => {
    loadSessions();
  }, [loadSessions]);
  const lastSession = getLastSession();
  const cardClass = (active: boolean) =>
    `bg-white/5 border rounded-xl p-6 cursor-pointer transition ${active ? "border-purple-500" : "border-white/10 hover:border-purple-500/50"
    }`;


  return (
    <div className="min-h-screen pt-24 px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">
        Choose interview type, configure settings, and start practicing.
      </p>
      {/* Summary Panel */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
            <Layers size={20} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Sessions</div>
            <div className="text-2xl font-bold">{sessions.length}</div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
            <BarChart3 size={20} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Last Score</div>
            <div className="text-2xl font-bold">
              {lastSession ? `${lastSession.results.overall}%` : "—"}
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
              <Clock size={20} />
            </div>
            <div>
              <div className="text-sm text-gray-400">Quick Actions</div>
              <div className="text-sm text-gray-300">
                Resume or start a new interview
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {lastSession && (
              <button
                onClick={() => {
  loadSessionById(lastSession.id);

  if (lastSession.results) {
    router.push("/reports");   // finished interview → show report
  } else {
    router.push("/practice");  // unfinished → continue interview
  }
}}
                className="flex items-center gap-2 border border-white/20 px-3 py-2 rounded-lg hover:bg-white/10 transition text-sm"
              >
                <Play size={16} />
                Resume
              </button>
            )}

            <button
              onClick={() => {
                // just scroll to setup section or let user pick mode
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 transition px-3 py-2 rounded-lg text-sm"
            >
              <Play size={16} />
              New
            </button>
          </div>
        </div>
      </div>
      {/* Mode चयन */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className={cardClass(mode === "cv")} onClick={() => setMode("cv")}>
          <div className="text-purple-400 mb-3">
            <FileText size={28} />
          </div>
          <h3 className="text-lg font-semibold">CV-Based Technical</h3>
          <p className="text-sm text-gray-400">
            Questions from your CV, skills, and projects.
          </p>
        </div>

        <div className={cardClass(mode === "hr")} onClick={() => setMode("hr")}>
          <div className="text-purple-400 mb-3">
            <Briefcase size={28} />
          </div>
          <h3 className="text-lg font-semibold">HR / Behavioral</h3>
          <p className="text-sm text-gray-400">
            Communication, personality, and situational questions.
          </p>
        </div>

        <div
          className={cardClass(mode === "company")}
          onClick={() => setMode("company")}
        >
          <div className="text-purple-400 mb-3">
            <Building2 size={28} />
          </div>
          <h3 className="text-lg font-semibold">Company-Specific</h3>
          <p className="text-sm text-gray-400">
            Practice for a specific company & role.
          </p>
        </div>
      </div>

      {/* Setup Panel */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Interview Setup</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <select className="bg-black border border-white/20 rounded-lg p-3">
            <option>Software Engineer</option>
            <option>Data Analyst</option>
            <option>Product Manager</option>
          </select>

          <select className="bg-black border border-white/20 rounded-lg p-3">
            <option>Fresher</option>
            <option>0-1 Years</option>
            <option>1-3 Years</option>
            <option>3+ Years</option>
          </select>

          {mode === "company" && (
            <select className="bg-black border border-white/20 rounded-lg p-3">
              <option>Google</option>
              <option>Microsoft</option>
              <option>Amazon</option>
              <option>Startup</option>
            </select>
          )}
        </div>

        {mode === "cv" && (
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-2 block">
              Upload Your CV (PDF)
            </label>
            <input
              type="file"
              className="block w-full text-sm text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-500 file:text-white
              hover:file:bg-purple-600"
            />
          </div>
        )}

        <button
          onClick={() => {
            setConfig({
              mode,
              role: "Software Engineer",
              experience: "Fresher",
              company: mode === "company" ? "Google" : "General",
            });

            setQuestions([
              "Tell me about yourself.",
              "Explain one challenging project you worked on.",
              "What are your strengths and weaknesses?",
              "Why should we hire you?",
            ]);

            router.push("/practice");
          }}
          className="bg-purple-500 hover:bg-purple-600 transition px-6 py-3 rounded-lg font-medium"
        >
          Start Practice Interview
        </button>
      </div>
    </div>
  );
}