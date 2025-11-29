import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && sessionData.user) {
      const user = sessionData.user;
      const discordMeta = user.user_metadata;
      
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();
      
      if (!existingProfile) {
        // Get next incremental user_id
        const { data: maxIdResult } = await supabase
          .from("profiles")
          .select("user_id")
          .order("user_id", { ascending: false })
          .limit(1)
          .single();
        
        const nextUserId = (maxIdResult?.user_id || 0) + 1;
        
        // Create profile with Discord data
        await supabase.from("profiles").insert({
          id: user.id,
          user_id: nextUserId,
          username: discordMeta?.custom_claims?.global_name || discordMeta?.full_name || discordMeta?.name || `user_${nextUserId}`,
          display_name: discordMeta?.custom_claims?.global_name || discordMeta?.full_name || null,
          avatar_url: discordMeta?.avatar_url || null,
          email: user.email || discordMeta?.email || null,
          discord_id: discordMeta?.provider_id || discordMeta?.sub || null,
          discord_username: discordMeta?.custom_claims?.global_name || discordMeta?.name || null,
        });
        
        // Create default customization
        await supabase.from("profile_customization").insert({
          profile_id: user.id,
        });
      }
      
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
