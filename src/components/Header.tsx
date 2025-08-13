interface HeaderProps {
  onAddWorkout: () => void
}

const Header = ({ onAddWorkout }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-fitness-green to-fitness-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">FitTrack</h1>
          </div>
          
          <button
            onClick={onAddWorkout}
            className="btn-primary flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Workout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
