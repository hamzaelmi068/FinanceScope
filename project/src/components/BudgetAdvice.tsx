import React from 'react';
import { CityData } from '../types/city';
import { analyzeBudget } from '../utils/budgetAnalyzer';
import { PiggyBank, TrendingDown, MapPin } from 'lucide-react';

interface BudgetAdviceProps {
  cityData: CityData;
  salary: number;
  isDarkMode: boolean;
}

export function BudgetAdvice({ cityData, salary, isDarkMode }: BudgetAdviceProps) {
  const advice = analyzeBudget(cityData, salary);
  const monthlyIncome = salary / 12;

  return (
    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h2 className="text-2xl font-bold mb-6">Financial Insights</h2>
      
      {/* Summary */}
      <div className="mb-8">
        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {advice.summary}
        </p>
      </div>

      {/* Monthly Budget Breakdown */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Monthly Budget Breakdown</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(advice.monthlyBudget).map(([category, amount]) => (
            <div
              key={category}
              className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}
            >
              <p className="text-sm text-gray-500 capitalize">{category}</p>
              <p className="text-xl font-bold">${amount.toFixed(0)}</p>
              <p className="text-sm text-gray-500">
                {((amount / monthlyIncome) * 100).toFixed(1)}% of income
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {advice.recommendations.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <PiggyBank className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
            <h3 className="text-lg font-semibold">Recommendations</h3>
          </div>
          <ul className="space-y-2">
            {advice.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className={`ml-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {rec}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Savings Opportunities */}
      {advice.savingsOpportunities.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <TrendingDown className={`h-5 w-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'} mr-2`} />
            <h3 className="text-lg font-semibold">Savings Opportunities</h3>
          </div>
          <ul className="space-y-2">
            {advice.savingsOpportunities.map((opp, index) => (
              <li key={index} className="flex items-start">
                <span className={`ml-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {opp}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Alternative Cities */}
      {advice.alternativeCities && (
        <div>
          <div className="flex items-center mb-3">
            <MapPin className={`h-5 w-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mr-2`} />
            <h3 className="text-lg font-semibold">Alternative Cities to Consider</h3>
          </div>
          <ul className="space-y-2">
            {advice.alternativeCities.map((city, index) => (
              <li key={index} className="flex items-start">
                <span className={`ml-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {city} - More affordable housing market
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}