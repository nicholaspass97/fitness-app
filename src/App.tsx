import { useState } from 'react'
import Navigation from './components/Navigation'
import WorkoutCategories from './components/WorkoutCategories'
import WorkoutTracker from './components/WorkoutTracker'
import ProgressChart from './components/ProgressChart'
import WorkoutForm from './components/WorkoutForm'

export interface Workout {
  id: string
  date: string
  type: string
  duration: number
  calories: number
  exercises: Exercise[]
}

export interface Exercise {
  name: string
  sets: number
  reps: number
  weight?: number
}

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState('workouts')

  const addWorkout = (workout: Omit<Workout, 'id'>) => {
    const newWorkout = {
      ...workout,
      id: Date.now().toString()
    }
    setWorkouts([newWorkout, ...workouts])
    setShowForm(false)
    setActiveTab('tracker')
  }

  const deleteWorkout = (id: string) => {
    setWorkouts(workouts.filter(workout => workout.id !== id))
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'workouts':
        return <WorkoutCategories />
      case 'tracker':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Training Days</h1>
              <button
                onClick={() => setShowForm(true)}
                className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded-xl border border-gray-200 transition-colors duration-200 flex items-center space-x-2"
              >
                <span>➕</span>
                <span>Add Day</span>
              </button>
            </div>
            <WorkoutTracker 
              workouts={workouts} 
              onDeleteWorkout={deleteWorkout}
            />
          </div>
        )
      case 'progress':
        return (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">Progress Analytics</h1>
            <ProgressChart workouts={workouts} />
          </div>
        )
      case 'add':
        setShowForm(true)
        setActiveTab('tracker')
        return null
      default:
        return <WorkoutCategories />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">FitnessTracker</h1>
              <p className="text-sm text-gray-500">Ready every day</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-sm">👤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex space-x-1 overflow-x-auto">
          {[
            { id: 'workouts', name: 'Workouts', icon: '💪' },
            { id: 'tracker', name: 'Training', icon: '📊' },
            { id: 'progress', name: 'Progress', icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <main className="px-4 py-4 max-w-md mx-auto">
        {renderContent()}
      </main>

      {/* Workout Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <WorkoutForm 
              onSubmit={addWorkout}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
