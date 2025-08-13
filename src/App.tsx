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
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Workout Tracker</h1>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <span>➕</span>
                <span>Add Workout</span>
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
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Progress Analytics</h1>
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
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Workout Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
