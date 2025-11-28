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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignupPage() {
  const supabase = createClient();
  const particlesRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

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
    if (!agreedToTerms) return;
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const features = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      title: "Custom Profile URL",
      description: "sins.wtf/yourname",
      color: "from-red-500/20 to-orange-500/20",
      borderColor: "border-red-500/30",
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: "Unlimited Links",
      description: "Add as many as you want",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "Custom Themes",
      description: "Colors, fonts, and effects",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Analytics",
      description: "Track your profile views",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Special Effects",
      description: "Particles, cursors, animations",
      color: "from-yellow-500/20 to-amber-500/20",
      borderColor: "border-yellow-500/30",
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "100% Free",
      description: "No premium tiers ever",
      color: "from-pink-500/20 to-rose-500/20",
      borderColor: "border-pink-500/30",
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-400",
    },
  ];

  const stats = [
    { value: "666K+", label: "Users" },
    { value: "6.6M+", label: "Profile Views" },
    { value: "420K+", label: "Links Created" },
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
              href="/login" 
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Already have an account?
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 hover:border-white/40">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-24 lg:px-12">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <Badge 
                variant="outline" 
                className="border-red-500/30 text-red-400 bg-red-500/10 px-4 py-1.5"
              >
                <span className="mr-2">🔥</span>
                Join {stats[0].value} users
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  Create your
                </span>
                <br />
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                  profile
                </span>
              </h1>
              
              <p className="text-white/50 text-lg max-w-sm mx-auto">
                Your personalized link-in-bio page. Free forever, no credit card required.
              </p>
            </div>

            {/* Main Card */}
            <Card className="border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl shadow-black/50">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-xl font-semibold text-center">
                  Get started in seconds
                </CardTitle>
                <CardDescription className="text-center text-white/50">
                  Sign up with your Discord account to continue
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Discord Button */}
                <Button
                  onClick={handleDiscordLogin}
                  disabled={!agreedToTerms || isLoading}
                  className="w-full h-14 text-base font-semibold relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: agreedToTerms 
                      ? 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)'
                      : 'linear-gradient(135deg, #3a3f4b 0%, #2a2f3b 100%)',
                    boxShadow: agreedToTerms 
                      ? '0 0 30px rgba(88, 101, 242, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)'
                      : '0 8px 32px rgba(0, 0, 0, 0.4)',
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
                      <span>Connecting...</span>
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

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    className="mt-0.5 border-white/30 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  />
                  <Label htmlFor="terms" className="text-sm text-white/60 leading-relaxed cursor-pointer">
                    I agree to the{" "}
                    <Link href="/terms" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="relative">
                  <Separator className="bg-white/10" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-xl px-4 text-xs text-white/40">
                    Why Discord?
                  </span>
                </div>

                {/* Discord Benefits */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-xs text-white/60">Secure login</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-xs text-white/60">One-click signup</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-xs text-white/60">Auto profile pic</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs text-white/60">No passwords</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4 pt-2">
                <p className="text-center text-xs text-white/40">
                  Already have an account?{" "}
                  <Link href="/login" className="text-red-400 hover:text-red-300 font-medium">
                    Sign in instead
                  </Link>
                </p>
              </CardFooter>
            </Card>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 text-white/30 text-xs">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Features (Hidden on mobile) */}
        <div className="hidden lg:flex flex-1 items-center justify-center px-12 py-24 border-l border-white/5">
          <div className="w-full max-w-lg space-y-10">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-red-400">{stat.value}</div>
                  <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Section Title */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">
                Everything you need.{" "}
                <span className="text-red-400">Free.</span>
              </h2>
              <p className="text-white/50">
                Other platforms charge $7-15/month for these features. We don&apos;t.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-xl border transition-all duration-300 cursor-default ${feature.borderColor} bg-gradient-to-br ${feature.color} backdrop-blur-sm`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{
                    transform: hoveredFeature === index ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: hoveredFeature === index ? '0 20px 40px rgba(0, 0, 0, 0.3)' : 'none',
                  }}
                >
                  <div className={`w-10 h-10 rounded-lg ${feature.iconBg} flex items-center justify-center mb-3 ${feature.iconColor}`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{feature.title}</h3>
                  <p className="text-white/50 text-xs">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Bottom Banner */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-2xl">
                  🔥
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">No premium tiers. No paywalls.</h3>
                  <p className="text-white/50 text-sm">Every feature is free. Forever.</p>
                </div>
              </div>
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
