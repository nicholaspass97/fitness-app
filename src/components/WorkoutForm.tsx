import { useState } from 'react'
import type { Workout, Exercise } from '../App'

interface WorkoutFormProps {
  onSubmit: (workout: Omit<Workout, 'id'>) => void
  onCancel: () => void
}

const WorkoutForm = ({ onSubmit, onCancel }: WorkoutFormProps) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Strength',
    duration: 30,
    calories: 200,
    exercises: [] as Exercise[]
  })

  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: 3,
    reps: 10,
    weight: 0
  })

  const handleAddExercise = () => {
    if (newExercise.name.trim()) {
      setFormData(prev => ({
        ...prev,
        exercises: [...prev.exercises, { ...newExercise }]
      }))
      setNewExercise({ name: '', sets: 3, reps: 10, weight: 0 })
    }
  }

  const handleRemoveExercise = (index: number) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Add New Workout</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Basic Workout Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Workout Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="Strength">Strength Training</option>
            <option value="Cardio">Cardio</option>
            <option value="Flexibility">Flexibility</option>
            <option value="HIIT">HIIT</option>
            <option value="Yoga">Yoga</option>
            <option value="Abs">Abs Circuit</option>
            <option value="Upper Body">Upper Body</option>
            <option value="Lower Body">Lower Body</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (min)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Calories</label>
          <input
            type="number"
            value={formData.calories}
            onChange={(e) => setFormData(prev => ({ ...prev, calories: parseInt(e.target.value) || 0 }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            min="0"
            required
          />
        </div>
      </div>

      {/* Exercises Section */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Exercises</h3>
        
        {/* Add Exercise Form */}
        <div className="bg-blue-50 p-4 rounded-xl mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Add Exercise</h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Exercise name"
              value={newExercise.name}
              onChange={(e) => setNewExercise(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="Sets"
                value={newExercise.sets}
                onChange={(e) => setNewExercise(prev => ({ ...prev, sets: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                min="1"
              />
              <input
                type="number"
                placeholder="Reps"
                value={newExercise.reps}
                onChange={(e) => setNewExercise(prev => ({ ...prev, reps: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                min="1"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={newExercise.weight}
                onChange={(e) => setNewExercise(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                min="0"
              />
            </div>
            <button
              type="button"
              onClick={handleAddExercise}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
            >
              Add Exercise
            </button>
          </div>
        </div>

        {/* Exercise List */}
        {formData.exercises.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">Added Exercises</h4>
            {formData.exercises.map((exercise, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{exercise.name}</p>
                  <p className="text-sm text-gray-600">
                    {exercise.sets} sets × {exercise.reps} reps
                    {exercise.weight && exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveExercise(index)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          Save Workout
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default WorkoutForm
