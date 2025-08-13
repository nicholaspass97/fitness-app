import { Workout } from '../App'

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
        return 'bg-fitness-blue text-white'
      case 'cardio':
        return 'bg-fitness-green text-white'
      case 'flexibility':
        return 'bg-fitness-orange text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  if (workouts.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No workouts yet</h3>
        <p className="text-gray-600">Start tracking your fitness journey by adding your first workout!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Recent Workouts</h2>
      
      <div className="space-y-4">
        {workouts.map((workout) => (
          <div key={workout.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getWorkoutTypeColor(workout.type)}`}>
                    {workout.type}
                  </span>
                  <span className="text-sm text-gray-500">{formatDate(workout.date)}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold">{workout.duration} min</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Calories</p>
                    <p className="font-semibold">{workout.calories}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Exercises</p>
                    <p className="font-semibold">{workout.exercises.length}</p>
                  </div>
                </div>
                
                {workout.exercises.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Exercises:</p>
                    <div className="space-y-1">
                      {workout.exercises.slice(0, 3).map((exercise, index) => (
                        <p key={index} className="text-sm text-gray-700">
                          {exercise.name} - {exercise.sets} sets × {exercise.reps} reps
                          {exercise.weight && ` @ ${exercise.weight}kg`}
                        </p>
                      ))}
                      {workout.exercises.length > 3 && (
                        <p className="text-sm text-gray-500">+{workout.exercises.length - 3} more exercises</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => onDeleteWorkout(workout.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkoutTracker
