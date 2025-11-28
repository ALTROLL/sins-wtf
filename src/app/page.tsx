"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;

    // Clear existing particles
    particlesContainer.innerHTML = "";

    // Create fire particles with variety
    const particleTypes = ["red", "orange", "yellow"];
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      particle.className = `particle ${type}`;
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 4 + "s";
      particle.style.animationDuration = 3 + Math.random() * 3 + "s";
      particlesContainer.appendChild(particle);
    }

    // Create floating embers that drift sideways
    for (let i = 0; i < 20; i++) {
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

  // Counter animation
  useEffect(() => {
    const formatNumber = (num: number) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const animateCounter = (element: HTMLElement) => {
      const target = parseInt(element.getAttribute("data-target") || "0");
      const suffix = element.getAttribute("data-suffix") || "";
      const duration = 2000;

      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

      const startTime = performance.now();

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);

        const current = Math.floor(easedProgress * target);
        element.textContent = formatNumber(current) + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = formatNumber(target) + suffix;
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll<HTMLElement>(
              ".stat-number[data-target]"
            );
            counters.forEach((counter) => {
              if (!counter.classList.contains("counted")) {
                counter.classList.add("counted");
                animateCounter(counter);
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsSection = document.querySelector(".stats");
    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    return () => statsObserver.disconnect();
  }, []);

  // Accordion functionality
  const handleAccordionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const trigger = e.currentTarget;
    const item = trigger.parentElement;
    if (!item) return;

    const content = item.querySelector<HTMLElement>(".accordion-content");
    const inner = item.querySelector<HTMLElement>(".accordion-content-inner");
    if (!content || !inner) return;

    const isOpen = item.getAttribute("data-state") === "open";

    // Close all other items
    document.querySelectorAll(".accordion-item").forEach((otherItem) => {
      if (otherItem !== item && otherItem.getAttribute("data-state") === "open") {
        otherItem.setAttribute("data-state", "closed");
        const otherContent = otherItem.querySelector<HTMLElement>(".accordion-content");
        if (otherContent) otherContent.style.height = "0";
      }
    });

    // Toggle current item
    if (isOpen) {
      item.setAttribute("data-state", "closed");
      content.style.height = "0";
    } else {
      item.setAttribute("data-state", "open");
      content.style.height = inner.offsetHeight + "px";
    }
  };

  return (
    <>
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
        <div className="noise-overlay"></div>
        <div className="scanlines"></div>
        <div className="vignette"></div>
      </div>

      {/* Navigation */}
      <nav>
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
          sins.wtf
        </Link>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#faq">FAQ</a>
          <a href="https://discord.gg/hell" target="_blank" rel="noopener noreferrer">
            Discord
          </a>
        </div>
        <div className="nav-buttons">
          <Link href="/login" className="btn btn-ghost">
            Login
          </Link>
          <Link href="/signup" className="btn btn-primary">
            Sign Up Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Everything. Completely Free.</h1>
        <p>
          sins.wtf gives you all the premium features other platforms charge for.
          Custom profiles, analytics, effects, and more. All for free. No paywalls.
          No subscriptions. Just freedom.
        </p>
        <div className="hero-buttons">
          <Link href="/signup" className="btn btn-primary">
            Claim Your Profile
          </Link>
          <a href="#faq" className="btn btn-ghost">
            Learn More
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" data-target="6660000" data-suffix="+">
              0
            </div>
            <div className="stat-label">Profile Views</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-target="666000" data-suffix="+">
              0
            </div>
            <div className="stat-label">Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-target="420000" data-suffix="+">
              0
            </div>
            <div className="stat-label">Links Created</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-target="13000" data-suffix="+">
              0
            </div>
            <div className="stat-label">Daily Active</div>
          </div>
        </div>
      </section>

      {/* Claim Section */}
      <section className="claim-section">
        <h2>Claim your profile in seconds!</h2>
        <div className="input-group">
          <span className="input-group-addon">sins.wtf/</span>
          <input
            type="text"
            className="input-group-input"
            placeholder="yourname"
            id="claimInput"
          />
          <button className="input-group-button">Claim Now</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>Everything included. Zero cost.</h2>
        <p className="features-subtitle">
          Other platforms charge $7-15 for these. We give them to you free.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="icon-text-cursor-input"></i>
            </div>
            <h3>Typewriter Description</h3>
            <p>
              Animate your bio with a typewriter effect. Customize speed, deletion
              timing, and multiple phrases.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon purple">
              <i className="icon-search"></i>
            </div>
            <h3>Metadata & SEO</h3>
            <p>
              Custom title, description, embed image, favicon. Full control over how
              your profile appears everywhere.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon blue">
              <i className="icon-layout-grid"></i>
            </div>
            <h3>Profile Widgets</h3>
            <p>
              Display your YouTube, Discord server, Telegram, Spotify, and more with
              beautiful widgets.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon yellow">
              <i className="icon-sparkles"></i>
            </div>
            <h3>Cursor Effects</h3>
            <p>
              Trails, sparkles, custom cursors. Make every mouse movement an
              experience.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon pink">
              <i className="icon-palette"></i>
            </div>
            <h3>Layout Customization</h3>
            <p>
              Banners, borders, buttons, icons, profile layouts. Endless ways to make
              it yours.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon green">
              <i className="icon-type"></i>
            </div>
            <h3>Custom Fonts</h3>
            <p>
              Choose from dozens of fonts or upload your own. Your profile, your
              typography.
            </p>
          </div>
        </div>
        <div className="features-banner">
          <span className="banner-text">
            🔥 No premium tiers. No paywalls. No catch. Just free.
          </span>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq" id="faq">
        <h2>Frequently Asked Questions</h2>
        <p className="faq-subtitle">Got questions? We&apos;ve got answers.</p>
        <div className="faq-container">
          <div className="accordion">
            <div className="accordion-item" data-state="closed">
              <button className="accordion-trigger" onClick={handleAccordionClick}>
                What is sins.wtf?
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  sins.wtf is a completely free link-in-bio platform that gives you
                  all the premium features other sites charge for. Create a
                  beautiful, customizable profile page to share your links, socials,
                  and content. No subscription required.
                </div>
              </div>
            </div>
            <div className="accordion-item" data-state="closed">
              <button className="accordion-trigger" onClick={handleAccordionClick}>
                Is sins.wtf really 100% free?
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Yes, completely free. No hidden fees, no premium tiers, no
                  &quot;upgrade to unlock&quot; nonsense. Every feature is available
                  to everyone: custom fonts, effects, analytics, widgets, and more.
                  We believe creativity shouldn&apos;t have a paywall.
                </div>
              </div>
            </div>
            <div className="accordion-item" data-state="closed">
              <button className="accordion-trigger" onClick={handleAccordionClick}>
                Why is sins.wtf free when others charge?
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  We&apos;re built different. While other platforms nickel-and-dime
                  you for basic features, we run on efficient infrastructure and
                  community support. Our goal is to democratize online presence.
                  Everyone deserves a great profile page.
                </div>
              </div>
            </div>
            <div className="accordion-item" data-state="closed">
              <button className="accordion-trigger" onClick={handleAccordionClick}>
                What features are included?
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Everything: typewriter animations, custom fonts (or upload your
                  own), full layout customization with banners and borders, profile
                  widgets for YouTube/Discord/Spotify, cursor effects, complete SEO &
                  metadata control, and unlimited links. New features added
                  regularly.
                </div>
              </div>
            </div>
            <div className="accordion-item" data-state="closed">
              <button className="accordion-trigger" onClick={handleAccordionClick}>
                Is sins.wtf safe and secure?
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Absolutely. We use encrypted HTTPS connections, modern security
                  infrastructure, and strict content moderation. Over 666,000 users
                  trust us with their profiles. Your data stays safe with us.
                </div>
              </div>
            </div>
            <div className="accordion-item" data-state="closed">
              <button className="accordion-trigger" onClick={handleAccordionClick}>
                How long does it take to set up?
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Less than a minute. Sign up, claim your username, add your links,
                  pick a theme, and you&apos;re live. Customization is intuitive. No
                  coding required, but power users can add custom CSS too.
                </div>
              </div>
            </div>
            <div className="accordion-item" data-state="closed">
              <button className="accordion-trigger" onClick={handleAccordionClick}>
                How does sins.wtf stay free?
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  sins.wtf is a passion project funded by the team behind it and
                  supported by community donations. We keep costs low with efficient
                  infrastructure and put users first. No investors, no ads, no
                  corporate nonsense. Just a small team that believes everyone
                  deserves a great profile page.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-box">
          <h2>Join the free revolution.</h2>
          <p>666,000+ users already ditched paid platforms. Your turn.</p>
          <div className="input-group" style={{ maxWidth: "400px" }}>
            <span className="input-group-addon">sins.wtf/</span>
            <input
              type="text"
              className="input-group-input"
              placeholder="yourname"
            />
            <button className="input-group-button">Claim</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
              >
                <path
                  d="M12 2C8.5 2 6 5 6 8C6 11 8 13 8 16C8 18 6 20 6 20H18C18 20 16 18 16 16C16 13 18 11 18 8C18 5 15.5 2 12 2Z"
                  fill="currentColor"
                />
                <path
                  d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20H10Z"
                  fill="currentColor"
                />
              </svg>
              sins.wtf
            </Link>
            <p>Create dark, feature-rich link-in-bio pages. Embrace your sins.</p>
          </div>
          <div className="footer-column">
            <h4>General</h4>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
            <a href="#">Pricing</a>
            <a href="#">Status</a>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <a href="#">Help Center</a>
            <a href="#">Changelog</a>
            <a href="#">API Docs</a>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <a href="#">Discord Server</a>
            <a href="mailto:support@sins.wtf">support@sins.wtf</a>
            <a href="#">Twitter/X</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 sins.wtf - All Rights Reserved.</p>
          <div className="social-links">
            <a href="#" title="Discord">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
              </svg>
            </a>
            <a href="#" title="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" title="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
