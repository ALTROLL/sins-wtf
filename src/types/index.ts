import { Database } from "./database.types";

// Profile types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

// Customization types
export type ProfileCustomization = Database["public"]["Tables"]["profile_customization"]["Row"];
export type ProfileCustomizationInsert = Database["public"]["Tables"]["profile_customization"]["Insert"];
export type ProfileCustomizationUpdate = Database["public"]["Tables"]["profile_customization"]["Update"];

// Link types
export type Link = Database["public"]["Tables"]["links"]["Row"];
export type LinkInsert = Database["public"]["Tables"]["links"]["Insert"];
export type LinkUpdate = Database["public"]["Tables"]["links"]["Update"];

// Social link types
export type SocialLink = Database["public"]["Tables"]["social_links"]["Row"];
export type SocialLinkInsert = Database["public"]["Tables"]["social_links"]["Insert"];
export type SocialLinkUpdate = Database["public"]["Tables"]["social_links"]["Update"];

// Widget types
export type Widget = Database["public"]["Tables"]["widgets"]["Row"];
export type WidgetInsert = Database["public"]["Tables"]["widgets"]["Insert"];
export type WidgetUpdate = Database["public"]["Tables"]["widgets"]["Update"];

// Combined public profile type
export interface PublicProfile {
  profile: Profile;
  customization: ProfileCustomization | null;
  links: Link[];
  socialLinks: SocialLink[];
  widgets: Widget[];
}

// Social platform types
export type SocialPlatform = 
  | "discord"
  | "twitter"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "github"
  | "spotify"
  | "twitch"
  | "linkedin"
  | "telegram"
  | "snapchat"
  | "steam"
  | "reddit"
  | "pinterest"
  | "soundcloud"
  | "other";

// Widget types enum
export type WidgetType = 
  | "youtube"
  | "spotify"
  | "discord"
  | "soundcloud"
  | "twitter"
  | "custom";

// Layout types
export type LayoutType = "default" | "compact" | "minimal" | "grid";

// Avatar styles
export type AvatarStyle = "circle" | "square" | "rounded" | "hexagon";

// Background types
export type BackgroundType = "solid" | "gradient" | "image" | "video";

// Cursor effects
export type CursorEffect = "none" | "trail" | "sparkle" | "fire" | "custom";

// Page effects
export type PageEffect = "none" | "particles" | "rain" | "snow" | "matrix";

// Link styles
export type LinkStyle = "default" | "outline" | "filled" | "gradient";

// Link animations
export type LinkAnimation = "none" | "pulse" | "shake" | "glow";
