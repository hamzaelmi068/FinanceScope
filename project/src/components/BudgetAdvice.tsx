import React from 'react';
import { PiggyBank, TrendingDown, MapPin } from 'lucide-react';
import { CityData } from '../types/city';
import { analyzeBudget } from '../utils/budgetAnalyzer';

interface BudgetAdviceProps {
  cityData: CityData;
  salary: number;
  isDarkMode: boolean;
}

export function BudgetAdvice({ cityData, salary, isDarkMode }: BudgetAdviceProps) {
  const advice = analyzeBudget(cityData, salary);
  const monthlyIncome = salary / 12;
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const sectionBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';

  return (
    <div className={`mt-12 p-6 rounded-2xl shadow-lg space-y-8 transition-all duration-300 ${cardBg}`}>
      <div className="flex items-center gap-2">
        <PiggyBank className="text-pink-500" />
        <h2 className="text-2xl font-bold">Financial Insights</h2>
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
        {advice.summary}
      </p>

      <div>
        <h3 className="text-xl font-semibold mb-4">📊 Monthly Budget Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-4 rounded-xl ${sectionBg}`}>
            <p className="text-sm text-gray-500 dark:text-gray-300">Estimated Monthly Income</p>
            <p className="text-xl font-bold text-green-500 dark:text-green-400">${monthlyIncome.toFixed(2)}</p>
          </div>
          <div className={`p-4 rounded-xl ${sectionBg}`}>
            <p className="text-sm text-gray-500 dark:text-gray-300">Rent & Utilities</p>
            <p className="text-xl font-bold text-red-500 dark:text-red-400">${cityData.costOfLiving.rent.oneBedroom}</p>
          </div>
          <div className={`p-4 rounded-xl ${sectionBg}`}>
            <p className="text-sm text-gray-500 dark:text-gray-300">Transportation</p>
            <p className="text-xl font-bold text-blue-500 dark:text-blue-400">${cityData.costOfLiving.transport}</p>
          </div>
          <div className={`p-4 rounded-xl ${sectionBg}`}>
            <p className="text-sm text-gray-500 dark:text-gray-300">Groceries & Essentials</p>
            <p className="text-xl font-bold text-yellow-500 dark:text-yellow-400">${cityData.costOfLiving.groceries}</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-300 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400">
        Data based on latest averages for {cityData.name}, {cityData.country}
      </div>
    </div>
  );
}
