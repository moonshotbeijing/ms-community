import { UserProfile } from "../types";
import { supabase } from ".";

export const createUserProfile = async (userProfile: UserProfile) => {
  await supabase.from("profiles").insert([userProfile]);
};

export const fetchUserProfileById = async (user_id: string): Promise<UserProfile| null> => {
  const { data } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user_id)
    .limit(1)
    .single();

  return data;
};


export const fetchAllUserProfiles = async (): Promise<UserProfile[]> => {
  const { data } = await supabase
    .from("profiles")
    .select()

  if(data === null) return []
  return data;
};
