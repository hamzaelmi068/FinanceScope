import React, { useEffect, useState } from 'react';
import { Moon, Sun, DollarSign } from 'lucide-react';
import { CitySelector } from './components/CitySelector';
import { CityCard } from './components/CityCard';
import { BudgetAdvice } from './components/BudgetAdvice';
import { useCityStore } from './store/cityStore';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { getSelectedCityData, getComparisonCityData, userSalary, setUserSalary } = useCityStore();

  const [isLoading, setIsLoading] = useState(true);
  const selectedCityData = getSelectedCityData();
  const comparisonCityData = getComparisonCityData();

  useEffect(() => {
    console.log('selectedCityData:', selectedCityData);
    if (selectedCityData) {
      setIsLoading(false);
    }
  }, [selectedCityData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 dark:text-gray-300">
        Loading city data...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            <DollarSign className="inline-block mr-1 text-green-500" /> FinanceScope
          </h1>
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-12 text-center">
        <h2 className="text-4xl font-semibold mb-2 transition-all duration-500 ease-out transform hover:scale-105">
          Compare Your Financial Power Globally
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Enter your salary and explore how far your income can go across cities worldwide.
        </p>
      </div>

      {/* Salary Input and Selector */}
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="number"
            placeholder="Enter your salary ($)"
            className="w-full sm:w-64 p-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm"
            value={userSalary || ''}
            onChange={(e) => setUserSalary(Number(e.target.value))}
          />
        </div>

        <CitySelector />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="transition-opacity duration-700 opacity-100">
            <CityCard data={selectedCityData} isDarkMode={isDarkMode} />
          </div>

          {comparisonCityData && (
            <div className="transition-opacity duration-700 opacity-100">
              <CityCard data={comparisonCityData} isDarkMode={isDarkMode} />
            </div>
          )}
        </div>

        <BudgetAdvice isDarkMode={isDarkMode} />
      </div>

      {/* Footer */}
      <footer className="text-center mt-16 py-8 text-sm text-gray-400">
        Built with ❤️ for global job seekers — <a href="https://github.com" className="underline">GitHub</a>
      </footer>
    </div>
  );
}

export default App;

