import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { CityData } from '../types/city';

interface DataVisualizationProps {
  primaryCity: CityData;
  comparisonCity?: CityData;
  salary: number;
  isDarkMode: boolean;
}

export function DataVisualization({ primaryCity, comparisonCity, salary, isDarkMode }: DataVisualizationProps) {
  const monthlyIncome = salary / 12;
  
  const primaryCosts = {
    rent: primaryCity.costOfLiving.rent.oneBedroom,
    transport: primaryCity.costOfLiving.transportation,
    groceries: primaryCity.costOfLiving.groceries,
    utilities: primaryCity.costOfLiving.utilities,
    entertainment: primaryCity.costOfLiving.groceries * 0.6,
  };

  const totalPrimaryCosts = Object.values(primaryCosts).reduce((sum, cost) => sum + cost, 0);
  const remainingIncome = monthlyIncome - totalPrimaryCosts;
  const savingsPercentage = (remainingIncome / monthlyIncome) * 100;

  const costBreakdown = [
    { name: 'Rent', value: primaryCosts.rent, color: '#ef4444', percentage: (primaryCosts.rent / monthlyIncome) * 100 },
    { name: 'Transport', value: primaryCosts.transport, color: '#3b82f6', percentage: (primaryCosts.transport / monthlyIncome) * 100 },
    { name: 'Groceries', value: primaryCosts.groceries, color: '#f59e0b', percentage: (primaryCosts.groceries / monthlyIncome) * 100 },
    { name: 'Utilities', value: primaryCosts.utilities, color: '#8b5cf6', percentage: (primaryCosts.utilities / monthlyIncome) * 100 },
    { name: 'Entertainment', value: primaryCosts.entertainment, color: '#ec4899', percentage: (primaryCosts.entertainment / monthlyIncome) * 100 },
  ];

  const comparisonData = comparisonCity ? {
    rent: comparisonCity.costOfLiving.rent.oneBedroom,
    transport: comparisonCity.costOfLiving.transportation,
    groceries: comparisonCity.costOfLiving.groceries,
    utilities: comparisonCity.costOfLiving.utilities,
    entertainment: comparisonCity.costOfLiving.groceries * 0.6,
  } : null;

  const totalComparisonCosts = comparisonData ? Object.values(comparisonData).reduce((sum, cost) => sum + cost, 0) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📊 Financial Analysis Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive insights for {primaryCity.name}
          {comparisonCity && ` vs ${comparisonCity.name}`}
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Monthly Income</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${monthlyIncome.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Expenses</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${totalPrimaryCosts.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Remaining</h3>
          </div>
          <p className={`text-2xl font-bold ${remainingIncome >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            ${remainingIncome.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <PieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Savings Rate</h3>
          </div>
          <p className={`text-2xl font-bold ${savingsPercentage >= 20 ? 'text-green-600 dark:text-green-400' : savingsPercentage >= 10 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
            {savingsPercentage.toFixed(1)}%
          </p>
        </motion.div>
      </div>

      {/* Cost Breakdown Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart Visualization */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-purple-500" />
            Monthly Budget Breakdown
          </h3>
          
          <div className="space-y-4">
            {costBreakdown.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${item.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.percentage.toFixed(1)}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Chart */}
        {comparisonCity && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              City Comparison
            </h3>
            
            <div className="space-y-4">
              {[
                { name: 'Rent', primary: primaryCosts.rent, comparison: comparisonData!.rent },
                { name: 'Transport', primary: primaryCosts.transport, comparison: comparisonData!.transport },
                { name: 'Groceries', primary: primaryCosts.groceries, comparison: comparisonData!.groceries },
                { name: 'Utilities', primary: primaryCosts.utilities, comparison: comparisonData!.utilities },
                { name: 'Entertainment', primary: primaryCosts.entertainment, comparison: comparisonData!.entertainment },
              ].map((item, index) => {
                const difference = item.comparison - item.primary;
                const percentageDiff = (difference / item.primary) * 100;
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.name}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        difference > 0 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                        {difference > 0 ? '+' : ''}${difference.toLocaleString()} ({percentageDiff > 0 ? '+' : ''}{percentageDiff.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((item.primary / Math.max(item.primary, item.comparison)) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((item.comparison / Math.max(item.primary, item.comparison)) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{primaryCity.name}: ${item.primary.toLocaleString()}</span>
                      <span>{comparisonCity.name}: ${item.comparison.toLocaleString()}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Financial Health Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          💡 Financial Health Assessment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 ${
              savingsPercentage >= 20 ? 'bg-green-100 dark:bg-green-900/30' : 
              savingsPercentage >= 10 ? 'bg-yellow-100 dark:bg-yellow-900/30' : 
              'bg-red-100 dark:bg-red-900/30'
            }`}>
              <span className={`text-2xl font-bold ${
                savingsPercentage >= 20 ? 'text-green-600 dark:text-green-400' : 
                savingsPercentage >= 10 ? 'text-yellow-600 dark:text-yellow-400' : 
                'text-red-600 dark:text-red-400'
              }`}>
                {savingsPercentage >= 20 ? '🟢' : savingsPercentage >= 10 ? '🟡' : '🔴'}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Savings Rate</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{savingsPercentage.toFixed(1)}%</p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 ${
              (primaryCosts.rent / monthlyIncome) <= 0.3 ? 'bg-green-100 dark:bg-green-900/30' : 
              (primaryCosts.rent / monthlyIncome) <= 0.4 ? 'bg-yellow-100 dark:bg-yellow-900/30' : 
              'bg-red-100 dark:bg-red-900/30'
            }`}>
              <span className={`text-2xl font-bold ${
                (primaryCosts.rent / monthlyIncome) <= 0.3 ? 'text-green-600 dark:text-green-400' : 
                (primaryCosts.rent / monthlyIncome) <= 0.4 ? 'text-yellow-600 dark:text-yellow-400' : 
                'text-red-600 dark:text-red-400'
              }`}>
                {(primaryCosts.rent / monthlyIncome) <= 0.3 ? '🟢' : (primaryCosts.rent / monthlyIncome) <= 0.4 ? '🟡' : '🔴'}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Housing Cost</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{((primaryCosts.rent / monthlyIncome) * 100).toFixed(1)}%</p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 ${
              remainingIncome >= monthlyIncome * 0.2 ? 'bg-green-100 dark:bg-green-900/30' : 
              remainingIncome >= monthlyIncome * 0.1 ? 'bg-yellow-100 dark:bg-yellow-900/30' : 
              'bg-red-100 dark:bg-red-900/30'
            }`}>
              <span className={`text-2xl font-bold ${
                remainingIncome >= monthlyIncome * 0.2 ? 'text-green-600 dark:text-green-400' : 
                remainingIncome >= monthlyIncome * 0.1 ? 'text-yellow-600 dark:text-yellow-400' : 
                'text-red-600 dark:text-red-400'
              }`}>
                {remainingIncome >= monthlyIncome * 0.2 ? '🟢' : remainingIncome >= monthlyIncome * 0.1 ? '🟡' : '🔴'}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Disposable Income</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">${remainingIncome.toLocaleString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
