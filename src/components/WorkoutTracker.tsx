import { useState, useEffect } from 'react'
import type { Workout } from '../App'

interface WorkoutTrackerProps {
  workouts: Workout[]
  onDeleteWorkout: (id: string) => void
}

const WorkoutTracker = ({ workouts, onDeleteWorkout }: WorkoutTrackerProps) => {
  const [sessionTimer, setSessionTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentExercise, setCurrentExercise] = useState({
    name: 'Smith Machine Squat (Light, Knee-Friendly)',
    sets: 3,
    reps: 10,
    weight: 0,
    restTime: 120
  })

  useEffect(() => {
    let interval: number | undefined
    if (isTimerRunning) {
      interval = window.setInterval(() => {
        setSessionTimer(prev => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isTimerRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const getWorkoutTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'strength':
        return 'bg-blue-500 text-white'
      case 'cardio':
        return 'bg-green-500 text-white'
      case 'flexibility':
        return 'bg-orange-500 text-white'
      case 'hiit':
        return 'bg-purple-500 text-white'
      case 'yoga':
        return 'bg-pink-500 text-white'
      case 'abs':
        return 'bg-red-500 text-white'
      case 'upper body':
        return 'bg-indigo-500 text-white'
      case 'lower body':
        return 'bg-teal-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  if (workouts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-100/80 to-purple-100/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">No workouts yet</h3>
        <p className="text-gray-600 mb-4">Start your fitness journey today!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Current Workout Session */}
      <div className="glass-card p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Day 5 - Full Body + Cardio</h3>
          <span className="text-sm text-gray-500">6 exercises</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">Rest between sets: 150s</p>
        
        {/* Current Exercise */}
        <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-4 mb-4">
          <h4 className="font-bold text-gray-900 mb-2">{currentExercise.name}</h4>
          <p className="text-sm text-gray-600 mb-3">Target {currentExercise.sets}x{currentExercise.reps}, Rest {currentExercise.restTime}s</p>
          
          {/* Set Tracking */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Set 1</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <input
                  type="number"
                  defaultValue={currentExercise.reps}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center bg-white/90 backdrop-blur-sm"
                />
                <p className="text-xs text-gray-500 text-center mt-1">reps</p>
              </div>
              <div>
                <input
                  type="number"
                  defaultValue={currentExercise.weight}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center bg-white/90 backdrop-blur-sm"
                />
                <p className="text-xs text-gray-500 text-center mt-1">kg</p>
              </div>
              <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200">
                  ✓
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Session Timer & Music */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Session timer</p>
            <p className="text-lg font-bold text-gray-900">{formatTime(sessionTimer)}</p>
            <p className="text-xs text-gray-500">Vanilla Ice - Ice Ice Baby</p>
          </div>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg"
          >
            {isTimerRunning ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>

      {/* Training Days Overview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Training days</h3>
          <span className="text-sm text-gray-600">ready every day.</span>
        </div>
        
        {/* Day Cards */}
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {['Day 1 - Push (Chest, Shoulders, Triceps)', 'Day 2 - Pull (Back, Biceps)', 'Day 3 - Legs', 'Day 4 - Rest', 'Day 5 - Full Body + Cardio'].map((day, index) => (
            <div key={index} className="flex-shrink-0 bg-gray-100/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm">
              <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{day}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-900">Recent Workouts</h3>
        {workouts.slice(0, 3).map((workout) => (
          <div key={workout.id} className="glass-card p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getWorkoutTypeColor(workout.type)}`}>
                  <span className="text-xs font-medium">W</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{workout.type}</h4>
                  <p className="text-sm text-gray-500">{formatDate(workout.date)}</p>
                </div>
              </div>
              <button
                onClick={() => onDeleteWorkout(workout.id)}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold text-gray-900">{workout.duration}m</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Calories</p>
                <p className="font-semibold text-gray-900">{workout.calories}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Exercises</p>
                <p className="font-semibold text-gray-900">{workout.exercises.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkoutTracker
