"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const supabase = createClient();

  const handleDiscordLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff3333]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#ff6600]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b0000]/10 rounded-full blur-[150px]" />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,51,51,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,51,51,0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8 group">
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-[#ff3333] group-hover:scale-110 transition-transform">
            <path
              d="M12 2C8.5 2 6 5 6 8C6 11 8 13 8 16C8 18 6 20 6 20H18C18 20 16 18 16 16C16 13 18 11 18 8C18 5 15.5 2 12 2Z"
              fill="currentColor"
            />
            <path
              d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20H10Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-3xl font-bold text-[#ff3333]">sins.wtf</span>
        </Link>

        {/* Card */}
        <div className="bg-gradient-to-b from-[#151515] to-[#0f0f0f] backdrop-blur-xl border border-[#ff3333]/20 rounded-2xl p-8 shadow-2xl shadow-black/50 relative overflow-hidden">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#ff3333]/5 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#ff3333]/50 to-transparent" />
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white text-center mb-2">
              Welcome back
            </h1>
            <p className="text-gray-400 text-center mb-8">
              Sign in to manage your profile
            </p>

            {/* Discord Button */}
            <button
              onClick={handleDiscordLogin}
              className="w-full flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#5865F2]/30 group"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02z" />
              </svg>
              Continue with Discord
            </button>

            <p className="text-gray-500 text-sm text-center mt-8">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#ff3333] hover:text-[#ff5555] font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-gray-600 text-xs text-center mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
