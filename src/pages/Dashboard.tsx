import { useState } from 'react'
import Films from './FilmPages/FilmDataView'
import Stores from './StorePages/StoreDataView'
import Rentals from './RentalPages/RentalDataView'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('films')

  const tabs = [
    { id: 'films', label: 'Films' },
    { id: 'stores', label: 'Stores' },
    { id: 'rentals', label: 'Rentals' },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'films':
        return <Films />
      case 'stores':
        return <Stores />
      case 'rentals':
        return <Rentals />
      default:
        return <Films />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8"> 
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-3 py-4 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4">
        {renderContent()}
      </main>
    </div>
  )
}

export default Dashboard
