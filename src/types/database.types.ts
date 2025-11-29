export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          banner_url: string | null
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      profile_customization: {
        Row: {
          id: string
          profile_id: string
          primary_color: string
          secondary_color: string
          background_color: string
          text_color: string
          name_color: string
          background_type: string
          background_image_url: string | null
          background_video_url: string | null
          background_blur: number
          background_opacity: number
          layout_style: string
          card_style: string
          card_radius: number
          avatar_style: string
          avatar_border: boolean
          avatar_glow: boolean
          name_font: string | null
          text_font: string | null
          cursor_effect: string
          custom_cursor_url: string | null
          page_effect: string
          font_family: string
          custom_font_url: string | null
          title_font_size: number
          bio_font_size: number
          typewriter_enabled: boolean
          typewriter_speed: number
          typewriter_phrases: string[] | null
          click_to_enter: boolean
          sparkle_name: boolean
          parallax_enabled: boolean
          discord_user_id: string | null
          discord_widget_enabled: boolean
          meta_title: string | null
          meta_description: string | null
          meta_image_url: string | null
          favicon_url: string | null
          background_music_url: string | null
          music_autoplay: boolean
          music_volume: number
          custom_css: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          primary_color?: string
          secondary_color?: string
          background_color?: string
          text_color?: string
          name_color?: string
          background_type?: string
          background_image_url?: string | null
          background_video_url?: string | null
          background_blur?: number
          background_opacity?: number
          layout_style?: string
          card_style?: string
          card_radius?: number
          avatar_style?: string
          avatar_border?: boolean
          avatar_glow?: boolean
          name_font?: string | null
          text_font?: string | null
          cursor_effect?: string
          custom_cursor_url?: string | null
          page_effect?: string
          font_family?: string
          custom_font_url?: string | null
          title_font_size?: number
          bio_font_size?: number
          typewriter_enabled?: boolean
          typewriter_speed?: number
          typewriter_phrases?: string[] | null
          click_to_enter?: boolean
          sparkle_name?: boolean
          parallax_enabled?: boolean
          discord_user_id?: string | null
          discord_widget_enabled?: boolean
          meta_title?: string | null
          meta_description?: string | null
          meta_image_url?: string | null
          favicon_url?: string | null
          background_music_url?: string | null
          music_autoplay?: boolean
          music_volume?: number
          custom_css?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          primary_color?: string
          secondary_color?: string
          background_color?: string
          text_color?: string
          name_color?: string
          background_type?: string
          background_image_url?: string | null
          background_video_url?: string | null
          background_blur?: number
          background_opacity?: number
          layout_style?: string
          card_style?: string
          card_radius?: number
          avatar_style?: string
          avatar_border?: boolean
          avatar_glow?: boolean
          name_font?: string | null
          text_font?: string | null
          cursor_effect?: string
          custom_cursor_url?: string | null
          page_effect?: string
          font_family?: string
          custom_font_url?: string | null
          title_font_size?: number
          bio_font_size?: number
          typewriter_enabled?: boolean
          typewriter_speed?: number
          typewriter_phrases?: string[] | null
          click_to_enter?: boolean
          sparkle_name?: boolean
          parallax_enabled?: boolean
          discord_user_id?: string | null
          discord_widget_enabled?: boolean
          meta_title?: string | null
          meta_description?: string | null
          meta_image_url?: string | null
          favicon_url?: string | null
          background_music_url?: string | null
          music_autoplay?: boolean
          music_volume?: number
          custom_css?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      links: {
        Row: {
          id: string
          profile_id: string
          title: string
          url: string
          icon: string | null
          custom_icon_url: string | null
          background_color: string | null
          text_color: string | null
          border_color: string | null
          style: string
          animation: string
          clicks: number
          is_visible: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          title: string
          url: string
          icon?: string | null
          custom_icon_url?: string | null
          background_color?: string | null
          text_color?: string | null
          border_color?: string | null
          style?: string
          animation?: string
          clicks?: number
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          title?: string
          url?: string
          icon?: string | null
          custom_icon_url?: string | null
          background_color?: string | null
          text_color?: string | null
          border_color?: string | null
          style?: string
          animation?: string
          clicks?: number
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      social_links: {
        Row: {
          id: string
          profile_id: string
          platform: string
          username: string | null
          url: string
          is_visible: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          platform: string
          username?: string | null
          url: string
          is_visible?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          platform?: string
          username?: string | null
          url?: string
          is_visible?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      widgets: {
        Row: {
          id: string
          profile_id: string
          widget_type: string
          config: Json
          width: string
          height: string
          is_visible: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          widget_type: string
          config?: Json
          width?: string
          height?: string
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          widget_type?: string
          config?: Json
          width?: string
          height?: string
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      profile_views: {
        Row: {
          id: string
          profile_id: string
          viewer_ip: string | null
          user_agent: string | null
          referrer: string | null
          country: string | null
          city: string | null
          viewed_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          viewer_ip?: string | null
          user_agent?: string | null
          referrer?: string | null
          country?: string | null
          city?: string | null
          viewed_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          viewer_ip?: string | null
          user_agent?: string | null
          referrer?: string | null
          country?: string | null
          city?: string | null
          viewed_at?: string
        }
      }
      link_clicks: {
        Row: {
          id: string
          link_id: string
          profile_id: string
          clicker_ip: string | null
          user_agent: string | null
          referrer: string | null
          country: string | null
          clicked_at: string
        }
        Insert: {
          id?: string
          link_id: string
          profile_id: string
          clicker_ip?: string | null
          user_agent?: string | null
          referrer?: string | null
          country?: string | null
          clicked_at?: string
        }
        Update: {
          id?: string
          link_id?: string
          profile_id?: string
          clicker_ip?: string | null
          user_agent?: string | null
          referrer?: string | null
          country?: string | null
          clicked_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_username_available: {
        Args: {
          check_username: string
        }
        Returns: boolean
      }
      get_public_profile: {
        Args: {
          p_username: string
        }
        Returns: {
          profile: Json
          customization: Json
          links: Json
          social_links: Json
          widgets: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
