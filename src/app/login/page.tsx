"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDiscordLogin = async () => {
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-violet-500/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Top navbar */}
      <nav className="relative z-10 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/30 transition-shadow duration-300">
              <span className="text-lg">👻</span>
            </div>
            <span className="text-lg font-semibold text-white tracking-tight">sins.wtf</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-400 hidden sm:block">Don&apos;t have an account?</span>
            <Link 
              href="/signup" 
              className="text-sm font-medium px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:brightness-110 transition-all duration-200 shadow-lg shadow-violet-500/20"
            >
              Sign up free
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Glass card */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            {/* Card header */}
            <div className="px-8 pt-10 pb-6 text-center">
              {/* Logo icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-xl shadow-violet-500/25 mb-6">
                <span className="text-3xl">👻</span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2" style={{ textWrap: 'balance' } as React.CSSProperties}>
                Welcome back
              </h1>

              {/* Subheading */}
              <p className="text-zinc-400 text-base">
                Sign in to manage your profile and links.
              </p>
            </div>

            {/* Card body */}
            <div className="px-8 pb-8 space-y-6">
              {/* Discord button */}
              <button
                onClick={handleDiscordLogin}
                disabled={isLoading}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-full h-14 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                style={{
                  boxShadow: isHovered 
                    ? '0 0 40px rgba(88, 101, 242, 0.35), 0 10px 40px rgba(0, 0, 0, 0.3)' 
                    : '0 0 20px rgba(88, 101, 242, 0.15), 0 8px 32px rgba(0, 0, 0, 0.2)',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02z" />
                    </svg>
                    <span className="text-base">Continue with Discord</span>
                  </div>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#0a0a0a]/80 backdrop-blur-xl px-4 text-xs text-zinc-500 uppercase tracking-wider">
                    Secure login
                  </span>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-zinc-100">Protected by Discord</div>
                    <div className="text-xs text-zinc-500">Enterprise-grade security</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-zinc-100">Instant access</div>
                    <div className="text-xs text-zinc-500">No passwords to remember</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-zinc-100">Stay signed in</div>
                    <div className="text-xs text-zinc-500">Persistent sessions across devices</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card footer */}
            <div className="px-8 py-5 bg-white/[0.02] border-t border-white/5">
              <p className="text-center text-xs text-zinc-500">
                By signing in, you agree to our{" "}
                <Link href="/terms" className="text-violet-400 hover:text-violet-300 transition-colors">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-violet-400 hover:text-violet-300 transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom link */}
          <p className="text-center text-sm text-zinc-500 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Create one for free
            </Link>
          </p>

          {/* Status indicator */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs text-zinc-400">All systems online</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">© 2025 sins.wtf. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Terms</Link>
            <Link href="/privacy" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Privacy</Link>
            <Link href="https://discord.gg/sins" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
