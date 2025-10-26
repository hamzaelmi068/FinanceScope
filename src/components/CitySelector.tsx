import React, { useState, useMemo } from 'react';
import { Search, MapPin, ChevronDown, X } from 'lucide-react';
import { useCityStore } from '../store/cityStore';
import { motion, AnimatePresence } from 'framer-motion';
import { componentStyles } from '../utils/designSystem';

export function CitySelector() {
  const { cities, selectedCity, comparisonCity, setSelectedCity, setComparisonCity } = useCityStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [comparisonSearchTerm, setComparisonSearchTerm] = useState('');
  const [isPrimaryOpen, setIsPrimaryOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const filteredCities = useMemo(() => {
    return cities.filter(city => 
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  const filteredComparisonCities = useMemo(() => {
    return cities.filter(city => 
      (city.name.toLowerCase().includes(comparisonSearchTerm.toLowerCase()) ||
       city.country.toLowerCase().includes(comparisonSearchTerm.toLowerCase())) &&
      city.id !== selectedCity
    );
  }, [cities, comparisonSearchTerm, selectedCity]);

  const selectedCityData = cities.find(city => city.id === selectedCity);
  const comparisonCityData = cities.find(city => city.id === comparisonCity);

  const handleCitySelect = (cityId: string, isComparison = false) => {
    if (isComparison) {
      setComparisonCity(cityId);
      setIsComparisonOpen(false);
      setComparisonSearchTerm('');
    } else {
      setSelectedCity(cityId);
      setIsPrimaryOpen(false);
      setSearchTerm('');
    }
  };

  const clearComparison = () => {
    setComparisonCity(null);
    setComparisonSearchTerm('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Primary City Selection */}
      <div className="relative">
        <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-gray-200">
          🌍 Select Your Current City
        </label>
        <div className="relative">
          <div
            onClick={() => setIsPrimaryOpen(!isPrimaryOpen)}
            className={`${componentStyles.input.base} cursor-pointer flex items-center justify-between pr-10`}
          >
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900 dark:text-white">
                {selectedCityData ? `${selectedCityData.name}, ${selectedCityData.country}` : 'Select a city...'}
              </span>
            </div>
            <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isPrimaryOpen ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {isPrimaryOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-hidden"
              >
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search cities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredCities.map((city) => (
                    <motion.div
                      key={city.id}
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      onClick={() => handleCitySelect(city.id)}
                      className={`p-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
                        selectedCity === city.id ? 'bg-blue-100 dark:bg-blue-900/30' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{city.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{city.country}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Comparison City Selection */}
      <div className="relative">
        <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-gray-200">
          📍 Compare With Another City
        </label>
        <div className="relative">
          <div
            onClick={() => setIsComparisonOpen(!isComparisonOpen)}
            className={`${componentStyles.input.base} cursor-pointer flex items-center justify-between pr-10`}
          >
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900 dark:text-white">
                {comparisonCityData ? `${comparisonCityData.name}, ${comparisonCityData.country}` : 'Select comparison city...'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {comparisonCityData && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearComparison();
                  }}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
              <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isComparisonOpen ? 'rotate-180' : ''}`} />
            </div>
          </div>

          <AnimatePresence>
            {isComparisonOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-hidden"
              >
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search cities..."
                      value={comparisonSearchTerm}
                      onChange={(e) => setComparisonSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredComparisonCities.map((city) => (
                    <motion.div
                      key={city.id}
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      onClick={() => handleCitySelect(city.id, true)}
                      className={`p-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
                        comparisonCity === city.id ? 'bg-blue-100 dark:bg-blue-900/30' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{city.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{city.country}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
