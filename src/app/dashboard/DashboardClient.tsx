"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Link2, Palette, Settings, ExternalLink, LogOut, GripVertical, Trash2, Edit, Plus, Eye, MousePointer } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import "./dashboard.css";

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

export default function DashboardClient({ profile: initialProfile, user }: DashboardClientProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "links" | "appearance" | "settings">("profile");
  const router = useRouter();
  const supabase = createClient();

  // Profile form state
  const [username, setUsername] = useState(profile.username);
  const [displayName, setDisplayName] = useState(profile.display_name || "");
  const [bio, setBio] = useState(profile.bio || "");

  // New link form state
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        username: username.toLowerCase(),
        display_name: displayName,
        bio,
      })
      .eq("id", user.id);

    if (!error) {
      setProfile({ ...profile, username, display_name: displayName, bio });
    }
    setSaving(false);
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
      setProfile({
        ...profile,
        links: [...profile.links, data],
      });
      setNewLinkTitle("");
      setNewLinkUrl("");
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    const { error } = await supabase.from("links").delete().eq("id", linkId);

    if (!error) {
      setProfile({
        ...profile,
        links: profile.links.filter((l) => l.id !== linkId),
      });
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "links", label: "Links", icon: Link2 },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <div className="dashboard-wrapper">
      {/* Background */}
      <div className="dashboard-bg">
        <div className="dashboard-bg-gradient"></div>
        <div className="dashboard-orb dashboard-orb-1"></div>
        <div className="dashboard-orb dashboard-orb-2"></div>
      </div>

      {/* Navbar */}
      <nav className="dashboard-nav">
        <Link href="/" className="dashboard-logo">
          <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
            <path d="M12 2C8.5 2 6 5 6 8C6 11 8 13 8 16C8 18 6 20 6 20H18C18 20 16 18 16 16C16 13 18 11 18 8C18 5 15.5 2 12 2Z" fill="currentColor"/>
            <path d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20H10Z" fill="currentColor"/>
          </svg>
          sins.wtf
        </Link>
        <div className="dashboard-nav-actions">
          <a 
            href={`/${profile.username}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="dashboard-nav-btn"
          >
            <ExternalLink />
            View Profile
          </a>
          <button onClick={handleSignOut} className="dashboard-nav-btn">
            <LogOut />
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main layout */}
      <div className="dashboard-main">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-profile">
            <div className="sidebar-avatar">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={displayName || username} />
              ) : (
                (displayName?.[0] || username[0])?.toUpperCase()
              )}
            </div>
            <div className="sidebar-name">{displayName || username}</div>
            <div className="sidebar-username">sins.wtf/{username}</div>
            <div className="sidebar-stats">
              <div className="sidebar-stat">
                <div className="sidebar-stat-value">{profile.views}</div>
                <div className="sidebar-stat-label">Views</div>
              </div>
              <div className="sidebar-stat">
                <div className="sidebar-stat-value">{profile.links.length}</div>
                <div className="sidebar-stat-label">Links</div>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`sidebar-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="dashboard-content">
          {/* Quick actions */}
          {activeTab === "profile" && (
            <>
              <div className="quick-actions">
                <button onClick={() => setActiveTab("links")} className="quick-action">
                  <div className="quick-action-icon red">
                    <Plus />
                  </div>
                  <span>Add Link</span>
                </button>
                <button onClick={() => setActiveTab("appearance")} className="quick-action">
                  <div className="quick-action-icon purple">
                    <Palette />
                  </div>
                  <span>Customize</span>
                </button>
                <a href={`/${profile.username}`} target="_blank" rel="noopener noreferrer" className="quick-action">
                  <div className="quick-action-icon blue">
                    <Eye />
                  </div>
                  <span>Preview</span>
                </a>
                <button className="quick-action">
                  <div className="quick-action-icon green">
                    <MousePointer />
                  </div>
                  <span>Share</span>
                </button>
              </div>
            </>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="dashboard-card">
              <h2 className="card-title">
                <User />
                Profile Settings
              </h2>

              <div className="form-group">
                <label className="form-label">Username</label>
                <div className="form-input-group">
                  <span className="form-input-prefix">sins.wtf/</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                    className="form-input"
                    placeholder="yourname"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="form-input"
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="form-input"
                  placeholder="Tell people about yourself..."
                  rows={3}
                />
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="btn btn-primary btn-full"
              >
                {saving ? (
                  <>
                    <div className="spinner"></div>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          )}

          {/* Links Tab */}
          {activeTab === "links" && (
            <>
              <div className="section-header">
                <h1 className="section-title">Your <span>Links</span></h1>
              </div>

              <div className="dashboard-card">
                <h2 className="card-title">
                  <Plus />
                  Add New Link
                </h2>
                <div className="add-link-form">
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      value={newLinkTitle}
                      onChange={(e) => setNewLinkTitle(e.target.value)}
                      className="form-input"
                      placeholder="My Website"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">URL</label>
                    <input
                      type="url"
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      className="form-input"
                      placeholder="https://example.com"
                    />
                  </div>
                  <button
                    onClick={handleAddLink}
                    disabled={!newLinkTitle || !newLinkUrl}
                    className="btn btn-primary"
                  >
                    <Plus />
                    Add
                  </button>
                </div>
              </div>

              <div className="dashboard-card">
                <h2 className="card-title">
                  <Link2 />
                  All Links
                </h2>
                {profile.links.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">
                      <Link2 />
                    </div>
                    <h3>No links yet</h3>
                    <p>Add your first link above to get started!</p>
                  </div>
                ) : (
                  <div className="links-list">
                    {profile.links
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((link) => (
                        <div key={link.id} className="link-item">
                          <div className="link-drag">
                            <GripVertical />
                          </div>
                          <div className="link-info">
                            <div className="link-title">{link.title}</div>
                            <div className="link-url">{link.url}</div>
                          </div>
                          <div className="link-actions">
                            <button className="link-action-btn">
                              <Edit />
                            </button>
                            <button
                              onClick={() => handleDeleteLink(link.id)}
                              className="link-action-btn delete"
                            >
                              <Trash2 />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <>
              <div className="section-header">
                <h1 className="section-title">Customize <span>Appearance</span></h1>
              </div>

              <div className="dashboard-card">
                <h2 className="card-title">
                  <Palette />
                  Theme Settings
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>
                  Full theme customization coming soon! You&apos;ll be able to change:
                </p>
                <div className="appearance-grid">
                  <div className="appearance-option">
                    <div className="appearance-option-title">🎨 Colors</div>
                    <div className="appearance-option-desc">Primary, background, text colors</div>
                  </div>
                  <div className="appearance-option">
                    <div className="appearance-option-title">✨ Effects</div>
                    <div className="appearance-option-desc">Particles, cursor effects, animations</div>
                  </div>
                  <div className="appearance-option">
                    <div className="appearance-option-title">🖼️ Background</div>
                    <div className="appearance-option-desc">Images, videos, gradients</div>
                  </div>
                  <div className="appearance-option">
                    <div className="appearance-option-title">🔤 Typography</div>
                    <div className="appearance-option-desc">Fonts, sizes, styles</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <>
              <div className="section-header">
                <h1 className="section-title">Account <span>Settings</span></h1>
              </div>

              <div className="dashboard-card">
                <h2 className="card-title">
                  <Settings />
                  Account
                </h2>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="form-input"
                    style={{ opacity: 0.6 }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Account ID</label>
                  <input
                    type="text"
                    value={user.id}
                    disabled
                    className="form-input"
                    style={{ opacity: 0.6, fontFamily: 'monospace', fontSize: 13 }}
                  />
                </div>
              </div>

              <div className="dashboard-card" style={{ borderColor: 'rgba(255, 51, 51, 0.3)' }}>
                <h2 className="card-title" style={{ color: '#ff6b6b' }}>
                  ⚠️ Danger Zone
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: 14 }}>
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="btn btn-secondary" style={{ borderColor: 'rgba(255, 51, 51, 0.3)', color: '#ff6b6b' }}>
                  Delete Account
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
