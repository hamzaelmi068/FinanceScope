import React, { useState } from 'react';
import { Moon, Sun, DollarSign, Menu, X } from 'lucide-react';
import { CitySelector } from './components/CitySelector';
import { CityCard } from './components/CityCard';
import { BudgetAdvice } from './components/BudgetAdvice';
import { DataVisualization } from './components/DataVisualization';
import FinancialInsights from './components/FinancialInsights';
import { useCityStore } from './store/cityStore';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getSelectedCityData, getComparisonCityData, userSalary, setUserSalary } = useCityStore();

  const selectedCityData = getSelectedCityData();
  const comparisonCityData = getComparisonCityData();

  if (!selectedCityData) return null;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Enhanced Navigation Bar */}
      <nav className={`fixed w-full z-50 shadow-lg backdrop-blur-md ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              FinanceScope
            </h1>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode((prev) => !prev)}
              className="p-2 rounded-full transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Toggle theme"
            >
              <motion.div
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="pt-24 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10 py-20">
          <div className="max-w-6xl mx-auto px-4 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Make Smarter Financial Decisions
              </h2>
              <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Compare living costs, track expenses, and plan your future with comprehensive data-driven insights
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <CitySelector />
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1 max-w-sm">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="number"
                    placeholder="Enter your annual salary ($)"
                    className="w-full pl-10 pr-4 py-4 rounded-xl text-gray-900 text-lg font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-lg"
                    value={userSalary || ''}
                    onChange={(e) => setUserSalary(Number(e.target.value))}
                  />
                </div>
                <div className="text-sm text-blue-200">
                  💡 Enter your salary for personalized insights
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Dashboard Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCityData.id}-${comparisonCityData?.id || 'none'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {/* City Cards Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CityCard data={selectedCityData} isDarkMode={isDarkMode} />
              </motion.div>
              
              {comparisonCityData && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CityCard data={comparisonCityData} isDarkMode={isDarkMode} isComparison={true} />
                </motion.div>
              )}
            </div>

            {/* Financial Insights Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <BudgetAdvice cityData={selectedCityData} salary={userSalary} isDarkMode={isDarkMode} />
            </motion.div>

            {/* Data Visualization Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <DataVisualization 
                primaryCity={selectedCityData} 
                comparisonCity={comparisonCityData} 
                salary={userSalary} 
                isDarkMode={isDarkMode} 
              />
            </motion.div>

            {/* Additional Financial Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <FinancialInsights cityData={selectedCityData} salary={userSalary} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">FinanceScope</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your global cost-of-living companion for smarter financial decisions.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Features</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>Cost of Living Comparison</li>
                <li>Salary Insights</li>
                <li>Financial Planning Tools</li>
                <li>Real-time Data</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <a href="https://github.com/hamzaelmi068/FinanceScope" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a href="https://finance-scope.vercel.app" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Live Demo
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
            <p>Built with ❤️ for global job seekers — {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
