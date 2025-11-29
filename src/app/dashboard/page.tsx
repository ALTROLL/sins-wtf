import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      *,
      profile_customization (*),
      links (*),
      social_links (*)
    )
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/login");
  }

  return <DashboardClient profile={profile} user={user} />;
}
