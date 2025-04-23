import React from 'react';
import { Search } from 'lucide-react';
import { useCityStore } from '../store/cityStore';

export function CitySelector() {
  const { cities, selectedCity, comparisonCity, setSelectedCity, setComparisonCity } = useCityStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Primary City Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          🌍 Select Your Current City
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="pl-10 pr-4 py-3 rounded-lg w-full text-gray-900 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none appearance-none shadow-sm"
          >
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}, {city.country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison City Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          📍 Compare With Another City
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={comparisonCity || ''}
            onChange={(e) => setComparisonCity(e.target.value)}
            className="pl-10 pr-4 py-3 rounded-lg w-full text-gray-900 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none appearance-none shadow-sm"
          >
            <option value="">-- No Comparison --</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}, {city.country}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
