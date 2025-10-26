import React from 'react';
import { PiggyBank, TrendingDown, MapPin, Lightbulb, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import { CityData } from '../types/city';
import { analyzeBudget } from '../utils/budgetAnalyzer';
import { motion } from 'framer-motion';
import { componentStyles } from '../utils/designSystem';

interface BudgetAdviceProps {
  cityData: CityData;
  salary: number;
  isDarkMode: boolean;
}

export function BudgetAdvice({ cityData, salary }: BudgetAdviceProps) {
  const monthlyIncome = salary / 12;
  const totalMonthlyExpenses = 
    cityData.costOfLiving.rent.oneBedroom +
    cityData.costOfLiving.utilities +
    cityData.costOfLiving.groceries +
    cityData.costOfLiving.transportation;

  const remainingIncome = monthlyIncome - totalMonthlyExpenses;
  const savingsRate = (remainingIncome / monthlyIncome) * 100;
  const housingRatio = (cityData.costOfLiving.rent.oneBedroom / monthlyIncome) * 100;

  const getFinancialHealthColor = (rate: number) => {
    if (rate >= 20) return 'text-green-600 dark:text-green-400';
    if (rate >= 10) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getFinancialHealthIcon = (rate: number) => {
    if (rate >= 20) return '🟢';
    if (rate >= 10) return '🟡';
    return '🔴';
  };

  const getRecommendationIcon = (type: 'success' | 'warning' | 'error') => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const recommendations = [
    {
      type: housingRatio <= 30 ? 'success' : housingRatio <= 40 ? 'warning' : 'error',
      title: housingRatio <= 30 ? 'Great Housing Budget!' : housingRatio <= 40 ? 'Housing Budget Alert' : 'Housing Budget Critical',
      message: housingRatio <= 30 
        ? 'Your housing costs are well within the recommended 30% of income.'
        : housingRatio <= 40 
        ? 'Your housing costs are approaching the 30% threshold. Consider roommates or alternative neighborhoods.'
        : 'Your housing costs exceed 40% of income. This significantly impacts your financial flexibility.',
      action: housingRatio > 30 ? 'Consider finding a roommate or exploring nearby neighborhoods.' : null
    },
    {
      type: savingsRate >= 20 ? 'success' : savingsRate >= 10 ? 'warning' : 'error',
      title: savingsRate >= 20 ? 'Excellent Savings Rate!' : savingsRate >= 10 ? 'Moderate Savings Rate' : 'Low Savings Rate',
      message: savingsRate >= 20 
        ? 'You\'re saving more than the recommended 20% of your income.'
        : savingsRate >= 10 
        ? 'You have a moderate savings rate. Consider increasing it to 20% for better financial security.'
        : 'Your savings rate is below recommended levels. Focus on reducing expenses or increasing income.',
      action: savingsRate < 20 ? 'Aim to save at least 20% of your monthly income.' : null
    },
    {
      type: cityData.economics.inflation <= 3 ? 'success' : cityData.economics.inflation <= 5 ? 'warning' : 'error',
      title: cityData.economics.inflation <= 3 ? 'Stable Economy' : cityData.economics.inflation <= 5 ? 'Moderate Inflation' : 'High Inflation Environment',
      message: cityData.economics.inflation <= 3 
        ? 'The local economy shows stable inflation rates.'
        : cityData.economics.inflation <= 5 
        ? 'Moderate inflation detected. Monitor your expenses closely.'
        : 'High inflation environment. Prioritize fixed-rate contracts and emergency savings.',
      action: cityData.economics.inflation > 3 ? 'Focus on fixed-rate contracts and building an emergency fund.' : null
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${componentStyles.card.base} ${componentStyles.card.hover} p-6 space-y-8`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
          <PiggyBank className="h-6 w-6 text-pink-600 dark:text-pink-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Insights</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Personalized analysis for {cityData.name}, {cityData.country}
          </p>
        </div>
      </div>

      {/* Financial Health Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Financial Health Score</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">{getFinancialHealthIcon(savingsRate)}</div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Savings Rate</p>
            <p className={`text-2xl font-bold ${getFinancialHealthColor(savingsRate)}`}>
              {savingsRate.toFixed(1)}%
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl mb-2">{getFinancialHealthIcon(100 - housingRatio)}</div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Housing Budget</p>
            <p className={`text-2xl font-bold ${getFinancialHealthColor(100 - housingRatio)}`}>
              {housingRatio.toFixed(1)}%
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl mb-2">{remainingIncome >= 0 ? '🟢' : '🔴'}</div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Monthly Remaining</p>
            <p className={`text-2xl font-bold ${remainingIncome >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              ${remainingIncome.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Budget Breakdown */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-blue-500" />
          Monthly Budget Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-700"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Estimated Monthly Income</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">${monthlyIncome.toLocaleString()}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-700"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Rent & Utilities</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              ${(cityData.costOfLiving.rent.oneBedroom + cityData.costOfLiving.utilities).toLocaleString()}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Transportation</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${cityData.costOfLiving.transportation.toLocaleString()}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Groceries & Essentials</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">${cityData.costOfLiving.groceries.toLocaleString()}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-700"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Entertainment</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ${(cityData.costOfLiving.groceries * 0.6).toLocaleString()}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Remaining/Savings</p>
            <p className={`text-2xl font-bold ${remainingIncome >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              ${remainingIncome.toLocaleString()}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Personalized Recommendations
        </h3>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className={`p-4 rounded-xl border-l-4 ${
                rec.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-500' :
                rec.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500' :
                'bg-red-50 dark:bg-red-900/20 border-red-500'
              }`}
            >
              <div className="flex items-start gap-3">
                {getRecommendationIcon(rec.type)}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{rec.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{rec.message}</p>
                  {rec.action && (
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      💡 {rec.action}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Data Source */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="h-4 w-4" />
          <span>Data based on latest averages for {cityData.name}, {cityData.country}</span>
      </div>
    </div>
    </motion.div>
  );
}
