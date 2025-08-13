import { useState } from 'react'
import Header from './components/Header'
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

  const addWorkout = (workout: Omit<Workout, 'id'>) => {
    const newWorkout = {
      ...workout,
      id: Date.now().toString()
    }
    setWorkouts([newWorkout, ...workouts])
    setShowForm(false)
  }

  const deleteWorkout = (id: string) => {
    setWorkouts(workouts.filter(workout => workout.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddWorkout={() => setShowForm(true)} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <WorkoutTracker 
              workouts={workouts} 
              onDeleteWorkout={deleteWorkout}
            />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <ProgressChart workouts={workouts} />
          </div>
        </div>
      </main>

      {/* Workout Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
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
