import { useState } from 'react'
import { Workout, Exercise } from '../App'

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Add New Workout</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            className="input-field"
          >
            <option value="Strength">Strength</option>
            <option value="Cardio">Cardio</option>
            <option value="Flexibility">Flexibility</option>
            <option value="HIIT">HIIT</option>
            <option value="Yoga">Yoga</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
            className="input-field"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
          <input
            type="number"
            value={formData.calories}
            onChange={(e) => setFormData(prev => ({ ...prev, calories: parseInt(e.target.value) || 0 }))}
            className="input-field"
            min="0"
            required
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Exercises</h3>
        
        {/* Add Exercise Form */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="Exercise name"
              value={newExercise.name}
              onChange={(e) => setNewExercise(prev => ({ ...prev, name: e.target.value }))}
              className="input-field"
            />
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Sets"
                value={newExercise.sets}
                onChange={(e) => setNewExercise(prev => ({ ...prev, sets: parseInt(e.target.value) || 0 }))}
                className="input-field"
                min="1"
              />
              <input
                type="number"
                placeholder="Reps"
                value={newExercise.reps}
                onChange={(e) => setNewExercise(prev => ({ ...prev, reps: parseInt(e.target.value) || 0 }))}
                className="input-field"
                min="1"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={newExercise.weight}
                onChange={(e) => setNewExercise(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                className="input-field"
                min="0"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddExercise}
            className="btn-secondary w-full"
          >
            Add Exercise
          </button>
        </div>

        {/* Exercise List */}
        {formData.exercises.length > 0 && (
          <div className="space-y-2">
            {formData.exercises.map((exercise, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                <div>
                  <p className="font-medium">{exercise.name}</p>
                  <p className="text-sm text-gray-500">
                    {exercise.sets} sets × {exercise.reps} reps
                    {exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveExercise(index)}
                  className="text-red-500 hover:text-red-700"
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

      <div className="flex space-x-3">
        <button
          type="submit"
          className="btn-primary flex-1"
        >
          Save Workout
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default WorkoutForm
