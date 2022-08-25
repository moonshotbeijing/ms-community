import { UserProfile } from "../types";

export function validateUserProfile(profile: UserProfile | null): boolean {
  if(!profile) {
    return false
  }

  return true
}