"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  // Dummy auth state
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-purple-400"
          >
            EvalYou<span className="text-white">.ai</span>
          </motion.div>
        </Link>

        {/* Nav */}
        <div className="flex gap-6 text-sm items-center">
          {loggedIn ? (
            <>
              <Link href="/dashboard" className="hover:text-purple-400 transition">
                Dashboard
              </Link>
              <Link href="/practice" className="hover:text-purple-400 transition">
                Practice
              </Link>
              <Link href="/reports" className="hover:text-purple-400 transition">
                Reports
              </Link>
              <Link href="/history" className="hover:text-purple-400 transition">
                History
              </Link>
              <Link href="/profile" className="hover:text-purple-400 transition">
                Profile
              </Link>
              <button
                onClick={() => setLoggedIn(false)}
                className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="hover:text-purple-400 transition">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition"
              >
                Sign Up
              </Link>
              <button
                onClick={() => setLoggedIn(true)}
                className="text-xs text-gray-400 underline"
              >
                (Dev) Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}