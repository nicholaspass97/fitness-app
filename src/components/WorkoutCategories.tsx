import { useState } from 'react'

interface WorkoutCategory {
  id: string
  name: string
  icon: string
  color: string
  exercises: Exercise[]
}

interface Exercise {
  name: string
  sets: string
  reps: string
  notes?: string
}

const workoutCategories: WorkoutCategory[] = [
  {
    id: 'abs-circuit',
    name: 'ABS CIRCUIT',
    icon: '💪',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    exercises: [
      { name: 'In & Outs', sets: '3', reps: '20 reps' },
      { name: 'Russian Twists', sets: '3', reps: '30 reps' },
      { name: 'Bicycle Crunches', sets: '3', reps: '20 reps' },
      { name: 'Penguins', sets: '3', reps: '30 reps' },
      { name: 'Mountain Climbers', sets: '3', reps: '30 reps' },
      { name: '60 Second Plank', sets: '3', reps: '60 seconds' }
    ]
  },
  {
    id: 'abs-circuit-2',
    name: 'ABS CIRCUIT 2',
    icon: '🔥',
    color: 'bg-gradient-to-r from-orange-500 to-red-500',
    exercises: [
      { name: 'Toe Touches (Weighted)', sets: '3', reps: '20-28 reps' },
      { name: 'Russian Twists', sets: '3', reps: '30 reps' },
      { name: 'Flutter Kicks', sets: '3', reps: '30 reps' }
    ]
  },
  {
    id: 'leg-combo',
    name: 'LEG COMBO EXERCISES',
    icon: '🦵',
    color: 'bg-gradient-to-r from-green-500 to-teal-500',
    exercises: [
      { name: 'Squats', sets: '3', reps: '12-15 reps' },
      { name: 'Leg Press', sets: '3', reps: '12-15 reps' }
    ]
  },
  {
    id: 'hamstrings',
    name: 'HAMSTRINGS',
    icon: '🏋️',
    color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    exercises: [
      { name: 'RDLs/Deadlifts', sets: '3', reps: '8-12 reps' },
      { name: 'Prone Leg Curls', sets: '3', reps: '12-15 reps' },
      { name: 'Seated Leg Curls', sets: '3', reps: '12-15 reps' }
    ]
  },
  {
    id: 'glutes',
    name: 'GLUTES',
    icon: '🍑',
    color: 'bg-gradient-to-r from-pink-500 to-rose-500',
    exercises: [
      { name: 'Bulgarian Split Lunges', sets: '3', reps: '10-12 each leg', notes: 'Also targets quads' },
      { name: 'Adduction/Abduction', sets: '3', reps: '15-20 reps' },
      { name: 'Hip Thrusts', sets: '3', reps: '12-15 reps' },
      { name: 'Kickbacks', sets: '3', reps: '15-20 each leg' }
    ]
  },
  {
    id: 'quads',
    name: 'QUADS',
    icon: '💪',
    color: 'bg-gradient-to-r from-emerald-500 to-green-500',
    exercises: [
      { name: 'Step Back Lunges', sets: '3', reps: '10-12 each leg' },
      { name: 'Squats w/ Dumbbell', sets: '3', reps: '12-15 reps' },
      { name: 'Leg Extension', sets: '3', reps: '12-15 reps' }
    ]
  },
  {
    id: 'back',
    name: 'BACK EXERCISES',
    icon: '🏋️‍♂️',
    color: 'bg-gradient-to-r from-slate-600 to-gray-700',
    exercises: [
      { name: 'Pull Downs (Standing/Sitting)', sets: '3', reps: '10-12 reps' },
      { name: 'Assisted Pull Ups', sets: '3', reps: '8-10 reps' },
      { name: 'Face Pulls', sets: '3', reps: '12-15 reps' },
      { name: 'Seated Rows', sets: '3', reps: '10-12 reps' },
      { name: 'Barbell Rows', sets: '3', reps: '8-12 reps' }
    ]
  },
  {
    id: 'biceps',
    name: 'BICEP EXERCISES',
    icon: '💪',
    color: 'bg-gradient-to-r from-red-500 to-pink-500',
    exercises: [
      { name: 'Bicep Curls/Holds (Dumbbells)', sets: '3', reps: '10-12 reps' },
      { name: 'Hammer Curls (Front of Chest)', sets: '3', reps: '10-12 each arm' },
      { name: 'Rows (Machine or Dumbbell)', sets: '3', reps: '10-12 reps' },
      { name: 'Preacher Curls (Machine)', sets: '3', reps: '10-12 reps' },
      { name: 'Cable Curls', sets: '3', reps: '10-12 reps' }
    ]
  },
  {
    id: 'triceps',
    name: 'TRICEPS',
    icon: '💪',
    color: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    exercises: [
      { name: 'Rope Pushdown', sets: '3', reps: '12-15 reps' },
      { name: 'Overhead Rope Extension', sets: '3', reps: '12-15 reps' },
      { name: 'Tricep Dumbbell Kickbacks', sets: '3', reps: '12-15 each arm' },
      { name: 'Overhead Dips (Dumbbells)', sets: '3', reps: '10-12 reps' },
      { name: 'Assisted Tricep Dips', sets: '3', reps: '8-10 reps' },
      { name: 'Skull Crushers', sets: '3', reps: '10-12 reps' }
    ]
  },
  {
    id: 'chest',
    name: 'CHEST',
    icon: '💪',
    color: 'bg-gradient-to-r from-blue-600 to-cyan-500',
    exercises: [
      { name: 'Standing Cable Fly', sets: '3', reps: '12-15 reps' },
      { name: 'Sitting Fly', sets: '3', reps: '12-15 reps' },
      { name: 'Bench Press', sets: '3', reps: '8-12 reps' },
      { name: 'Pec Flys', sets: '3', reps: '12-15 reps' },
      { name: 'Incline Bench Press', sets: '3', reps: '8-12 reps' }
    ]
  },
  {
    id: 'shoulders',
    name: 'SHOULDERS',
    icon: '💪',
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    exercises: [
      { name: 'Overhead Shoulder Press (Dumbbell)', sets: '3', reps: '8-12 reps' },
      { name: 'Lateral Shoulder Dumbbell Raises', sets: '3', reps: '12-15 reps' }
    ]
  }
]

const WorkoutCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCategories = workoutCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.exercises.some(exercise => 
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Workout Library</h1>
        <p className="text-gray-600">Choose your workout category and get started</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search workouts or exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
              selectedCategory === category.id ? 'ring-4 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
          >
            {/* Category Header */}
            <div className={`${category.color} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.exercises.length} exercises</p>
                </div>
                <span className="text-2xl">{category.icon}</span>
              </div>
            </div>

            {/* Exercises List */}
            <div className="bg-white p-6">
              <div className="space-y-3">
                {category.exercises.map((exercise, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{exercise.name}</p>
                      <p className="text-sm text-gray-600">
                        {exercise.sets} sets × {exercise.reps}
                        {exercise.notes && (
                          <span className="text-xs text-gray-500 ml-2">({exercise.notes})</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                Start Workout
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Start Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Start Workouts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white hover:bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200 transition-all duration-200">
            <div className="text-center">
              <div className="text-2xl mb-2">💪</div>
              <h4 className="font-semibold text-gray-900">Upper Body</h4>
              <p className="text-sm text-gray-600">Chest, Back, Shoulders</p>
            </div>
          </button>
          <button className="bg-white hover:bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200 transition-all duration-200">
            <div className="text-center">
              <div className="text-2xl mb-2">🦵</div>
              <h4 className="font-semibold text-gray-900">Lower Body</h4>
              <p className="text-sm text-gray-600">Legs, Glutes, Core</p>
            </div>
          </button>
          <button className="bg-white hover:bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200 transition-all duration-200">
            <div className="text-center">
              <div className="text-2xl mb-2">🔥</div>
              <h4 className="font-semibold text-gray-900">Full Body</h4>
              <p className="text-sm text-gray-600">Complete workout</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WorkoutCategories
