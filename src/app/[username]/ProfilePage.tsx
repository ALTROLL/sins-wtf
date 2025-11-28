"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Profile, ProfileCustomization, Link as LinkType, SocialLink, Widget } from "@/types";

interface ProfilePageProps {
  data: {
    profile: Profile;
    customization: ProfileCustomization | null;
    links: LinkType[];
    socialLinks: SocialLink[];
    widgets: Widget[];
  };
}

// Social platform icons
const socialIcons: Record<string, React.ReactNode> = {
  discord: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  ),
  twitch: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
};

export default function ProfilePage({ data }: ProfilePageProps) {
  const { profile, customization, links, socialLinks, widgets } = data;
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply custom styles from customization
  const customStyles = customization
    ? {
        "--profile-primary": customization.primary_color,
        "--profile-secondary": customization.secondary_color,
        "--profile-bg": customization.background_color,
        "--profile-text": customization.text_color,
      }
    : {};

  // Typewriter effect
  useEffect(() => {
    if (!customization?.typewriter_enabled || !customization?.typewriter_phrases?.length) return;

    const phrases = customization.typewriter_phrases;
    const speed = customization.typewriter_speed || 100;
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const bioElement = document.getElementById("typewriter-bio");

    if (!bioElement) return;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        bioElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        bioElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = speed;

      if (isDeleting) {
        typeSpeed /= 2;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    };

    type();
  }, [customization]);

  // Inject custom CSS
  useEffect(() => {
    if (!customization?.custom_css) return;

    const style = document.createElement("style");
    style.textContent = customization.custom_css;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [customization?.custom_css]);

  const getAvatarClass = () => {
    const base = "w-24 h-24 md:w-32 md:h-32 overflow-hidden";
    const style = customization?.avatar_style || "circle";

    const styles: Record<string, string> = {
      circle: "rounded-full",
      square: "rounded-none",
      rounded: "rounded-2xl",
      hexagon: "clip-path-hexagon",
    };

    let classes = `${base} ${styles[style] || styles.circle}`;

    if (customization?.avatar_border) {
      classes += " ring-4 ring-[var(--profile-primary)]";
    }

    if (customization?.avatar_glow) {
      classes += " shadow-[0_0_30px_var(--profile-primary)]";
    }

    return classes;
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen profile-page"
      style={customStyles as React.CSSProperties}
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        {customization?.background_type === "image" && customization?.background_image_url ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${customization.background_image_url})`,
              filter: `blur(${customization.background_blur || 0}px)`,
              opacity: (customization.background_opacity || 100) / 100,
            }}
          />
        ) : customization?.background_type === "video" && customization?.background_video_url ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: `blur(${customization.background_blur || 0}px)`,
              opacity: (customization.background_opacity || 100) / 100,
            }}
          >
            <source src={customization.background_video_url} />
          </video>
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: customization?.background_color || "#0a0a0a" }}
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Banner */}
      {profile.banner_url && (
        <div className="relative w-full h-48 md:h-64">
          <Image
            src={profile.banner_url}
            alt="Profile banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        </div>
      )}

      {/* Main Content */}
      <main className="relative max-w-2xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-8">
          {/* Avatar */}
          {profile.avatar_url && (
            <div className={getAvatarClass()}>
              <Image
                src={profile.avatar_url}
                alt={profile.display_name || profile.username}
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}

          {/* Name & Bio */}
          <h1
            className="mt-4 text-2xl md:text-3xl font-bold"
            style={{
              color: customization?.text_color || "#fff",
              fontSize: customization?.title_font_size
                ? `${customization.title_font_size}px`
                : undefined,
            }}
          >
            {profile.display_name || profile.username}
          </h1>

          {profile.bio && (
            <p
              id={customization?.typewriter_enabled ? "typewriter-bio" : undefined}
              className="mt-2 max-w-md opacity-80"
              style={{
                color: customization?.text_color || "#fff",
                fontSize: customization?.bio_font_size
                  ? `${customization.bio_font_size}px`
                  : undefined,
              }}
            >
              {customization?.typewriter_enabled ? "" : profile.bio}
            </p>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: `${customization?.primary_color || "#ff3333"}20`,
                    color: customization?.primary_color || "#ff3333",
                  }}
                  title={social.platform}
                >
                  {socialIcons[social.platform] || (
                    <span className="text-sm font-medium">
                      {social.platform.charAt(0).toUpperCase()}
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}

          {/* View Count */}
          <p className="mt-4 text-sm opacity-50" style={{ color: customization?.text_color }}>
            {profile.views.toLocaleString()} views
          </p>
        </div>

        {/* Links */}
        {links.length > 0 && (
          <div className="space-y-3">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 rounded-xl text-center font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  backgroundColor:
                    link.background_color || `${customization?.primary_color || "#ff3333"}20`,
                  color: link.text_color || customization?.text_color || "#fff",
                  borderColor: link.border_color || customization?.primary_color || "#ff3333",
                  borderWidth: link.style === "outline" ? "2px" : "0",
                }}
              >
                {link.title}
              </a>
            ))}
          </div>
        )}

        {/* Widgets */}
        {widgets.length > 0 && (
          <div className="mt-8 space-y-4">
            {widgets.map((widget) => (
              <div
                key={widget.id}
                className="rounded-xl overflow-hidden"
                style={{ width: widget.width, height: widget.height }}
              >
                {widget.widget_type === "youtube" && (
                  <iframe
                    src={`https://www.youtube.com/embed/${(widget.config as { videoId?: string })?.videoId || ""}`}
                    className="w-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
                {widget.widget_type === "spotify" && (
                  <iframe
                    src={`https://open.spotify.com/embed/track/${(widget.config as { trackId?: string })?.trackId || ""}`}
                    className="w-full h-20"
                    allow="encrypted-media"
                  />
                )}
                {widget.widget_type === "discord" && (
                  <iframe
                    src={`https://discord.com/widget?id=${(widget.config as { serverId?: string })?.serverId || ""}&theme=dark`}
                    className="w-full h-[500px]"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm opacity-50 hover:opacity-100 transition-opacity"
            style={{ color: customization?.text_color }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
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
        </div>
      </main>
    </div>
  );
}
