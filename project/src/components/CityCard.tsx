import React from 'react';
import { Home, TrendingUp, LineChart } from 'lucide-react';
import { CityData } from '../types/city';

interface CityCardProps {
  data: CityData;
  isDarkMode: boolean;
}

export function CityCard({ data, isDarkMode }: CityCardProps) {
  return (
    <div className="space-y-6">
      {/* Cost of Living Card */}
      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center mb-4">
          <Home className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h2 className="ml-2 text-xl font-semibold">Cost of Living in {data.name}</h2>
        </div>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className="text-sm text-gray-500">Average Rent (1BR)</p>
            <p className="text-2xl font-bold">${data.costOfLiving.rent.oneBedroom}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className="text-sm text-gray-500">Monthly Expenses</p>
            <p className="text-2xl font-bold">
              ${data.costOfLiving.utilities + data.costOfLiving.groceries + data.costOfLiving.transportation}
            </p>
          </div>
        </div>
      </div>

      {/* Salary Insights Card */}
      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center mb-4">
          <TrendingUp className={`h-6 w-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
          <h2 className="ml-2 text-xl font-semibold">Salary Insights</h2>
        </div>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className="text-sm text-gray-500">Median Salary</p>
            <p className="text-2xl font-bold">${data.salary.median.toLocaleString()}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className="text-sm text-gray-500">Required for Comfortable Living</p>
            <p className="text-2xl font-bold">${data.salary.required.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Economic Trends Card */}
      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center mb-4">
          <LineChart className={`h-6 w-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <h2 className="ml-2 text-xl font-semibold">Economic Trends</h2>
        </div>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className="text-sm text-gray-500">Inflation Rate</p>
            <p className="text-2xl font-bold">{data.economics.inflation}%</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className="text-sm text-gray-500">Cost Growth (YoY)</p>
            <p className="text-2xl font-bold">+{data.economics.costGrowth}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}