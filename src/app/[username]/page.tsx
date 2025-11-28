import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProfilePage from "./ProfilePage";

interface PageProps {
  params: Promise<{ username: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select(`
      *,
      profile_customization (*)
    `)
    .eq("username", username.toLowerCase())
    .single();

  if (!profile) {
    return {
      title: "Profile Not Found - sins.wtf",
    };
  }

  const customization = profile.profile_customization;
  const metaTitle = customization?.meta_title || `${profile.display_name || profile.username} - sins.wtf`;
  const metaDescription = customization?.meta_description || profile.bio || `Check out ${profile.username}'s profile on sins.wtf`;
  const metaImage = customization?.meta_image_url || profile.avatar_url;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: metaImage ? [{ url: metaImage }] : [],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: metaImage ? [metaImage] : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { username } = await params;
  const supabase = await createClient();

  // Fetch profile with all related data
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(`
      *,
      profile_customization (*),
      links (*),
      social_links (*),
      widgets (*)
    `)
    .eq("username", username.toLowerCase())
    .single();

  if (error || !profile) {
    notFound();
  }

  // Record profile view (fire and forget)
  supabase
    .from("profile_views")
    .insert({ profile_id: profile.id })
    .then(() => {});

  // Transform data for the client component
  const profileData = {
    profile: {
      id: profile.id,
      username: profile.username,
      display_name: profile.display_name,
      bio: profile.bio,
      avatar_url: profile.avatar_url,
      banner_url: profile.banner_url,
      views: profile.views,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    },
    customization: profile.profile_customization,
    links: profile.links?.filter((l: { is_visible: boolean }) => l.is_visible).sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order) || [],
    socialLinks: profile.social_links?.filter((l: { is_visible: boolean }) => l.is_visible).sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order) || [],
    widgets: profile.widgets?.filter((w: { is_visible: boolean }) => w.is_visible).sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order) || [],
  };

  return <ProfilePage data={profileData} />;
}
