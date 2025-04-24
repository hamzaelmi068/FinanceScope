import React from 'react';
import { Home, Bus, ShoppingCart, Music, TrendingUp } from 'lucide-react';
import { CityData } from '../types/city';

interface CityCardProps {
  data: CityData;
  isDarkMode: boolean;
}

export function CityCard({ data, isDarkMode }: CityCardProps) {
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const sectionBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';

  return (
    <div className={`p-6 rounded-2xl shadow-xl space-y-6 ${cardBg} transition-all duration-300`}>
      <div className="flex items-center gap-3">
        <Home className="h-6 w-6 text-indigo-500" />
        <h2 className="text-2xl font-semibold">Living in {data.name}</h2>
      </div>

      <div className={`p-4 rounded-xl ${sectionBg}`}>
        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">🏡 Average Rent (1BR)</p>
        <p className="text-2xl font-bold text-green-500 dark:text-green-400">${data.costOfLiving.rent.oneBedroom}</p>
      </div>

      <div className={`p-4 rounded-xl ${sectionBg}`}>
        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">🚌 Public Transport Monthly</p>
        <p className="text-2xl font-bold text-blue-500 dark:text-blue-400">${data.costOfLiving.transport}</p>
      </div>

      <div className={`p-4 rounded-xl ${sectionBg}`}>
        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">🛒 Grocery Basket</p>
        <p className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">${data.costOfLiving.groceries}</p>
      </div>

      <div className={`p-4 rounded-xl ${sectionBg}`}>
        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">🎭 Entertainment & Dining</p>
        <p className="text-2xl font-bold text-pink-500 dark:text-pink-400">${data.costOfLiving.entertainment}</p>
      </div>

      <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <TrendingUp className="w-4 h-4 text-green-400" />
          Salary Benchmark: <span className="font-semibold">${data.salary.average}</span>
        </div>
      </div>
    </div>
  );
}
