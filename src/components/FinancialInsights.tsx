import React from 'react';
import { Lightbulb, TrendingUp, Wallet } from 'lucide-react';
import { CityData } from '../types/city';

interface FinancialInsightsProps {
  cityData: CityData;
  salary: number;
}

const FinancialInsights = ({ cityData, salary }: FinancialInsightsProps) => {
  const rent = cityData.costOfLiving.rent.oneBedroom;
  const transport = cityData.costOfLiving.transport;
  const groceries = cityData.costOfLiving.groceries;
  const utilities = 150;
  const discretionary = 1320;
  const savings = 1250;

  const comfortableSalary = 95000;
  const inflationRate = 3.2;
  const costGrowth = 5.8;

  return (
    <div className="space-y-8 mt-12">
      <div className="p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-800">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          <Wallet className="inline mr-2 text-green-500" /> Salary Insights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Median Salary</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">${cityData.salary.average}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Required for Comfortable Living</p>
            <p className="text-2xl font-bold text-red-500 dark:text-red-300">${comfortableSalary}</p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-800">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          <TrendingUp className="inline mr-2 text-purple-500" /> Economic Trends
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Inflation Rate</p>
            <p className="text-2xl font-bold text-yellow-500">{inflationRate}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cost Growth (YoY)</p>
            <p className="text-2xl font-bold text-green-500">+{costGrowth}%</p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-800">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          <Lightbulb className="inline mr-2 text-blue-500" /> Financial Insights
        </h3>
        <p className="mb-4 text-sm text-gray-500">
          Based on your ${salary} salary in {cityData.name}, you have some financial flexibility.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-800 dark:text-gray-200">
          <div><strong>Housing</strong><br />${rent} <span className="text-xs">(44.8%)</span></div>
          <div><strong>Utilities</strong><br />${utilities} <span className="text-xs">(2.4%)</span></div>
          <div><strong>Groceries</strong><br />${groceries} <span className="text-xs">(9.6%)</span></div>
          <div><strong>Transportation</strong><br />${transport} <span className="text-xs">(2.1%)</span></div>
          <div><strong>Savings</strong><br />${savings} <span className="text-xs">(20.0%)</span></div>
          <div><strong>Discretionary</strong><br />${discretionary} <span className="text-xs">(21.1%)</span></div>
        </div>

        <div className="mt-6 text-sm space-y-3">
          <div>
            <span className="font-semibold text-indigo-500">⚠️ Recommendation:</span> High inflation rate detected. Focus on fixed-rate contracts and building an emergency fund.
          </div>
          <div>
            <span className="font-semibold text-green-500">💡 Savings Opportunity:</span> Housing costs exceed 30% of income. Consider finding a roommate or exploring nearby neighborhoods.
          </div>
          <div>
            <span className="font-semibold text-purple-500">📍 Alternative Cities:</span> Toronto – More affordable housing market.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialInsights;
