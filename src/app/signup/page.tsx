"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Link as LinkIcon, LayoutGrid, Palette, BarChart2, Sparkles, DollarSign, ShieldCheck, Zap, User, Lock, Shield } from "lucide-react";
import "./signup.css";

export default function SignupPage() {
  const supabase = createClient();
  const particlesRef = useRef<HTMLDivElement>(null);
  const authCardRef = useRef<HTMLDivElement>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleDiscordLogin = async () => {
    if (!termsAccepted) {
      alert("Please accept the Terms of Service and Privacy Policy");
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  useEffect(() => {
    // Create floating particles
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;

    particlesContainer.innerHTML = "";
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "signup-particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = 6 + Math.random() * 4 + "s";
      const size = 2 + Math.random() * 4;
      particle.style.width = size + "px";
      particle.style.height = size + "px";
      particlesContainer.appendChild(particle);
    }
  }, []);

  useEffect(() => {
    // Tilt effect on auth card
    const authCard = authCardRef.current;
    if (!authCard) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = authCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      authCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      authCard.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    };

    authCard.addEventListener("mousemove", handleMouseMove);
    authCard.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      authCard.removeEventListener("mousemove", handleMouseMove);
      authCard.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="signup-page-wrapper">
      {/* Background effects */}
      <div className="signup-bg-effects">
        <div className="signup-bg-gradient"></div>
        <div className="signup-grid-overlay"></div>
        <div className="signup-orb signup-orb-1"></div>
        <div className="signup-orb signup-orb-2"></div>
      </div>
      <div className="signup-particles" ref={particlesRef}></div>
      <div className="signup-vignette"></div>

      {/* Navbar */}
      <nav className="signup-nav">
        <Link href="/" className="signup-logo">
          <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
            <path d="M12 2C8.5 2 6 5 6 8C6 11 8 13 8 16C8 18 6 20 6 20H18C18 20 16 18 16 16C16 13 18 11 18 8C18 5 15.5 2 12 2Z" fill="currentColor"/>
            <path d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20H10Z" fill="currentColor"/>
          </svg>
          sins.wtf
        </Link>
        <div className="signup-nav-right">
          Already have an account?
          <Link href="/login">Sign in</Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="signup-container">
        <div className="signup-wrapper">
          {/* Left side - Form */}
          <div className="signup-form-side">
            <div className="signup-badge">
              🔥 Join 666K+ users
            </div>
            <h1 className="signup-title">Create your<br/><span>profile</span></h1>
            <p className="signup-subtitle">Your personalized link-in-bio page. Free forever, no credit card required.</p>

            <div className="signup-auth-card" ref={authCardRef}>
              <div className="signup-auth-header">
                <p>Sign up with your Discord account to continue</p>
              </div>

              <button className="signup-discord-btn" onClick={handleDiscordLogin}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
                </svg>
                Continue with Discord
              </button>

              <div className="signup-divider">
                <span>Why Discord?</span>
              </div>

              <div className="signup-why-discord">
                <div className="signup-why-item">
                  <ShieldCheck />
                  Secure login
                </div>
                <div className="signup-why-item">
                  <Zap />
                  One-click signup
                </div>
                <div className="signup-why-item">
                  <User />
                  Auto profile pic
                </div>
                <div className="signup-why-item">
                  <Lock />
                  No passwords
                </div>
              </div>

              <div className="signup-terms-check">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
              </div>

              <div className="signup-signin-link">
                Already have an account? <Link href="/login">Sign in instead</Link>
              </div>

              <div className="signup-security-badges">
                <div className="signup-security-badge">
                  <Lock />
                  SSL Secured
                </div>
                <div className="signup-security-badge">
                  <Shield />
                  GDPR Compliant
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Features */}
          <div className="signup-features-side">
            <div className="signup-stats-row">
              <div className="signup-stat-item">
                <div className="signup-stat-number">666K+</div>
                <div className="signup-stat-label">Users</div>
              </div>
              <div className="signup-stat-item">
                <div className="signup-stat-number">6.6M+</div>
                <div className="signup-stat-label">Profile Views</div>
              </div>
              <div className="signup-stat-item">
                <div className="signup-stat-number">420K+</div>
                <div className="signup-stat-label">Links Created</div>
              </div>
            </div>

            <h2 className="signup-features-title">Everything you need. <span>Free.</span></h2>
            <p className="signup-features-subtitle">Other platforms charge $7-15/month for these features. We don&apos;t.</p>

            <div className="signup-feature-cards">
              <div className="signup-feature-card red">
                <LinkIcon />
                <h4>Custom Profile URL</h4>
                <p>sins.wtf/yourname</p>
              </div>
              <div className="signup-feature-card blue">
                <LayoutGrid />
                <h4>Unlimited Links</h4>
                <p>Add as many as you want</p>
              </div>
              <div className="signup-feature-card purple">
                <Palette />
                <h4>Custom Themes</h4>
                <p>Colors, fonts, and effects</p>
              </div>
              <div className="signup-feature-card yellow">
                <BarChart2 />
                <h4>Analytics</h4>
                <p>Track your profile views</p>
              </div>
              <div className="signup-feature-card pink">
                <Sparkles />
                <h4>Special Effects</h4>
                <p>Particles, cursors, animations</p>
              </div>
              <div className="signup-feature-card green">
                <DollarSign />
                <h4>100% Free</h4>
                <p>No premium tiers ever</p>
              </div>
            </div>

            <div className="signup-free-banner">
              <div className="signup-free-banner-icon">🔥</div>
              <div className="signup-free-banner-text">
                <h4>No premium tiers. No paywalls.</h4>
                <p>Every feature is free. Forever.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
