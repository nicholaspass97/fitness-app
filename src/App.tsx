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
                className="bg-white/90 hover:bg-white text-gray-800 font-medium py-2 px-4 rounded-xl border border-white/20 transition-colors duration-200 flex items-center space-x-2 backdrop-blur-sm"
              >
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
    <div className="min-h-screen">
      {/* Mobile Header */}
      <div className="glass-header px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">FitnessTracker</h1>
              <p className="text-sm text-gray-600">Ready every day</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-100/80 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="glass-nav px-4 py-2">
        <div className="flex space-x-1 overflow-x-auto">
          {[
            { id: 'workouts', name: 'Workouts' },
            { id: 'tracker', name: 'Training' },
            { id: 'progress', name: 'Progress' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-100/80 text-blue-700 backdrop-blur-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 backdrop-blur-sm'
              }`}
            >
              {tab.name}
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
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
