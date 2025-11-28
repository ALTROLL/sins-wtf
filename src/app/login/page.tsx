"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const supabase = createClient();
  const particlesRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Create fire particles - same as landing page
  useEffect(() => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;

    particlesContainer.innerHTML = "";

    const particleTypes = ["red", "orange", "yellow"];
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement("div");
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      particle.className = `particle ${type}`;
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 4 + "s";
      particle.style.animationDuration = 3 + Math.random() * 3 + "s";
      particlesContainer.appendChild(particle);
    }

    for (let i = 0; i < 15; i++) {
      const ember = document.createElement("div");
      ember.style.cssText = `
        position: absolute;
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
        background: #ff6633;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0;
        box-shadow: 0 0 ${5 + Math.random() * 10}px #ff3300;
        animation: ember ${5 + Math.random() * 5}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      particlesContainer.appendChild(ember);
    }
  }, []);

  const handleDiscordLogin = async () => {
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const recentActivity = [
    { user: "alex", action: "updated their profile", time: "2m ago" },
    { user: "sarah", action: "added new links", time: "5m ago" },
    { user: "mike", action: "joined sins.wtf", time: "8m ago" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="bg-effects">
        <div className="bg-gradient"></div>
        <div className="grid-overlay"></div>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
        <div className="fire-particles" ref={particlesRef}></div>
        <div className="ember-glow"></div>
        <div className="vignette"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="logo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C8.5 2 6 5 6 8C6 11 8 13 8 16C8 18 6 20 6 20H18C18 20 16 18 16 16C16 13 18 11 18 8C18 5 15.5 2 12 2Z"
                fill="currentColor"
              />
              <path
                d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20H10Z"
                fill="currentColor"
              />
            </svg>
            <span>sins.wtf</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link 
              href="/signup" 
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Don&apos;t have an account?
            </Link>
            <Link href="/signup">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 border-0"
              >
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Activity Feed (Hidden on mobile) */}
        <div className="hidden lg:flex flex-1 items-center justify-center px-12 py-24 border-r border-white/5">
          <div className="w-full max-w-lg space-y-10">
            {/* Welcome Back Message */}
            <div className="space-y-4">
              <Badge 
                variant="outline" 
                className="border-green-500/30 text-green-400 bg-green-500/10 px-4 py-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                6,234 users online now
              </Badge>
              
              <h2 className="text-3xl font-bold text-white">
                Welcome back to{" "}
                <span className="text-red-400">sins.wtf</span>
              </h2>
              <p className="text-white/50 text-lg">
                Your profile is waiting. Sign in to continue customizing and sharing your links.
              </p>
            </div>

            {/* Live Activity */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">
                Live Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/20 flex items-center justify-center text-sm font-semibold text-red-400">
                      {activity.user[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">
                        <span className="font-semibold">{activity.user}</span>{" "}
                        <span className="text-white/50">{activity.action}</span>
                      </p>
                    </div>
                    <span className="text-xs text-white/30">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
                <div className="text-3xl font-bold text-red-400">666K+</div>
                <div className="text-sm text-white/50 mt-1">Active Profiles</div>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
                <div className="text-3xl font-bold text-orange-400">6.6M+</div>
                <div className="text-sm text-white/50 mt-1">Monthly Views</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 relative">
              <svg className="absolute top-4 left-4 w-8 h-8 text-red-500/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <div className="pt-8">
                <p className="text-white/70 italic leading-relaxed">
                  &quot;sins.wtf is the only link-in-bio I&apos;ll ever use. Clean design, actually free features, no BS.&quot;
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center text-xs font-semibold text-purple-400">
                    J
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">@jason</p>
                    <p className="text-xs text-white/40">32k followers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-24 lg:px-12">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/20 mb-2">
                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  Welcome
                </span>
                <br />
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                  back
                </span>
              </h1>
              
              <p className="text-white/50 text-lg max-w-sm mx-auto">
                Sign in to access your dashboard and manage your profile.
              </p>
            </div>

            {/* Main Card */}
            <Card className="border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl shadow-black/50">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-xl font-semibold text-center">
                  Sign in to your account
                </CardTitle>
                <CardDescription className="text-center text-white/50">
                  Use your Discord account to continue
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Discord Button */}
                <Button
                  onClick={handleDiscordLogin}
                  disabled={isLoading}
                  className="w-full h-14 text-base font-semibold relative overflow-hidden group disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
                    boxShadow: '0 0 30px rgba(88, 101, 242, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 relative z-10">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02z" />
                      </svg>
                      <span>Continue with Discord</span>
                    </div>
                  )}
                </Button>

                <div className="relative">
                  <Separator className="bg-white/10" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-xl px-4 text-xs text-white/40">
                    Secure & Fast
                  </span>
                </div>

                {/* Login Benefits */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Secure Authentication</p>
                      <p className="text-xs text-white/50">Your account is protected by Discord&apos;s security</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">One-Click Login</p>
                      <p className="text-xs text-white/50">No passwords to remember, ever</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Session Persistence</p>
                      <p className="text-xs text-white/50">Stay logged in across sessions</p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4 pt-2">
                <p className="text-center text-xs text-white/40">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-red-400 hover:text-red-300 font-medium">
                    Create one for free
                  </Link>
                </p>
              </CardFooter>
            </Card>

            {/* Help Links */}
            <div className="flex items-center justify-center gap-6 text-white/30 text-xs">
              <Link href="/help" className="hover:text-white/50 transition-colors flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Need help?</span>
              </Link>
              <Link href="https://discord.gg/sins" className="hover:text-white/50 transition-colors flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02z" />
                </svg>
                <span>Join Discord</span>
              </Link>
              <Link href="/status" className="hover:text-white/50 transition-colors flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span>All systems online</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2024 sins.wtf. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="https://discord.gg/sins" className="hover:text-white/60 transition-colors">Discord</Link>
            <Link href="https://twitter.com/sinswtf" className="hover:text-white/60 transition-colors">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
