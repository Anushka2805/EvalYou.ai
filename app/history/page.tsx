import Link from "next/link";

const dummyHistory = [
  {
    id: 1,
    date: "2026-02-20",
    type: "CV-Based Technical",
    score: "71%",
  },
  {
    id: 2,
    date: "2026-02-18",
    type: "HR / Behavioral",
    score: "65%",
  },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen pt-24 px-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Interview History</h1>
      <p className="text-gray-400 mb-8">
        Review your past interviews and reports.
      </p>

      <div className="space-y-4">
        {dummyHistory.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold">{item.type}</h3>
              <p className="text-sm text-gray-400">Date: {item.date}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-purple-400 font-bold text-lg">
                {item.score}
              </div>
              <Link
                href="/reports"
                className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition text-sm"
              >
                View Report
              </Link>
            </div>
          </div>
        ))}
      </div>

      {dummyHistory.length === 0 && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-gray-400">
          No interviews yet. Start practicing from the Dashboard 🚀
        </div>
      )}
    </div>
  );
}