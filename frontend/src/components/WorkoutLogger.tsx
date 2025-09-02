import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Dumbbell, Clock, FileText } from "lucide-react"
import { EXERCISE_CATEGORIES, formatExerciseName, getExerciseCategory } from '../lib/suiClient'
import { Exercise, WorkoutData } from '../hooks/useSuiGym'

interface WorkoutLoggerProps {
  onLogWorkout: (workoutData: WorkoutData) => Promise<void>
  isLoading: boolean
}

export function WorkoutLogger({ onLogWorkout, isLoading }: WorkoutLoggerProps) {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      exerciseType: 'push_ups',
      repsOrDuration: 10,
      sets: 3,
      weightKg: undefined,
      distanceM: undefined
    }
  ])
  const [durationMinutes, setDurationMinutes] = useState(30)
  const [notes, setNotes] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const addExercise = () => {
    setExercises([...exercises, {
      exerciseType: 'push_ups',
      repsOrDuration: 10,
      sets: 1,
      weightKg: undefined,
      distanceM: undefined
    }])
  }

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const updateExercise = (index: number, field: keyof Exercise, value: any) => {
    const updated = [...exercises]
    updated[index] = { ...updated[index], [field]: value }
    setExercises(updated)
  }

  const handleSubmit = async () => {
    if (exercises.length === 0) return

    const workoutData: WorkoutData = {
      exercises,
      durationMinutes,
      notes
    }

    try {
      await onLogWorkout(workoutData)
      // Reset form after successful submission
      setExercises([{
        exerciseType: 'push_ups',
        repsOrDuration: 10,
        sets: 3,
        weightKg: undefined,
        distanceM: undefined
      }])
      setDurationMinutes(30)
      setNotes('')
    } catch (error) {
      console.error('Failed to log workout:', error)
    }
  }

  const isCardioExercise = (exerciseType: string) => {
    return EXERCISE_CATEGORIES.Cardio.includes(exerciseType as any)
  }

  const requiresWeight = (exerciseType: string) => {
    return ['deadlifts', 'bench_press', 'bicep_curls'].includes(exerciseType)
  }

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-6 w-6 text-sui-orange-500" />
            <h3 className="text-xl font-semibold text-gray-900">Log Your Workout</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Simple' : 'Advanced'}
          </Button>
        </div>

        {/* Exercises */}
        <div className="space-y-4 mb-6">
          <h4 className="font-medium text-gray-900">Exercises</h4>
          {exercises.map((exercise, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Exercise {index + 1}
                </span>
                {exercises.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExercise(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Exercise Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exercise Type
                  </label>
                  <select
                    value={exercise.exerciseType}
                    onChange={(e) => updateExercise(index, 'exerciseType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sui-green-500"
                  >
                    {Object.entries(EXERCISE_CATEGORIES).map(([category, exerciseTypes]) => (
                      <optgroup key={category} label={category}>
                        {exerciseTypes.map((type) => (
                          <option key={type} value={type}>
                            {formatExerciseName(type)}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Reps or Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isCardioExercise(exercise.exerciseType) ? 'Duration (min)' : 'Reps'}
                  </label>
                  <Input
                    type="number"
                    value={exercise.repsOrDuration}
                    onChange={(e) => updateExercise(index, 'repsOrDuration', parseInt(e.target.value) || 0)}
                    min="1"
                    className="w-full"
                  />
                </div>

                {/* Sets */}
                {!isCardioExercise(exercise.exerciseType) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sets
                    </label>
                    <Input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 1)}
                      min="1"
                      className="w-full"
                    />
                  </div>
                )}

                {/* Weight (for strength exercises) */}
                {showAdvanced && !isCardioExercise(exercise.exerciseType) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg) {requiresWeight(exercise.exerciseType) && <span className="text-red-500">*</span>}
                    </label>
                    <Input
                      type="number"
                      value={exercise.weightKg || ''}
                      onChange={(e) => updateExercise(index, 'weightKg', e.target.value ? parseInt(e.target.value) : undefined)}
                      min="0"
                      step="0.5"
                      className="w-full"
                      placeholder="Optional"
                    />
                  </div>
                )}

                {/* Distance (for cardio exercises) */}
                {showAdvanced && isCardioExercise(exercise.exerciseType) && ['running', 'cycling', 'swimming', 'walking'].includes(exercise.exerciseType) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Distance (meters)
                    </label>
                    <Input
                      type="number"
                      value={exercise.distanceM || ''}
                      onChange={(e) => updateExercise(index, 'distanceM', e.target.value ? parseInt(e.target.value) : undefined)}
                      min="0"
                      className="w-full"
                      placeholder="Optional"
                    />
                  </div>
                )}
              </div>

              {/* Exercise Category Badge */}
              <div className="mt-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  getExerciseCategory(exercise.exerciseType) === 'Strength' ? 'bg-sui-orange-100 text-sui-orange-800' :
                  getExerciseCategory(exercise.exerciseType) === 'Cardio' ? 'bg-sui-blue-100 text-sui-blue-800' :
                  getExerciseCategory(exercise.exerciseType) === 'Core' ? 'bg-sui-purple-100 text-sui-purple-800' :
                  'bg-sui-green-100 text-sui-green-800'
                }`}>
                  {getExerciseCategory(exercise.exerciseType)}
                </span>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={addExercise}
            className="w-full border-dashed border-2 border-gray-300 hover:border-sui-green-400 hover:bg-sui-green-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Exercise
          </Button>
        </div>

        {/* Workout Duration */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="h-4 w-4 inline mr-1" />
            Total Workout Duration (minutes)
          </label>
          <Input
            type="number"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 0)}
            min="1"
            max="300"
            className="w-full max-w-xs"
          />
        </div>

        {/* Notes */}
        {showAdvanced && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4 inline mr-1" />
              Workout Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did the workout feel? Any observations or goals for next time..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sui-green-500 resize-none"
              rows={3}
            />
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={isLoading || exercises.length === 0}
          className="w-full bg-sui-orange-500 hover:bg-sui-orange-600 text-white font-semibold py-3"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Logging Workout...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-5 w-5" />
              <span>Log Workout & Earn NFTs</span>
            </div>
          )}
        </Button>

        {/* Quick Summary */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Workout Summary:</h5>
          <div className="text-sm text-gray-600">
            <p>{exercises.length} exercise{exercises.length !== 1 ? 's' : ''} • {durationMinutes} minutes</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {exercises.map((exercise, index) => (
                <span key={index} className="inline-block bg-white px-2 py-1 rounded text-xs">
                  {formatExerciseName(exercise.exerciseType)}
                  {!isCardioExercise(exercise.exerciseType) && ` (${exercise.repsOrDuration}×${exercise.sets})`}
                  {isCardioExercise(exercise.exerciseType) && ` (${exercise.repsOrDuration}min)`}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}