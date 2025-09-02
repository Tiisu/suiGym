import { SuiClient } from '@mysten/sui.js/client'
import { Transaction } from '@mysten/sui/transactions'
import { NETWORK_CONFIG, CONTRACT_CONFIG, APP_CONFIG } from '../../../shared/config'

// Initialize Sui client based on current network
const currentNetwork = APP_CONFIG.CURRENT_NETWORK
export const suiClient = new SuiClient({
  url: NETWORK_CONFIG[currentNetwork].rpcUrl
})

// Contract configuration
export const PACKAGE_ID = CONTRACT_CONFIG.PACKAGE_ID[currentNetwork]
export const MODULE_NAME = CONTRACT_CONFIG.MODULE_NAME
export const CLOCK_ID = CONTRACT_CONFIG.CLOCK_OBJECT_ID

// Helper function to create transaction blocks
export const createTransactionBlock = () => new Transaction()

// Exercise types for the workout logging
export const EXERCISE_TYPES = [
  'push_ups',
  'squats', 
  'pull_ups',
  'lunges',
  'planks',
  'burpees',
  'jumping_jacks',
  'mountain_climbers',
  'sit_ups',
  'deadlifts',
  'bench_press',
  'bicep_curls',
  'running',
  'cycling',
  'swimming',
  'walking',
  'yoga',
  'stretching'
] as const

export type ExerciseType = typeof EXERCISE_TYPES[number]

// Exercise categories for UI grouping
export const EXERCISE_CATEGORIES = {
  'Strength': ['push_ups', 'squats', 'pull_ups', 'lunges', 'deadlifts', 'bench_press', 'bicep_curls'],
  'Cardio': ['running', 'cycling', 'swimming', 'walking', 'jumping_jacks', 'burpees'],
  'Core': ['planks', 'sit_ups', 'mountain_climbers'],
  'Flexibility': ['yoga', 'stretching']
} as const

// Helper to format exercise names for display
export const formatExerciseName = (exerciseType: string): string => {
  return exerciseType
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Helper to get exercise category
export const getExerciseCategory = (exerciseType: string): string => {
  for (const [category, exercises] of Object.entries(EXERCISE_CATEGORIES)) {
    if ((exercises as readonly string[]).includes(exerciseType)) {
      return category
    }
  }
  return 'Other'
}