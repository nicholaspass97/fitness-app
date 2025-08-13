import type { Workout } from '../App'

interface ProgressChartProps {
  workouts: Workout[]
}

const ProgressChart = ({ workouts }: ProgressChartProps) => {
  const getLast7Days = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push(date.toISOString().split('T')[0])
    }
    return days
  }

  const getWorkoutsByDay = () => {
    const last7Days = getLast7Days()
    return last7Days.map(day => {
      const dayWorkouts = workouts.filter(w => w.date === day)
      return {
        date: day,
        count: dayWorkouts.length,
        duration: dayWorkouts.reduce((sum, w) => sum + w.duration, 0),
        calories: dayWorkouts.reduce((sum, w) => sum + w.calories, 0)
      }
    })
  }

  const workoutData = getWorkoutsByDay()
  const maxWorkouts = Math.max(...workoutData.map(d => d.count), 1)
  const maxDuration = Math.max(...workoutData.map(d => d.duration), 1)

  const formatDay = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Progress</h3>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {workoutData.reduce((sum, d) => sum + d.count, 0)}
          </p>
          <p className="text-sm text-gray-600">Workouts</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {workoutData.reduce((sum, d) => sum + d.duration, 0)}m
          </p>
          <p className="text-sm text-gray-600">Total Time</p>
        </div>
      </div>

      {/* Workout Frequency Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Workout Frequency</h4>
        <div className="flex items-end justify-between space-x-2 h-32">
          {workoutData.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-200 rounded-t-lg relative">
                <div
                  className="bg-blue-500 rounded-t-lg transition-all duration-300"
                  style={{ height: `${(day.count / maxWorkouts) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-600 mt-2">{formatDay(day.date)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Duration Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Daily Duration</h4>
        <div className="flex items-end justify-between space-x-2 h-32">
          {workoutData.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-200 rounded-t-lg relative">
                <div
                  className="bg-green-500 rounded-t-lg transition-all duration-300"
                  style={{ height: `${(day.duration / maxDuration) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-600 mt-2">{formatDay(day.date)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h4>
        <div className="space-y-2">
          {workouts.slice(0, 3).map((workout) => (
            <div key={workout.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-900">{workout.type}</span>
              </div>
              <span className="text-gray-600">{workout.duration}m</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgressChart
