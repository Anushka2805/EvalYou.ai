import { ReactNode } from "react";

export default function InterviewCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition cursor-pointer">
      <div className="mb-4 text-purple-400">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}