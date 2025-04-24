import React from 'react';
import { Search } from 'lucide-react';
import { useCityStore } from '../store/cityStore';

export function CitySelector() {
  const { cities, selectedCity, comparisonCity, setSelectedCity, setComparisonCity } = useCityStore();

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="pl-10 pr-4 py-2 rounded-lg w-[300px] text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
        >
          {cities.map(city => (
            <option key={city.id} value={city.id}>
              {city.name}, {city.country}
            </option>
          ))}
        </select>
      </div>
      <div className="relative">
        <select
          value={comparisonCity || ''}
          onChange={(e) => setComparisonCity(e.target.value || null)}
          className="pl-4 pr-4 py-2 rounded-lg w-[300px] text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
        >
          <option value="">Compare with another city...</option>
          {cities
            .filter(city => city.id !== selectedCity)
            .map(city => (
              <option key={city.id} value={city.id}>
                {city.name}, {city.country}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}