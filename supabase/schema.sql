-- sins.wtf Database Schema
-- A guns.lol-style profile/link-in-bio platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- Main user profile information
-- ============================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(30) UNIQUE NOT NULL,
    display_name VARCHAR(100),
    bio TEXT,
    avatar_url TEXT,
    banner_url TEXT,
    
    -- Profile views counter
    views INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast username lookups (for sins.wtf/username routes)
CREATE INDEX idx_profiles_username ON profiles(username);

-- ============================================
-- PROFILE CUSTOMIZATION TABLE
-- All visual customization options
-- ============================================
CREATE TABLE profile_customization (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- Theme & Colors
    primary_color VARCHAR(7) DEFAULT '#ff3333',
    secondary_color VARCHAR(7) DEFAULT '#ff6600',
    background_color VARCHAR(7) DEFAULT '#0a0a0a',
    text_color VARCHAR(7) DEFAULT '#ffffff',
    
    -- Background options
    background_type VARCHAR(20) DEFAULT 'solid', -- solid, gradient, image, video
    background_image_url TEXT,
    background_video_url TEXT,
    background_blur INTEGER DEFAULT 0,
    background_opacity INTEGER DEFAULT 100,
    
    -- Layout
    layout_type VARCHAR(20) DEFAULT 'default', -- default, compact, minimal, grid
    avatar_style VARCHAR(20) DEFAULT 'circle', -- circle, square, rounded, hexagon
    avatar_border BOOLEAN DEFAULT false,
    avatar_glow BOOLEAN DEFAULT false,
    
    -- Effects
    cursor_effect VARCHAR(30) DEFAULT 'none', -- none, trail, sparkle, fire, custom
    custom_cursor_url TEXT,
    page_effect VARCHAR(30) DEFAULT 'none', -- none, particles, rain, snow, matrix
    
    -- Typography
    font_family VARCHAR(100) DEFAULT 'Inter',
    custom_font_url TEXT,
    title_font_size INTEGER DEFAULT 24,
    bio_font_size INTEGER DEFAULT 14,
    
    -- Typewriter effect for bio
    typewriter_enabled BOOLEAN DEFAULT false,
    typewriter_speed INTEGER DEFAULT 100,
    typewriter_phrases TEXT[], -- Array of phrases to cycle through
    
    -- SEO & Metadata
    meta_title VARCHAR(60),
    meta_description VARCHAR(160),
    meta_image_url TEXT,
    favicon_url TEXT,
    
    -- Music/Audio
    background_music_url TEXT,
    music_autoplay BOOLEAN DEFAULT false,
    music_volume INTEGER DEFAULT 50,
    
    -- Custom CSS (for power users)
    custom_css TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(profile_id)
);

-- ============================================
-- LINKS TABLE
-- User's social/custom links
-- ============================================
CREATE TABLE links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    title VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    icon VARCHAR(50), -- Icon name from icon library
    custom_icon_url TEXT,
    
    -- Styling
    background_color VARCHAR(7),
    text_color VARCHAR(7),
    border_color VARCHAR(7),
    style VARCHAR(20) DEFAULT 'default', -- default, outline, filled, gradient
    
    -- Animation
    animation VARCHAR(20) DEFAULT 'none', -- none, pulse, shake, glow
    
    -- Analytics
    clicks INTEGER DEFAULT 0,
    
    -- Visibility & ordering
    is_visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_links_profile ON links(profile_id);
CREATE INDEX idx_links_sort ON links(profile_id, sort_order);

-- ============================================
-- SOCIAL LINKS TABLE
-- Pre-defined social platform links
-- ============================================
CREATE TABLE social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    platform VARCHAR(30) NOT NULL, -- discord, twitter, instagram, tiktok, youtube, github, spotify, twitch, etc
    username VARCHAR(100),
    url TEXT NOT NULL,
    
    is_visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(profile_id, platform)
);

CREATE INDEX idx_social_links_profile ON social_links(profile_id);

-- ============================================
-- WIDGETS TABLE
-- Embeddable widgets (YouTube, Spotify, Discord, etc)
-- ============================================
CREATE TABLE widgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    widget_type VARCHAR(30) NOT NULL, -- youtube, spotify, discord, soundcloud, twitter, custom
    
    -- Widget-specific data (JSON for flexibility)
    config JSONB NOT NULL DEFAULT '{}',
    -- Examples:
    -- YouTube: { "videoId": "xxx", "autoplay": false }
    -- Spotify: { "trackId": "xxx", "type": "track" }
    -- Discord: { "serverId": "xxx", "inviteCode": "xxx" }
    
    -- Display options
    width VARCHAR(10) DEFAULT '100%',
    height VARCHAR(10) DEFAULT 'auto',
    
    is_visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_widgets_profile ON widgets(profile_id);

-- ============================================
-- PROFILE VIEWS TABLE
-- Track profile view analytics
-- ============================================
CREATE TABLE profile_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    viewer_ip TEXT, -- Hashed for privacy
    user_agent TEXT,
    referrer TEXT,
    country VARCHAR(2),
    city VARCHAR(100),
    
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_profile_views_profile ON profile_views(profile_id);
CREATE INDEX idx_profile_views_date ON profile_views(viewed_at);

-- ============================================
-- LINK CLICKS TABLE
-- Track link click analytics
-- ============================================
CREATE TABLE link_clicks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    link_id UUID NOT NULL REFERENCES links(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    clicker_ip TEXT, -- Hashed for privacy
    user_agent TEXT,
    referrer TEXT,
    country VARCHAR(2),
    
    clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_link_clicks_link ON link_clicks(link_id);
CREATE INDEX idx_link_clicks_profile ON link_clicks(profile_id);
CREATE INDEX idx_link_clicks_date ON link_clicks(clicked_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_customization ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE widgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_clicks ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Profile customization policies
CREATE POLICY "Public customization viewable by everyone" ON profile_customization
    FOR SELECT USING (true);

CREATE POLICY "Users can update own customization" ON profile_customization
    FOR ALL USING (auth.uid() = profile_id);

-- Links policies
CREATE POLICY "Visible links are viewable by everyone" ON links
    FOR SELECT USING (is_visible = true OR auth.uid() = profile_id);

CREATE POLICY "Users can manage own links" ON links
    FOR ALL USING (auth.uid() = profile_id);

-- Social links policies
CREATE POLICY "Visible social links viewable by everyone" ON social_links
    FOR SELECT USING (is_visible = true OR auth.uid() = profile_id);

CREATE POLICY "Users can manage own social links" ON social_links
    FOR ALL USING (auth.uid() = profile_id);

-- Widgets policies
CREATE POLICY "Visible widgets viewable by everyone" ON widgets
    FOR SELECT USING (is_visible = true OR auth.uid() = profile_id);

CREATE POLICY "Users can manage own widgets" ON widgets
    FOR ALL USING (auth.uid() = profile_id);

-- Analytics policies (only profile owner can see their analytics)
CREATE POLICY "Users can view own profile views" ON profile_views
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Anyone can insert profile views" ON profile_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own link clicks" ON link_clicks
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Anyone can insert link clicks" ON link_clicks
    FOR INSERT WITH CHECK (true);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profile_customization_updated_at
    BEFORE UPDATE ON profile_customization
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_links_updated_at
    BEFORE UPDATE ON links
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_widgets_updated_at
    BEFORE UPDATE ON widgets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment profile views
CREATE OR REPLACE FUNCTION increment_profile_views()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE profiles SET views = views + 1 WHERE id = NEW.profile_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER on_profile_view
    AFTER INSERT ON profile_views
    FOR EACH ROW EXECUTE FUNCTION increment_profile_views();

-- Function to increment link clicks
CREATE OR REPLACE FUNCTION increment_link_clicks()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE links SET clicks = clicks + 1 WHERE id = NEW.link_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER on_link_click
    AFTER INSERT ON link_clicks
    FOR EACH ROW EXECUTE FUNCTION increment_link_clicks();

-- Function to create profile and customization on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create profile (username will need to be set later)
    INSERT INTO profiles (id, username)
    VALUES (NEW.id, CONCAT('user_', SUBSTRING(NEW.id::text, 1, 8)));
    
    -- Create default customization
    INSERT INTO profile_customization (profile_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to check if username is available
CREATE OR REPLACE FUNCTION is_username_available(check_username VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN NOT EXISTS (
        SELECT 1 FROM profiles WHERE LOWER(username) = LOWER(check_username)
    );
END;
$$ language 'plpgsql';

-- Function to get full profile data for a username (for public profile pages)
CREATE OR REPLACE FUNCTION get_public_profile(p_username VARCHAR)
RETURNS TABLE (
    profile JSON,
    customization JSON,
    links JSON,
    social_links JSON,
    widgets JSON
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        row_to_json(p.*) as profile,
        row_to_json(pc.*) as customization,
        COALESCE(json_agg(DISTINCT l.*) FILTER (WHERE l.id IS NOT NULL AND l.is_visible), '[]'::json) as links,
        COALESCE(json_agg(DISTINCT sl.*) FILTER (WHERE sl.id IS NOT NULL AND sl.is_visible), '[]'::json) as social_links,
        COALESCE(json_agg(DISTINCT w.*) FILTER (WHERE w.id IS NOT NULL AND w.is_visible), '[]'::json) as widgets
    FROM profiles p
    LEFT JOIN profile_customization pc ON p.id = pc.profile_id
    LEFT JOIN links l ON p.id = l.profile_id
    LEFT JOIN social_links sl ON p.id = sl.profile_id
    LEFT JOIN widgets w ON p.id = w.profile_id
    WHERE LOWER(p.username) = LOWER(p_username)
    GROUP BY p.id, pc.id;
END;
$$ language 'plpgsql';
