"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function SignupPage() {
  const supabase = createClient();
  const particlesRef = useRef<HTMLDivElement>(null);

  // Create fire particles - same as landing page
  useEffect(() => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;

    particlesContainer.innerHTML = "";

    const particleTypes = ["red", "orange", "yellow"];
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      particle.className = `particle ${type}`;
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 4 + "s";
      particle.style.animationDuration = 3 + Math.random() * 3 + "s";
      particlesContainer.appendChild(particle);
    }

    for (let i = 0; i < 10; i++) {
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
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects - Same as landing page */}
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

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-lg px-5 py-20">
        {/* Logo */}
        <Link href="/" className="logo justify-center mb-10">
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

        {/* Card - Using CTA box styling */}
        <div className="cta-box">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-3 relative z-10">
            Create your profile
          </h1>
          <p className="text-center mb-8 relative z-10" style={{ color: 'var(--text-muted)' }}>
            Join <span style={{ color: 'var(--primary)', fontWeight: 600 }}>666,000+</span> users. All features free.
          </p>

          {/* Discord Button */}
          <button
            onClick={handleDiscordLogin}
            className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-base relative z-10"
            style={{ background: '#5865F2', boxShadow: '0 0 20px rgba(88, 101, 242, 0.4), 0 4px 15px rgba(0, 0, 0, 0.3)' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02z" />
            </svg>
            Continue with Discord
          </button>

          {/* Features Grid */}
          <div className="mt-10 space-y-4 relative z-10">
            <div className="stat-card flex items-center gap-4" style={{ padding: '16px', textAlign: 'left' }}>
              <div className="feature-icon shrink-0" style={{ width: '48px', height: '48px', marginBottom: 0 }}>
                <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold">sins.wtf/yourname</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Your custom profile URL</p>
              </div>
            </div>

            <div className="stat-card flex items-center gap-4" style={{ padding: '16px', textAlign: 'left' }}>
              <div className="feature-icon purple shrink-0" style={{ width: '48px', height: '48px', marginBottom: 0 }}>
                <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold">Unlimited everything</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Links, socials, widgets, effects</p>
              </div>
            </div>

            <div className="stat-card flex items-center gap-4" style={{ padding: '16px', textAlign: 'left' }}>
              <div className="feature-icon green shrink-0" style={{ width: '48px', height: '48px', marginBottom: 0 }}>
                <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold">100% Free forever</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No hidden fees or premium tiers</p>
              </div>
            </div>
          </div>

          {/* Sign in link */}
          <p className="text-center text-sm mt-8 relative z-10" style={{ color: 'var(--text-muted)' }}>
            Already have an account?{" "}
            <Link href="/login" className="font-medium hover:underline" style={{ color: 'var(--primary)' }}>
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6 opacity-60" style={{ color: 'var(--text-muted)' }}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
