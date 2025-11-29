"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Palette, Link2, BarChart3, User, Settings,
  HelpCircle, ExternalLink, Copy, Share2, Pencil, Smile, AtSign,
  Settings2, Plus, Trash2, GripVertical, Eye, TrendingUp, Check,
  ChevronDown, Hash, X, Upload, Briefcase, MapPin, Bold, Italic,
  Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight,
  Code, Minus, RotateCcw, RotateCw, LogOut,
} from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import styles from "./dashboard.module.css";

interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  views: number;
  links: Array<{
    id: string;
    title: string;
    url: string;
    sort_order: number;
    is_visible: boolean;
  }>;
  social_links: Array<{
    id: string;
    platform: string;
    url: string;
    is_visible: boolean;
  }>;
  profile_customization: {
    primary_color: string;
    background_color: string;
  } | null;
}

interface DashboardClientProps {
  profile: Profile;
  user: SupabaseUser;
}

type TabType = "dashboard" | "customize" | "links" | "analytics" | "profile" | "settings";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function DashboardClient({ profile: initialProfile, user }: DashboardClientProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [displayName, setDisplayName] = useState(profile.display_name || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [avatarShape, setAvatarShape] = useState<"square" | "soft" | "rounded" | "circle">("rounded");
  const [bgType, setBgType] = useState<"color" | "media">("color");
  const [bgColor, setBgColor] = useState("#1a1a1a");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleAddLink = async () => {
    if (!newLinkTitle || !newLinkUrl) return;
    const { data, error } = await supabase
      .from("links")
      .insert({
        profile_id: user.id,
        title: newLinkTitle,
        url: newLinkUrl.startsWith("http") ? newLinkUrl : `https://${newLinkUrl}`,
        sort_order: profile.links.length,
      })
      .select()
      .single();

    if (!error && data) {
      setProfile({ ...profile, links: [...profile.links, data] });
      setNewLinkTitle("");
      setNewLinkUrl("");
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    await supabase.from("links").delete().eq("id", linkId);
    setProfile({ ...profile, links: profile.links.filter((l) => l.id !== linkId) });
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "customize", label: "Customize", icon: Palette },
    { id: "links", label: "Links", icon: Link2, badge: profile.links.length },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  const accountItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.bgEffects}>
        <motion.div
          className={`${styles.bgGlow} ${styles.bgGlow1}`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`${styles.bgGlow} ${styles.bgGlow2}`}
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brandIcon}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M12 2C8.5 2 6 5 6 8C6 11 8 13 8 16C8 18 6 20 6 20H18C18 20 16 18 16 16C16 13 18 11 18 8C18 5 15.5 2 12 2Z" />
              <path d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20H10Z" />
            </svg>
          </div>
          <div>
            <div className={styles.brandTitle}>sins.wtf</div>
            <p className={styles.brandSubtitle}>Creator dashboard</p>
          </div>
        </div>

        <div className={styles.sidebarNav}>
          <div>
            <div className={styles.sidebarSectionLabel}>Main</div>
            <div className={styles.navGroup}>
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`${styles.navButton} ${activeTab === item.id ? styles.navButtonActive : ""}`}
                  onClick={() => setActiveTab(item.id as TabType)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className={styles.navIcon} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={styles.navBadge}>{item.badge}</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <div className={styles.sidebarSectionLabel}>Account</div>
            <div className={styles.navGroup}>
              {accountItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`${styles.navButton} ${activeTab === item.id ? styles.navButtonActive : ""}`}
                  onClick={() => setActiveTab(item.id as TabType)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className={styles.navIcon} />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarActions}>
            <a href={`/${profile.username}`} target="_blank" rel="noopener noreferrer" className={styles.outlineButton}>
              <ExternalLink size={14} />
              View
            </a>
            <button className={styles.outlineButton} onClick={() => navigator.clipboard.writeText(`https://sins.wtf/${profile.username}`)}>
              <Copy size={14} />
              Copy
            </button>
          </div>

          <div className={styles.helpCard}>
            <p className={styles.helpTitle}>Need help getting started?</p>
            <button className={styles.ghostButton}>
              <HelpCircle size={16} />
              Help Center
            </button>
          </div>

          <motion.button className={styles.primaryButton} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Share2 size={16} />
            Share Profile
          </motion.button>

          <div className={styles.sidebarUser}>
            <div className={styles.sidebarUserAvatar}>
              {profile.avatar_url ? <img src={profile.avatar_url} alt={profile.username} /> : profile.username.charAt(0).toUpperCase()}
            </div>
            <div className={styles.sidebarUserInfo}>
              <span className={styles.sidebarUserName}>{profile.display_name || profile.username}</span>
              <span className={styles.sidebarUserMeta}>UID {user.id.slice(0, 6)}</span>
            </div>
            <button onClick={handleSignOut} className={styles.sidebarSignOut}>
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.content}>
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && <DashboardTab key="dashboard" profile={profile} />}
            {activeTab === "customize" && (
              <CustomizeTab
                key="customize"
                profile={profile}
                displayName={displayName}
                setDisplayName={setDisplayName}
                bio={bio}
                setBio={setBio}
                avatarShape={avatarShape}
                setAvatarShape={setAvatarShape}
                bgType={bgType}
                setBgType={setBgType}
                bgColor={bgColor}
                setBgColor={setBgColor}
                occupation={occupation}
                setOccupation={setOccupation}
                location={location}
                setLocation={setLocation}
              />
            )}
            {activeTab === "links" && (
              <LinksTab
                key="links"
                profile={profile}
                newLinkTitle={newLinkTitle}
                setNewLinkTitle={setNewLinkTitle}
                newLinkUrl={newLinkUrl}
                setNewLinkUrl={setNewLinkUrl}
                handleAddLink={handleAddLink}
                handleDeleteLink={handleDeleteLink}
              />
            )}
            {activeTab === "analytics" && <AnalyticsTab key="analytics" profile={profile} />}
            {activeTab === "profile" && <ProfileTab key="profile" profile={profile} />}
            {activeTab === "settings" && <SettingsTab key="settings" />}
          </AnimatePresence>
        </div>

        <div className={styles.previewPanel}>
          <div className={styles.previewHeader}>
            <span className={styles.previewTitle}>Live Preview</span>
          </div>
          <motion.div className={styles.previewCard} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <div className={styles.previewViews}>
              <Eye size={14} />
              {profile.views}
            </div>
            <motion.div
              className={styles.previewAvatar}
              style={{ borderRadius: avatarShape === "square" ? 8 : avatarShape === "soft" ? 16 : avatarShape === "rounded" ? 24 : "50%" }}
              whileHover={{ scale: 1.05 }}
            >
              {profile.avatar_url ? <img src={profile.avatar_url} alt="" /> : "👤"}
            </motion.div>
            <div className={styles.previewName}>{displayName || profile.username}</div>
            <div className={styles.previewBadges}>
              <svg className={styles.previewBadge} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function DashboardTab({ profile }: { profile: Profile }) {
  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" variants={staggerContainer}>
      <motion.div className={styles.pageHeader} variants={fadeIn}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Welcome back! Here&apos;s an overview of your profile.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.headerBtn}><BarChart3 size={16} />Export</button>
          <button className={`${styles.headerBtn} ${styles.headerBtnPrimary}`}><Plus size={16} />Add Link</button>
        </div>
      </motion.div>

      <motion.div className={styles.overviewGrid} variants={staggerContainer}>
        {[
          { label: "Username", value: profile.username, sub: "Change available now", link: true, icon: Pencil },
          { label: "Alias", value: "No Alias", sub: "Set up alias", link: true, icon: AtSign },
          { label: "User ID", value: profile.id.slice(0, 6), sub: "Among the first 46%", purple: true, icon: Hash },
          { label: "Profile Views", value: profile.views, trend: "+3.2%", sub: "+2 views this week", green: true, icon: Eye },
        ].map((card, i) => (
          <motion.div key={i} className={`${styles.overviewCard} ${card.purple ? styles.overviewCardPurple : ""} ${card.green ? styles.overviewCardGreen : ""}`} variants={fadeIn} whileHover={{ y: -4 }}>
            <div className={styles.overviewHeader}>
              <span className={styles.overviewLabel}>{card.label}</span>
              <div className={styles.overviewIcon}><card.icon size={18} /></div>
            </div>
            <div className={styles.overviewValue}>
              {card.value}
              {card.trend && <span className={`${styles.trend} ${styles.trendUp}`}><TrendingUp size={12} />{card.trend}</span>}
            </div>
            <div className={styles.overviewSub}>{card.link ? <a href="#">{card.sub}</a> : card.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.contentGrid}>
        <div>
          <motion.div className={styles.sectionHeader} variants={fadeIn}>
            <h2 className={styles.sectionTitle}>Profile Status</h2>
            <span className={styles.sectionBadge}>Complete</span>
          </motion.div>

          <motion.div className={styles.statsCard} variants={fadeIn}>
            <div className={styles.completionHeader}>
              <span className={styles.completionTitle}>Profile Completion</span>
              <span className={styles.completionPercent}>100%</span>
            </div>
            <div className={styles.progressBar}>
              <motion.div className={styles.progressFill} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1 }} />
            </div>
            <div className={styles.completionStatus}>
              <div className={styles.completionStatusIcon}><Check size={20} /></div>
              <div className={styles.completionStatusText}>
                <h4>Your profile is complete!</h4>
                <p>Great job! Explore more features.</p>
              </div>
            </div>
            <div className={styles.checklist}>
              {["Upload Avatar", "Add Description", "Link Discord", "Add Socials", "Enable 2FA"].map((item) => (
                <div key={item} className={`${styles.checklistItem} ${styles.checklistItemCompleted}`}>
                  <span className={styles.checkIcon}><Check size={10} /></span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className={styles.analyticsHeader} variants={fadeIn}>
            <h2 className={styles.sectionTitle}>Analytics</h2>
            <button className={styles.viewMoreBtn}>View All<ChevronDown size={14} /></button>
          </motion.div>

          <motion.div className={styles.analyticsGrid} variants={fadeIn}>
            <div className={styles.analyticsCard}>
              <div className={styles.analyticsCardTitle}>Visitor Devices <span>(14 days)</span></div>
              <div className={styles.chartPlaceholder}><BarChart3 size={24} />Chart coming soon</div>
            </div>
            <div className={styles.analyticsCard}>
              <div className={styles.analyticsCardTitle}>Profile Views <span>(14 days)</span></div>
              <div className={styles.chartPlaceholder}><TrendingUp size={24} />Chart coming soon</div>
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div className={styles.quickActionsPanel} variants={fadeIn}>
            <h3 className={styles.quickActionsTitle}>Quick Actions</h3>
            <p className={styles.quickActionsSubtitle}>Manage your account settings</p>
            {[{ icon: Pencil, label: "Change Username" }, { icon: Smile, label: "Change Display Name" }, { icon: AtSign, label: "Set Alias" }, { icon: Settings2, label: "Account Settings" }].map((action) => (
              <motion.button key={action.label} className={styles.quickActionBtn} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <action.icon size={18} />
                {action.label}
              </motion.button>
            ))}
          </motion.div>

          <motion.div className={styles.connectionsPanel} variants={fadeIn}>
            <h3 className={styles.quickActionsTitle}>Connections</h3>
            <p className={styles.quickActionsSubtitle}>Link your accounts</p>
            <div className={styles.connectionItem}>
              <div className={styles.connectionIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
                </svg>
              </div>
              <div className={styles.connectionInfo}>
                <span className={styles.connectionText}>Discord Connected</span>
                <div className={styles.connectionStatus}>Connected as {profile.username}#1234</div>
              </div>
              <button className={styles.connectionDisconnect}><X size={12} /></button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function CustomizeTab({ profile, displayName, setDisplayName, bio, setBio, avatarShape, setAvatarShape, bgType, setBgType, bgColor, setBgColor, occupation, setOccupation, location, setLocation }: { profile: Profile; displayName: string; setDisplayName: (v: string) => void; bio: string; setBio: (v: string) => void; avatarShape: string; setAvatarShape: (v: "square" | "soft" | "rounded" | "circle") => void; bgType: string; setBgType: (v: "color" | "media") => void; bgColor: string; setBgColor: (v: string) => void; occupation: string; setOccupation: (v: string) => void; location: string; setLocation: (v: string) => void; }) {
  const shapes = ["square", "soft", "rounded", "circle"] as const;

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" variants={staggerContainer}>
      <motion.div className={styles.pageHeader} variants={fadeIn}>
        <div>
          <h1 className={styles.pageTitle}>Customize Profile</h1>
          <p className={styles.pageSubtitle}>Personalize how your profile looks to visitors.</p>
        </div>
      </motion.div>

      <motion.div className={styles.formSection} variants={fadeIn}>
        <div className={styles.formSectionTitle}>Avatar</div>
        <div className={styles.avatarSection}>
          <motion.div className={styles.avatarPreview} style={{ borderRadius: avatarShape === "square" ? 8 : avatarShape === "soft" ? 16 : avatarShape === "rounded" ? 24 : "50%" }} whileHover={{ scale: 1.05 }}>
            {profile.avatar_url ? <img src={profile.avatar_url} alt="" /> : "👤"}
          </motion.div>
          <div className={styles.avatarControls}>
            <motion.button className={`${styles.btn} ${styles.btnPurple}`} style={{ width: "auto" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Upload size={16} />Change Avatar
            </motion.button>
            <div style={{ marginTop: 12 }}>
              <span className={styles.formLabel}>Avatar Shape</span>
              <div className={styles.shapeOptions}>
                {shapes.map((shape) => (
                  <button key={shape} className={`${styles.shapeBtn} ${avatarShape === shape ? styles.shapeBtnActive : ""}`} onClick={() => setAvatarShape(shape)}>
                    {shape.charAt(0).toUpperCase() + shape.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className={styles.formSection} variants={fadeIn}>
        <div className={styles.formSectionTitle}>Decoration</div>
        <motion.button className={`${styles.btn} ${styles.btnPurple}`} style={{ width: "auto" }} whileHover={{ scale: 1.02 }}>Change Decoration</motion.button>
      </motion.div>

      <motion.div className={styles.formSection} variants={fadeIn}>
        <div className={styles.formSectionTitle}>Background</div>
        <div className={styles.toggleTabs}>
          <button className={`${styles.toggleTab} ${bgType === "color" ? styles.toggleTabActive : ""}`} onClick={() => setBgType("color")}>Color</button>
          <button className={`${styles.toggleTab} ${bgType === "media" ? styles.toggleTabActive : ""}`} onClick={() => setBgType("media")}>Media</button>
        </div>
        {bgType === "color" && (
          <div className={styles.colorPickerWrap}>
            <div className={styles.colorSwatch} style={{ background: bgColor }}>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            </div>
          </div>
        )}
        <p className={styles.formHint}>Sets a solid background color.</p>
      </motion.div>

      <motion.div className={styles.formSection} variants={fadeIn}>
        <div className={styles.formSectionTitle}>Banner</div>
        <motion.button className={`${styles.btn} ${styles.btnPurple}`} style={{ width: "auto" }} whileHover={{ scale: 1.02 }}><Upload size={16} />Change Banner</motion.button>
      </motion.div>

      <motion.div className={styles.formSection} variants={fadeIn}>
        <div className={styles.formSectionTitle}>Display Name</div>
        <div className={styles.formInputIcon}>
          <User size={18} />
          <input type="text" className={styles.formInput} value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Enter display name" />
        </div>
      </motion.div>

      <motion.div className={styles.formSection} variants={fadeIn}>
        <div className={styles.formSectionTitle}>Bio</div>
        <div className={styles.editorToolbar}>
          {[{ label: "H₁" }, { label: "H₂" }, { label: "H₃" }, { icon: Bold }, { icon: Italic }, { icon: Underline }, { icon: Strikethrough }, { icon: AlignLeft }, { icon: AlignCenter }, { icon: AlignRight }, { icon: Code }, { icon: Minus }, { icon: RotateCcw }, { icon: RotateCw }].map((btn, i) => (
            <button key={i} className={styles.editorBtn}>{btn.icon ? <btn.icon size={14} /> : btn.label}</button>
          ))}
        </div>
        <div className={styles.editorContent} contentEditable suppressContentEditableWarning onBlur={(e) => setBio(e.currentTarget.textContent || "")}>{bio}</div>
      </motion.div>

      <motion.div className={styles.formSection} variants={fadeIn}>
        <div className={styles.twoCol}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Occupation</label>
            <div className={styles.formInputIcon}>
              <Briefcase size={18} />
              <input type="text" className={styles.formInput} value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="e.g. Developer" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Location</label>
            <div className={styles.formInputIcon}>
              <MapPin size={18} />
              <input type="text" className={styles.formInput} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. New York" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className={styles.formSection} variants={fadeIn}>
        <div className={styles.tagsHeader}>
          <div className={styles.formSectionTitle} style={{ marginBottom: 0 }}>Tags</div>
          <button className={styles.addTagBtn}><Plus size={14} />New Tag</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function LinksTab({ profile, newLinkTitle, setNewLinkTitle, newLinkUrl, setNewLinkUrl, handleAddLink, handleDeleteLink }: { profile: Profile; newLinkTitle: string; setNewLinkTitle: (v: string) => void; newLinkUrl: string; setNewLinkUrl: (v: string) => void; handleAddLink: () => void; handleDeleteLink: (id: string) => void; }) {
  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" variants={staggerContainer}>
      <motion.div className={styles.pageHeader} variants={fadeIn}>
        <div>
          <h1 className={styles.pageTitle}>Links</h1>
          <p className={styles.pageSubtitle}>Manage your profile links and social media.</p>
        </div>
        <button className={`${styles.headerBtn} ${styles.headerBtnPrimary}`}><Plus size={16} />Add Link</button>
      </motion.div>

      <motion.div className={styles.formSection} variants={fadeIn}>
        <div className={styles.formSectionTitle}><Link2 size={20} />Your Links</div>
        <div className={styles.linksList}>
          {profile.links.map((link, i) => (
            <motion.div key={link.id} className={styles.linkItem} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ x: 4 }}>
              <div className={styles.linkDragHandle}><GripVertical size={18} /></div>
              <div className={styles.linkIcon}><Link2 size={20} /></div>
              <div className={styles.linkInfo}>
                <div className={styles.linkTitle}>{link.title}</div>
                <div className={styles.linkUrl}>{link.url}</div>
              </div>
              <div className={styles.linkActions}>
                <button className={styles.linkActionBtn}><Pencil size={14} /></button>
                <button className={`${styles.linkActionBtn} ${styles.linkActionBtnDelete}`} onClick={() => handleDeleteLink(link.id)}><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
          <div className={styles.addLinkForm}>
            <input type="text" className={styles.formInput} placeholder="Link title" value={newLinkTitle} onChange={(e) => setNewLinkTitle(e.target.value)} />
            <input type="text" className={styles.formInput} placeholder="https://..." value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)} />
            <motion.button className={`${styles.btn} ${styles.btnPrimary}`} style={{ width: "auto", padding: "12px 20px" }} onClick={handleAddLink} whileHover={{ scale: 1.02 }}><Plus size={16} />Add</motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AnalyticsTab({ profile }: { profile: Profile }) {
  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" variants={staggerContainer}>
      <motion.div className={styles.pageHeader} variants={fadeIn}>
        <div>
          <h1 className={styles.pageTitle}>Analytics</h1>
          <p className={styles.pageSubtitle}>Track your profile performance.</p>
        </div>
      </motion.div>
      <motion.div className={styles.overviewGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }} variants={fadeIn}>
        <div className={styles.overviewCard}><div className={styles.overviewHeader}><span className={styles.overviewLabel}>Total Views</span><div className={styles.overviewIcon}><Eye size={18} /></div></div><div className={styles.overviewValue}>{profile.views}</div><div className={styles.overviewSub}>All time</div></div>
        <div className={styles.overviewCard}><div className={styles.overviewHeader}><span className={styles.overviewLabel}>This Week</span><div className={styles.overviewIcon}><TrendingUp size={18} /></div></div><div className={styles.overviewValue}>24</div><div className={styles.overviewSub}>+12% from last week</div></div>
        <div className={styles.overviewCard}><div className={styles.overviewHeader}><span className={styles.overviewLabel}>Link Clicks</span><div className={styles.overviewIcon}><Link2 size={18} /></div></div><div className={styles.overviewValue}>156</div><div className={styles.overviewSub}>All time</div></div>
      </motion.div>
      <motion.div className={styles.formSection} variants={fadeIn}>
        <div className={styles.formSectionTitle}>Views Over Time</div>
        <div className={styles.chartPlaceholder} style={{ height: 200 }}><BarChart3 size={32} />Analytics charts coming soon</div>
      </motion.div>
    </motion.div>
  );
}

function ProfileTab({ profile }: { profile: Profile }) {
  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" variants={staggerContainer}>
      <motion.div className={styles.pageHeader} variants={fadeIn}>
        <div><h1 className={styles.pageTitle}>Profile Settings</h1><p className={styles.pageSubtitle}>Manage your account information.</p></div>
      </motion.div>
      <motion.div className={styles.formSection} variants={fadeIn}>
        <div className={styles.formSectionTitle}>Account Information</div>
        <div className={styles.formGroup}><label className={styles.formLabel}>Username</label><input type="text" className={styles.formInput} value={profile.username} readOnly /></div>
        <div className={styles.formGroup}><label className={styles.formLabel}>Email</label><input type="email" className={styles.formInput} value="user@example.com" readOnly /></div>
      </motion.div>
    </motion.div>
  );
}

function SettingsTab() {
  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" variants={staggerContainer}>
      <motion.div className={styles.pageHeader} variants={fadeIn}>
        <div><h1 className={styles.pageTitle}>Settings</h1><p className={styles.pageSubtitle}>Configure your preferences.</p></div>
      </motion.div>
      <motion.div className={styles.formSection} variants={fadeIn}>
        <div className={styles.formSectionTitle}>Security</div>
        <motion.button className={`${styles.btn} ${styles.btnOutline}`} style={{ width: "auto" }} whileHover={{ scale: 1.02 }}>Change Password</motion.button>
      </motion.div>
      <motion.div className={styles.formSection} variants={fadeIn}>
        <div className={styles.formSectionTitle}>Two-Factor Authentication</div>
        <motion.button className={`${styles.btn} ${styles.btnPurple}`} style={{ width: "auto" }} whileHover={{ scale: 1.02 }}>Enable 2FA</motion.button>
      </motion.div>
    </motion.div>
  );
}
