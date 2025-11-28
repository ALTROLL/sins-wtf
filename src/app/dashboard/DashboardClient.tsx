"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

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
  user: User;
}

export default function DashboardClient({ profile: initialProfile, user }: DashboardClientProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "links" | "appearance">("profile");
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

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#ff3333]">
              <path
                d="M12 2C8.5 2 6 5 6 8C6 11 8 13 8 16C8 18 6 20 6 20H18C18 20 16 18 16 16C16 13 18 11 18 8C18 5 15.5 2 12 2Z"
                fill="currentColor"
              />
              <path
                d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20H10Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-xl font-bold text-[#ff3333]">sins.wtf</span>
          </Link>

          <div className="flex items-center gap-4">
            <a
              href={`/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Profile
            </a>
            <button
              onClick={handleSignOut}
              className="text-gray-400 hover:text-white text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 sticky top-24">
              {/* Profile Preview */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#ff3333] to-[#ff6600] flex items-center justify-center text-2xl font-bold text-white mb-4">
                  {displayName?.[0]?.toUpperCase() || username[0]?.toUpperCase()}
                </div>
                <h2 className="text-white font-semibold">{displayName || username}</h2>
                <p className="text-gray-500 text-sm">sins.wtf/{username}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#1a1a1a] rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">{profile.views}</div>
                  <div className="text-gray-500 text-xs">Views</div>
                </div>
                <div className="bg-[#1a1a1a] rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">{profile.links.length}</div>
                  <div className="text-gray-500 text-xs">Links</div>
                </div>
              </div>

              {/* Tabs */}
              <div className="space-y-2">
                {(["profile", "links", "appearance"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                      activeTab === tab
                        ? "bg-[#ff3333]/10 text-[#ff3333]"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Profile Settings</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Username
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 bg-[#1a1a1a] border border-r-0 border-white/10 rounded-l-xl text-gray-500 text-sm">
                        sins.wtf/
                      </span>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                        className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-r-xl text-white focus:outline-none focus:border-[#ff3333]"
                        placeholder="yourname"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#ff3333]"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#ff3333] resize-none"
                      placeholder="Tell people about yourself..."
                    />
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="w-full py-3 bg-gradient-to-r from-[#ff3333] to-[#ff6600] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {/* Links Tab */}
            {activeTab === "links" && (
              <div className="space-y-6">
                {/* Add Link */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Add New Link</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={newLinkTitle}
                      onChange={(e) => setNewLinkTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#ff3333]"
                      placeholder="Link title"
                    />
                    <input
                      type="url"
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#ff3333]"
                      placeholder="https://example.com"
                    />
                    <button
                      onClick={handleAddLink}
                      disabled={!newLinkTitle || !newLinkUrl}
                      className="w-full py-3 bg-gradient-to-r from-[#ff3333] to-[#ff6600] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      Add Link
                    </button>
                  </div>
                </div>

                {/* Links List */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Your Links</h2>
                  {profile.links.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No links yet. Add your first link above!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {profile.links
                        .sort((a, b) => a.sort_order - b.sort_order)
                        .map((link) => (
                          <div
                            key={link.id}
                            className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl"
                          >
                            <div className="flex-1 min-w-0">
                              <h3 className="text-white font-medium truncate">
                                {link.title}
                              </h3>
                              <p className="text-gray-500 text-sm truncate">
                                {link.url}
                              </p>
                            </div>
                            <button
                              onClick={() => handleDeleteLink(link.id)}
                              className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Appearance</h2>
                <p className="text-gray-500">
                  Theme customization coming soon! You&apos;ll be able to change colors, fonts, effects, and more.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
