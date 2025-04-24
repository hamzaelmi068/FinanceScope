import React from 'react';
import { Search } from 'lucide-react';
import { useCityStore } from '../store/cityStore';

export function CitySelector() {
  const { cities, selectedCity, comparisonCity, setSelectedCity, setComparisonCity } = useCityStore();

  const baseStyles =
    'pl-10 pr-4 py-3 rounded-lg w-full border focus:ring-2 focus:outline-none shadow-sm transition';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Primary City Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          🌍 Select Your Current City
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className={`${baseStyles} text-gray-900 dark:text-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-blue-500`}
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
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          📍 Compare With Another City
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={comparisonCity || ''}
            onChange={(e) => setComparisonCity(e.target.value)}
            className={`${baseStyles} text-gray-900 dark:text-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-purple-500`}
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

// Location of FinancialInsights.tsx:
// ➤ Save inside `src/components/FinancialInsights.tsx`
// Then import and use it inside your App.tsx like this:
// import { FinancialInsights } from './components/FinancialInsights';
// ...
// <FinancialInsights cityData={selectedCityData} salary={userSalary} />
