import { Workout } from '../App'

interface ProgressChartProps {
  workouts: Workout[]
}

const ProgressChart = ({ workouts }: ProgressChartProps) => {
  const totalWorkouts = workouts.length
  const totalCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0)
  const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0)
  
  const workoutTypes = workouts.reduce((acc, workout) => {
    acc[workout.type] = (acc[workout.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const mostCommonType = Object.keys(workoutTypes).sort((a, b) => 
    workoutTypes[b] - workoutTypes[a]
  )[0]

  const thisWeekWorkouts = workouts.filter(workout => {
    const workoutDate = new Date(workout.date)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return workoutDate >= weekAgo
  }).length

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Progress Overview</h2>
      
      <div className="card">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{totalWorkouts}</p>
            <p className="text-sm text-gray-500">Total Workouts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-fitness-green">{totalCalories}</p>
            <p className="text-sm text-gray-500">Calories Burned</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-fitness-blue">{totalDuration}</p>
            <p className="text-sm text-gray-500">Minutes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-fitness-orange">{thisWeekWorkouts}</p>
            <p className="text-sm text-gray-500">This Week</p>
          </div>
        </div>
      </div>

      {Object.keys(workoutTypes).length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workout Types</h3>
          <div className="space-y-3">
            {Object.entries(workoutTypes).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 capitalize">{type}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(count / totalWorkouts) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalWorkouts > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Duration</span>
              <span className="text-sm font-medium">{Math.round(totalDuration / totalWorkouts)} min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Calories</span>
              <span className="text-sm font-medium">{Math.round(totalCalories / totalWorkouts)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Favorite Type</span>
              <span className="text-sm font-medium capitalize">{mostCommonType}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgressChart
