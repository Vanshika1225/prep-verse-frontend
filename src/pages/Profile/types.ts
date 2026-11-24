import type { Theme } from "@mui/material";
import type { ReactNode } from "react";

export interface UserProfile {
  _id: string;
  userId: string;
  name: string;
  phone: string | null;
  avatar: string | null;
  bio: string;
  country: string | null;
  city: string | null;
  email?: string;
  provider?: string;
  leetcodeHandle: string | null;
  codeforcesHandle: string | null;
  codechefHandle: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  data: UserProfile;
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  bio?: string;
  country?: string;
  city?: string;
  leetcodeHandle?: string;
  codeforcesHandle?: string;
  codechefHandle?: string;
  avatar?: string | null;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export interface LogoutRequest {
  userId: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export type ProfileFieldKey = Exclude<keyof UpdateProfileRequest, "avatar">;

export type ProfileForm = Record<ProfileFieldKey, string>;

export type ProfileFieldGroup = "personal" | "platforms";

export interface ProfileFieldConfig {
  key: ProfileFieldKey;
  label: string;
  placeholder: string;
  group: ProfileFieldGroup;
  icon: ReactNode;
  multiline?: boolean;
  rows?: number;
  half?: boolean;
  maxLength?: number;
}

export interface FormGroup {
  id: ProfileFieldGroup;
  title: string;
}

export type HandleKey = Extract<
  ProfileFieldKey,
  "leetcodeHandle" | "codeforcesHandle" | "codechefHandle"
>;

export interface PlatformConfig {
  key: HandleKey;
  label: string;
  baseUrl: string;
  getColor: (theme: Theme) => string;
}

export type CompletionKey = ProfileFieldKey | "avatar";

export interface CompletionItem {
  key: CompletionKey;
  label: string;
}

export interface StatItem {
  icon: ReactNode;
  value: string | number;
  label: string;
  tone: "primary" | "warning";
}

export interface DetailItem {
  key: ProfileFieldKey;
  label: string;
  icon: ReactNode;
  value: string | null;
}