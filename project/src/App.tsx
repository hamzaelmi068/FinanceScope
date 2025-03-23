import React, { useState } from 'react';
import { Moon, Sun, DollarSign } from 'lucide-react';
import { CitySelector } from './components/CitySelector';
import { CityCard } from './components/CityCard';
import { BudgetAdvice } from './components/BudgetAdvice';
import { useCityStore } from './store/cityStore';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { getSelectedCityData, getComparisonCityData, userSalary, setUserSalary } = useCityStore();
  
  const selectedCityData = getSelectedCityData();
  const comparisonCityData = getComparisonCityData();

  if (!selectedCityData) return null;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation Bar */}
      <nav className={`fixed w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <DollarSign className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`ml-2 text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                FinanceScope
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt="City Skyline"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-4">
                  Make Smarter Financial Decisions
                </h1>
                <p className="text-xl text-gray-200 mb-8">
                  Compare living costs, track expenses, and plan your future with data-driven insights
                </p>
                <div className="space-y-4">
                  <CitySelector />
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={userSalary}
                      onChange={(e) => setUserSalary(Number(e.target.value))}
                      placeholder="Enter your annual salary"
                      className="pl-4 pr-4 py-2 rounded-lg w-[300px] text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className={`max-w-7xl mx-auto px-4 py-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <CityCard data={selectedCityData} isDarkMode={isDarkMode} />
              <BudgetAdvice 
                cityData={selectedCityData}
                salary={userSalary}
                isDarkMode={isDarkMode}
              />
            </div>
            {comparisonCityData && (
              <div className="space-y-8">
                <CityCard data={comparisonCityData} isDarkMode={isDarkMode} />
                <BudgetAdvice 
                  cityData={comparisonCityData}
                  salary={userSalary}
                  isDarkMode={isDarkMode}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;