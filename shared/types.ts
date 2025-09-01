// Shared TypeScript types for SuiGym

export interface Profile {
  id: string;
  owner: string;
  username: string;
  streak: number;
  total_logs: number;
  last_log_day?: number;
  achievements_earned: string[];
  total_nfts: number;
  current_weight?: number; // in grams
  starting_weight?: number; // in grams
  weight_lost: number; // in grams
  longest_streak: number;
  profile_created_day: number;
}

export interface AchievementNFT {
  id: string;
  name: string;
  description: string;
  image_url: string;
  achievement_type: 'streak' | 'milestone' | 'weight_loss' | 'special';
  rarity: 1 | 2 | 3 | 4 | 5;
  earned_date: number;
  user_stats_snapshot: UserStatsSnapshot;
}

export interface UserStatsSnapshot {
  total_workouts: number;
  current_streak: number;
  weight_lost: number; // in grams
  days_since_start: number;
}

export interface WorkoutLoggedEvent {
  owner: string;
  day: number;
  streak: number;
  total_logs: number;
  weight_lost: number;
}

export interface AchievementEarnedEvent {
  owner: string;
  achievement_name: string;
  achievement_type: string;
  rarity: number;
  earned_date: number;
  total_nfts: number;
}

export type RarityLevel = 1 | 2 | 3 | 4 | 5;
export type AchievementType = 'streak' | 'milestone' | 'weight_loss' | 'special';
export type NetworkName = 'devnet' | 'testnet' | 'mainnet';

export interface RarityConfig {
  name: string;
  color: string;
  emoji: string;
  gradient: string;
}

// Smart contract function parameters
export interface CreateProfileParams {
  username: string;
  starting_weight_kg?: number;
}

export interface UpdateWeightParams {
  profile_id: string;
  new_weight_kg: number;
}

export interface LogWorkoutParams {
  profile_id: string;
}