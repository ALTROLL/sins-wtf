"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./profile.module.css";

interface ProfileData {
  profile: {
    id: string;
    username: string;
    display_name: string | null;
    bio: string | null;
    avatar_url: string | null;
    banner_url: string | null;
    views: number;
    created_at: string;
  };
  customization: {
    primary_color?: string;
    secondary_color?: string;
    background_color?: string;
    text_color?: string;
    name_color?: string;
    background_type?: "color" | "image" | "video";
    background_image_url?: string;
    background_video_url?: string;
    background_blur?: number;
    background_opacity?: number;
    card_style?: "classic" | "frosted_square" | "frosted_soft" | "outlined" | "aurora" | "transparent";
    card_radius?: number;
    layout_style?: "floating" | "stacked" | "compact";
    avatar_style?: "circle" | "square" | "rounded" | "hexagon";
    avatar_border?: boolean;
    avatar_glow?: boolean;
    name_font?: string;
    text_font?: string;
    sparkle_name?: boolean;
    click_to_enter?: boolean;
    audio_reactive?: boolean;
    parallax_enabled?: boolean;
    custom_cursor?: boolean;
    typewriter_enabled?: boolean;
    typewriter_phrases?: string[];
    typewriter_speed?: number;
    discord_user_id?: string;
    discord_widget_enabled?: boolean;
  } | null;
  links: Array<{ id: string; title: string; url: string; background_color?: string; text_color?: string }>;
  socialLinks: Array<{ id: string; platform: string; url: string; username?: string }>;
  widgets: Array<{ id: string; widget_type: string; config: Record<string, unknown> }>;
}

interface DiscordStatus {
  username?: string;
  avatar?: { url?: string; id?: string };
  status?: "online" | "idle" | "dnd" | "offline";
  custom_status?: { text?: string };
  activities?: Array<{ type: number; name?: string; details?: string; state?: string; assets?: { large_image?: string } }>;
}

const socialIcons: Record<string, React.ReactNode> = {
  discord: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02z" /></svg>,
  twitter: <svg viewBox="0 0 512 512" fill="currentColor"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9L389.2 48zm-24.8 373.8h39.1L151.1 88h-42l255.3 333.8z" /></svg>,
  youtube: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
  tiktok: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" /><path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" /><circle cx="18.406" cy="5.594" r="1.44" /></svg>,
  github: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>,
  spotify: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>,
  twitch: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" /></svg>,
  roblox: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.164 0L.16 18.928L18.836 24L23.84 5.072Zm8.747 15.354l-5.219-1.417l1.399-5.29l5.22 1.418l-1.4 5.29z" /></svg>,
  telegram: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>,
};

export default function ProfilePage({ data }: { data: ProfileData }) {
  const { profile, customization, links, socialLinks } = data;
  const [showEnter, setShowEnter] = useState(customization?.click_to_enter ?? false);
  const [isVisible, setIsVisible] = useState(!customization?.click_to_enter);
  const [typewriterText, setTypewriterText] = useState("");
  const [discordStatus, setDiscordStatus] = useState<DiscordStatus | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Typewriter effect
  useEffect(() => {
    if (!customization?.typewriter_enabled || !customization?.typewriter_phrases?.length) return;
    const phrases = customization.typewriter_phrases;
    const speed = customization.typewriter_speed || 100;
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        setTypewriterText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypewriterText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
      }
      let typeSpeed = isDeleting ? speed / 2 : speed;
      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }
      timeout = setTimeout(type, typeSpeed);
    };
    type();
    return () => clearTimeout(timeout);
  }, [customization?.typewriter_enabled, customization?.typewriter_phrases, customization?.typewriter_speed]);

  // Fetch Discord status
  useEffect(() => {
    if (!customization?.discord_widget_enabled || !customization?.discord_user_id) return;
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://dcdn.dstn.to/profile/${customization.discord_user_id}`);
        setDiscordStatus(await res.json());
      } catch (err) {
        console.error("Discord fetch failed:", err);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [customization?.discord_user_id, customization?.discord_widget_enabled]);

  // Parallax effect
  useEffect(() => {
    if (!customization?.parallax_enabled || !cardRef.current) return;
    const card = cardRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const rotateX = (e.clientY - rect.top - rect.height / 2) / 20;
      const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    };
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [customization?.parallax_enabled]);

  const handleEnterClick = () => {
    setShowEnter(false);
    setIsVisible(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.5;
      videoRef.current.play();
    }
  };

  const getCardStyleClass = () => {
    const map: Record<string, string> = {
      classic: styles.profileCardClassic,
      frosted_square: styles.profileCardFrostedSquare,
      frosted_soft: styles.profileCardFrostedSoft,
      outlined: styles.profileCardOutlined,
      aurora: styles.profileCardAurora,
      transparent: styles.profileCardTransparent,
    };
    return map[customization?.card_style || "classic"] || styles.profileCardClassic;
  };

  const getAvatarStyleClass = () => {
    const map: Record<string, string> = {
      circle: styles.avatarCircle,
      square: styles.avatarSquare,
      rounded: styles.avatarRounded,
      hexagon: styles.avatarHexagon,
    };
    return map[customization?.avatar_style || "circle"] || styles.avatarCircle;
  };

  const getLayoutClass = () => {
    const map: Record<string, string> = {
      floating: styles.layoutFloating,
      stacked: styles.layoutStacked,
      compact: styles.layoutCompact,
    };
    return map[customization?.layout_style || "stacked"] || styles.layoutStacked;
  };

  const getStatusClass = (s?: string) => {
    const map: Record<string, string> = {
      online: styles.statusOnline,
      idle: styles.statusIdle,
      dnd: styles.statusDnd,
      offline: styles.statusOffline,
    };
    return map[s || "offline"] || styles.statusOffline;
  };

  const getStatusText = (s?: string) => {
    const map: Record<string, string> = { online: "Online", idle: "Idle", dnd: "Do Not Disturb", offline: "Offline" };
    return map[s || "offline"] || "Offline";
  };

  const copyDiscord = (u?: string) => {
    if (u) {
      navigator.clipboard.writeText(u);
      alert(`Copied: ${u}`);
    }
  };

  const formatJoinDate = (d: string) => {
    const m = Math.floor((Date.now() - new Date(d).getTime()) / 2592000000);
    return m < 1 ? "Joined recently" : m === 1 ? "Joined 1 month ago" : `Joined ${m} months ago`;
  };

  const cssVars = {
    "--name-color": customization?.name_color || "#FFF",
    "--text-color": customization?.text_color || "rgba(255,255,255,0.9)",
    "--primary-color": customization?.primary_color || "#ff3333",
  } as React.CSSProperties;

  return (
    <div className={styles.profileContainer} style={{ ...cssVars, fontFamily: customization?.text_font || "'Fira Code', monospace" }}>
      {/* Background */}
      {customization?.background_type === "video" && customization?.background_video_url ? (
        <div className={styles.videoBackground}>
          <video
            ref={videoRef}
            loop
            playsInline
            muted={showEnter}
            autoPlay={!showEnter}
            style={{
              filter: customization.background_blur ? `blur(${customization.background_blur}px)` : undefined,
              opacity: (customization.background_opacity || 100) / 100,
            }}
          >
            <source src={customization.background_video_url} type="video/mp4" />
          </video>
        </div>
      ) : customization?.background_type === "image" && customization?.background_image_url ? (
        <div
          className={styles.imageBackground}
          style={{
            backgroundImage: `url(${customization.background_image_url})`,
            filter: customization.background_blur ? `blur(${customization.background_blur}px)` : undefined,
            opacity: (customization.background_opacity || 100) / 100,
          }}
        />
      ) : (
        <div className={styles.colorBackground} style={{ backgroundColor: customization?.background_color || "#000" }} />
      )}

      <div className={styles.nightOverlay} />

      {/* Click to enter */}
      {showEnter && (
        <div className={styles.enterOverlay} onClick={handleEnterClick}>
          <div className={styles.enterText}>click to enter...</div>
        </div>
      )}

      {/* Main container */}
      <div className={`${styles.mainContainer} ${isVisible ? styles.visible : ""}`}>
        <div
          ref={cardRef}
          className={`${styles.profileCard} ${getCardStyleClass()} ${getLayoutClass()}`}
          style={{ borderRadius: customization?.card_radius ? `${customization.card_radius}px` : undefined }}
        >
          {/* View count */}
          <div className={styles.viewCount}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            {profile.views.toLocaleString()}
          </div>

          {/* Avatar */}
          <div className={styles.avatarContainer}>
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.display_name || profile.username}
                className={`${styles.avatar} ${getAvatarStyleClass()}`}
                style={{
                  boxShadow: customization?.avatar_glow ? `0 0 30px ${customization.primary_color || "#ff3333"}` : undefined,
                  borderColor: customization?.avatar_border ? customization.primary_color : undefined,
                }}
              />
            ) : (
              <div
                className={`${styles.avatar} ${getAvatarStyleClass()}`}
                style={{ background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <span style={{ fontSize: 40 }}>{(profile.display_name || profile.username).charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* Username */}
          <div className={styles.usernameContainer}>
            <h1
              className={`${styles.username} ${customization?.sparkle_name ? styles.usernameSparkle : ""}`}
              style={{ fontFamily: customization?.name_font }}
            >
              {profile.display_name || profile.username}
            </h1>
            <span className={styles.premiumBadge} title="Premium">
              <svg viewBox="23 32 465 448" width="18" height="18" fill="currentColor">
                <path d="M396.31 32H264l84.19 112.26L396.31 32zm-280.62 0l48.12 112.26L248 32H115.69zM256 74.67L192 160h128l-64-85.33zm166.95-23.61L376.26 160H488L422.95 51.06zm-333.9 0L23 160h112.74L89.05 51.06zM146.68 192H24l222.8 288h.53L146.68 192zm218.64 0L264.67 480h.53L488 192H365.32zm-35.93 0H182.61L256 400l73.39-208z" />
              </svg>
            </span>
          </div>

          {/* Typewriter or Bio */}
          {customization?.typewriter_enabled ? (
            <div className={styles.typewriterContainer}>
              <span className={styles.typewriter}>{typewriterText}</span>
              <span className={styles.cursor} />
            </div>
          ) : profile.bio ? (
            <p className={styles.bio}>{profile.bio}</p>
          ) : null}

          {/* Join date */}
          <div className={styles.joinDate}>{formatJoinDate(profile.created_at)}</div>

          {/* Discord Widget */}
          {customization?.discord_widget_enabled && discordStatus && (
            <div className={styles.discordWidget}>
              <div className={styles.discordWidgetHeader}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02z" />
                </svg>
                <span>Discord Status</span>
              </div>
              <div className={styles.discordStatus}>
                <div className={styles.discordAvatar}>
                  <img
                    src={discordStatus.avatar?.url || `https://cdn.discordapp.com/avatars/${customization.discord_user_id}/${discordStatus.avatar?.id}.png`}
                    alt="Discord Avatar"
                  />
                  <div className={`${styles.statusIndicator} ${getStatusClass(discordStatus.status)}`} />
                </div>
                <div className={styles.discordInfo}>
                  <div className={styles.discordUsername}>{discordStatus.username || "Unknown"}</div>
                  <div className={styles.discordStatusText}>{discordStatus.custom_status?.text || getStatusText(discordStatus.status)}</div>
                </div>
              </div>
              {discordStatus.activities && discordStatus.activities.length > 0 && (
                <div className={styles.discordActivity}>
                  <div className={styles.activityHeader}>
                    {discordStatus.activities[0].type === 0 ? "Playing" : discordStatus.activities[0].type === 2 ? "Listening to" : "Activity"}
                  </div>
                  <div className={styles.activityContent}>
                    {discordStatus.activities[0].assets?.large_image && (
                      <img src={discordStatus.activities[0].assets.large_image} alt="" className={styles.activityImage} />
                    )}
                    <div className={styles.activityDetails}>
                      <h4>{discordStatus.activities[0].name}</h4>
                      {discordStatus.activities[0].details && <p>{discordStatus.activities[0].details}</p>}
                      {discordStatus.activities[0].state && <p>{discordStatus.activities[0].state}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className={styles.socialLinks}>
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.platform === "discord" ? "#" : s.url}
                  onClick={s.platform === "discord" ? () => copyDiscord(s.username) : undefined}
                  target={s.platform === "discord" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title={s.platform.charAt(0).toUpperCase() + s.platform.slice(1)}
                >
                  {socialIcons[s.platform] || <span>{s.platform.charAt(0).toUpperCase()}</span>}
                </a>
              ))}
            </div>
          )}

          {/* Links */}
          {links.length > 0 && (
            <div className={styles.linksContainer}>
              {links.map((l) => (
                <a
                  key={l.id}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkItem}
                  style={{ backgroundColor: l.background_color, color: l.text_color }}
                >
                  {l.title}
                </a>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className={styles.footer}>
            <Link href="/" className={styles.footerLink}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.5 2 6 5 6 8C6 11 8 13 8 16C8 18 6 20 6 20H18C18 20 16 18 16 16C16 13 18 11 18 8C18 5 15.5 2 12 2Z" />
                <path d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20H10Z" />
              </svg>
              sins.wtf
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
