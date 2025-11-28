"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import "./signup.css";

export default function SignupPage() {
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
    <div className="signup-page">
      {/* Background effects */}
      <div className="signup-bg-effects">
        <div className="signup-orb signup-orb-1" />
        <div className="signup-orb signup-orb-2" />
      </div>

      <div className="signup-container">
        {/* Logo */}
        <Link href="/" className="signup-logo">
          <svg viewBox="0 0 24 24" fill="none">
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

        {/* Card */}
        <div className="signup-card">
          <h1>Create your profile</h1>
          <p className="signup-card-subtitle">
            Join 666,000+ users. All features free.
          </p>

          {/* Discord Button */}
          <button onClick={handleDiscordLogin} className="discord-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02z" />
            </svg>
            Continue with Discord
          </button>

          {/* Features */}
          <div className="signup-features">
            <div className="signup-feature">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Custom profile at sins.wtf/yourname
            </div>
            <div className="signup-feature">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Unlimited links and social icons
            </div>
            <div className="signup-feature">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Themes, effects, and custom CSS
            </div>
          </div>

          <p className="signup-footer-text">
            Already have an account?{" "}
            <Link href="/login">Sign in</Link>
          </p>
        </div>

        {/* Footer */}
        <p className="signup-terms">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
