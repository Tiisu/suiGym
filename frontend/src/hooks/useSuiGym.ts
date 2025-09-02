import { useState, useCallback } from 'react'
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { suiClient, PACKAGE_ID, MODULE_NAME, CLOCK_ID } from '../lib/suiClient'
import { Profile } from '../../../shared/types'

export interface Exercise {
  exerciseType: string
  repsOrDuration: number
  sets: number
  weightKg?: number
  distanceM?: number
}

export interface WorkoutData {
  exercises: Exercise[]
  durationMinutes: number
  notes: string
}

export const useSuiGym = () => {
  const currentAccount = useCurrentAccount()
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)

  // Create a new profile
  const createProfile = useCallback(async (username: string, startingWeightKg?: number) => {
    if (!currentAccount) throw new Error('No wallet connected')
    
    setIsLoading(true)
    try {
      const txb = new TransactionBlock()
      
      // Convert to Option<u64> format expected by Move
      const startingWeightOption = startingWeightKg ? [Math.floor(startingWeightKg)] : []
      
      txb.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::create_profile`,
        arguments: [
          txb.pure.string(username),
          txb.pure.option('u64', startingWeightKg ? Math.floor(startingWeightKg) : null),
          txb.object(CLOCK_ID)
        ]
      })

      await new Promise((resolve, reject) => {
        signAndExecute(
          { transaction: txb },
          {
            onSuccess: (result) => {
              console.log('Profile created successfully:', result)
              resolve(result)
            },
            onError: (error) => {
              console.error('Failed to create profile:', error)
              reject(error)
            }
          }
        )
      })
    } catch (error) {
      console.error('Error creating profile:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [currentAccount, signAndExecute])

  // Log a detailed workout
  const logWorkout = useCallback(async (profileId: string, workoutData: WorkoutData) => {
    if (!currentAccount) throw new Error('No wallet connected')
    
    setIsLoading(true)
    try {
      const txb = new TransactionBlock()
      
      // Prepare exercise data arrays with proper Option types
      const exerciseTypes = workoutData.exercises.map(e => e.exerciseType)
      const repsOrDurations = workoutData.exercises.map(e => e.repsOrDuration)
      const sets = workoutData.exercises.map(e => e.sets)
      const weightsKg = workoutData.exercises.map(e => e.weightKg || null)
      const distancesM = workoutData.exercises.map(e => e.distanceM || null)

      txb.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::log_workout_detailed`,
        arguments: [
          txb.object(profileId),
          txb.pure.vector('string', exerciseTypes),
          txb.pure.vector('u64', repsOrDurations),
          txb.pure.vector('u64', sets),
          txb.pure.vector('option<u64>', weightsKg),
          txb.pure.vector('option<u64>', distancesM),
          txb.pure.u64(workoutData.durationMinutes),
          txb.pure.string(workoutData.notes),
          txb.object(CLOCK_ID)
        ]
      })

      await new Promise((resolve, reject) => {
        signAndExecute(
          { transaction: txb },
          {
            onSuccess: (result) => {
              console.log('Workout logged successfully:', result)
              resolve(result)
            },
            onError: (error) => {
              console.error('Failed to log workout:', error)
              reject(error)
            }
          }
        )
      })
    } catch (error) {
      console.error('Error logging workout:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [currentAccount, signAndExecute])

  // Update weight
  const updateWeight = useCallback(async (profileId: string, newWeightKg: number) => {
    if (!currentAccount) throw new Error('No wallet connected')
    
    setIsLoading(true)
    try {
      const txb = new TransactionBlock()
      
      txb.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::update_weight`,
        arguments: [
          txb.object(profileId),
          txb.pure.u64(Math.floor(newWeightKg))
        ]
      })

      await new Promise((resolve, reject) => {
        signAndExecute(
          { transaction: txb },
          {
            onSuccess: (result) => {
              console.log('Weight updated successfully:', result)
              resolve(result)
            },
            onError: (error) => {
              console.error('Failed to update weight:', error)
              reject(error)
            }
          }
        )
      })
    } catch (error) {
      console.error('Error updating weight:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [currentAccount, signAndExecute])

  // Get profile data
  const getProfile = useCallback(async (profileId: string): Promise<Profile | null> => {
    try {
      const result = await suiClient.getObject({
        id: profileId,
        options: {
          showContent: true,
          showType: true
        }
      })

      if (result.data?.content && 'fields' in result.data.content) {
        const fields = result.data.content.fields as any
        
        const profile: Profile = {
          id: profileId,
          owner: fields.owner,
          username: fields.username,
          streak: parseInt(fields.streak),
          total_logs: parseInt(fields.total_logs),
          last_log_day: fields.last_log_day ? parseInt(fields.last_log_day) : undefined,
          achievements_earned: fields.achievements_earned || [],
          total_nfts: parseInt(fields.total_nfts),
          current_weight: fields.current_weight ? parseInt(fields.current_weight) : undefined,
          starting_weight: fields.starting_weight ? parseInt(fields.starting_weight) : undefined,
          weight_lost: parseInt(fields.weight_lost),
          longest_streak: parseInt(fields.longest_streak),
          profile_created_day: parseInt(fields.profile_created_day)
        }
        
        setProfile(profile)
        return profile
      }
      
      return null
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }, [])

  // Get user's owned objects (to find their profile)
  const getUserProfile = useCallback(async (): Promise<Profile | null> => {
    if (!currentAccount) return null
    
    try {
      const objects = await suiClient.getOwnedObjects({
        owner: currentAccount.address,
        filter: {
          StructType: `${PACKAGE_ID}::${MODULE_NAME}::Profile`
        },
        options: {
          showContent: true,
          showType: true
        }
      })

      if (objects.data.length > 0) {
        const profileObject = objects.data[0]
        if (profileObject.data?.content && 'fields' in profileObject.data.content) {
          const fields = profileObject.data.content.fields as any
          
          const profile: Profile = {
            id: profileObject.data.objectId,
            owner: fields.owner,
            username: fields.username,
            streak: parseInt(fields.streak),
            total_logs: parseInt(fields.total_logs),
            last_log_day: fields.last_log_day ? parseInt(fields.last_log_day) : undefined,
            achievements_earned: fields.achievements_earned || [],
            total_nfts: parseInt(fields.total_nfts),
            current_weight: fields.current_weight ? parseInt(fields.current_weight) : undefined,
            starting_weight: fields.starting_weight ? parseInt(fields.starting_weight) : undefined,
            weight_lost: parseInt(fields.weight_lost),
            longest_streak: parseInt(fields.longest_streak),
            profile_created_day: parseInt(fields.profile_created_day)
          }
          
          setProfile(profile)
          return profile
        }
      }
      
      return null
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }, [currentAccount])

  return {
    profile,
    isLoading,
    createProfile,
    logWorkout,
    updateWeight,
    getProfile,
    getUserProfile,
    isConnected: !!currentAccount
  }
}