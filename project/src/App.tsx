import React, { useState } from 'react';
import { Moon, Sun, DollarSign } from 'lucide-react';
import { CitySelector } from './components/CitySelector';
import { CityCard } from './components/CityCard';
import { BudgetAdvice } from './components/BudgetAdvice';
import { FinancialInsights } from './components/FinancialInsights';
import { useCityStore } from './store/cityStore';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { getSelectedCityData, getComparisonCityData, userSalary, setUserSalary } = useCityStore();

  const selectedCityData = getSelectedCityData();
  const comparisonCityData = getComparisonCityData();

  if (!selectedCityData) return null;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            <DollarSign className="inline-block mr-1 text-green-500" /> FinanceScope
          </h1>
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="p-2 rounded-full transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 text-center relative">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="City Skyline"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 bg-gradient-to-r from-blue-900/90 to-purple-900/90 py-20">
          <div className="max-w-4xl mx-auto px-4 text-white">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Make Smarter Financial Decisions
            </h2>
            <p className="text-lg mb-6">
              Compare living costs, track expenses, and plan your future with data-driven insights
            </p>
            <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-center sm:gap-4">
              <CitySelector />
              <input
                type="number"
                placeholder="Enter your salary ($)"
                className="p-3 rounded-lg text-gray-900 w-full sm:w-64 focus:ring-2 focus:ring-blue-400"
                value={userSalary || ''}
                onChange={(e) => setUserSalary(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <CityCard data={selectedCityData} isDarkMode={isDarkMode} />
            <BudgetAdvice cityData={selectedCityData} salary={userSalary} isDarkMode={isDarkMode} />
          </div>
          {comparisonCityData && (
            <div className="space-y-8">
              <CityCard data={comparisonCityData} isDarkMode={isDarkMode} />
              <BudgetAdvice cityData={comparisonCityData} salary={userSalary} isDarkMode={isDarkMode} />
            </div>
          )}
        </div>

        {/* Financial Insights */}
        <FinancialInsights cityData={selectedCityData} salary={userSalary} />
      </main>

      {/* Footer */}
      <footer className="text-center mt-16 py-8 text-sm text-gray-400">
        Built with ❤️ for global job seekers — <a href="https://github.com/hamzaelmi068/FinanceScope" className="underline">GitHub</a> — {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
