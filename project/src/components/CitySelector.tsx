import React from 'react';
import { Search } from 'lucide-react';
import { useCityStore } from '../store/cityStore';

export function CitySelector() {
  const { cities, selectedCity, comparisonCity, setSelectedCity, setComparisonCity } = useCityStore();

  const baseStyles = `
    pl-10 pr-4 py-3 rounded-lg w-full 
    border shadow-sm transition 
    text-gray-900 dark:text-white 
    bg-white dark:bg-gray-700 
    border-gray-300 dark:border-gray-600 
    focus:ring-2 focus:outline-none 
    dark:placeholder-gray-400
  `;

  const labelStyles = `
    block text-sm font-semibold mb-2 
    text-gray-800 dark:text-gray-200
  `;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Primary City Selection */}
      <div>
        <label className={labelStyles}>
          🌍 Select Your Current City
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className={baseStyles}
          >
            {cities.map(city => (
              <option
                key={city.id}
                value={city.id}
                className="dark:bg-gray-700 dark:text-white bg-white text-black"
              >
                {city.name}, {city.country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison City Selection */}
      <div>
        <label className={labelStyles}>
          📍 Compare With Another City
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={comparisonCity || ''}
            onChange={(e) => setComparisonCity(e.target.value)}
            className={baseStyles}
          >
            <option value="">-- No Comparison --</option>
            {cities.map(city => (
              <option
                key={city.id}
                value={city.id}
                className="dark:bg-gray-700 dark:text-white bg-white text-black"
              >
                {city.name}, {city.country}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
