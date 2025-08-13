import type { Workout } from '../App'

interface WorkoutTrackerProps {
  workouts: Workout[]
  onDeleteWorkout: (id: string) => void
}

const WorkoutTracker = ({ workouts, onDeleteWorkout }: WorkoutTrackerProps) => {
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

  const getWorkoutTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'strength':
        return '💪'
      case 'cardio':
        return '🏃‍♂️'
      case 'flexibility':
        return '🧘‍♀️'
      case 'hiit':
        return '🔥'
      case 'yoga':
        return '🧘‍♂️'
      case 'abs':
        return '🔥'
      case 'upper body':
        return '💪'
      case 'lower body':
        return '🦵'
      default:
        return '🏋️'
    }
  }

  if (workouts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No workouts yet</h3>
        <p className="text-gray-600 mb-6">Start tracking your fitness journey by adding your first workout!</p>
        <div className="text-sm text-gray-500">
          <p>💡 Tip: Check out the Workout Library for exercise ideas</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Workouts</p>
              <p className="text-2xl font-bold text-gray-900">{workouts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏱️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Time</p>
              <p className="text-2xl font-bold text-gray-900">{workouts.reduce((sum, w) => sum + w.duration, 0)}m</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Calories</p>
              <p className="text-2xl font-bold text-gray-900">{workouts.reduce((sum, w) => sum + w.calories, 0)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💪</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Exercises</p>
              <p className="text-2xl font-bold text-gray-900">{workouts.reduce((sum, w) => sum + w.exercises.length, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Workouts List */}
      <div className="space-y-4">
        {workouts.map((workout) => (
          <div key={workout.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getWorkoutTypeColor(workout.type)}`}>
                    <span className="text-lg">{getWorkoutTypeIcon(workout.type)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{workout.type}</h3>
                    <p className="text-sm text-gray-500">{formatDate(workout.date)}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => onDeleteWorkout(workout.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold text-gray-900">{workout.duration} min</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="font-semibold text-gray-900">{workout.calories}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Exercises</p>
                  <p className="font-semibold text-gray-900">{workout.exercises.length}</p>
                </div>
              </div>
              
              {workout.exercises.length > 0 && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Exercises:</p>
                  <div className="space-y-2">
                    {workout.exercises.slice(0, 3).map((exercise, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium text-gray-900">{exercise.name}</span>
                        <span className="text-sm text-gray-600">
                          {exercise.sets} sets × {exercise.reps} reps
                          {exercise.weight && exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                        </span>
                      </div>
                    ))}
                    {workout.exercises.length > 3 && (
                      <p className="text-sm text-gray-500 text-center py-2">
                        +{workout.exercises.length - 3} more exercises
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkoutTracker
