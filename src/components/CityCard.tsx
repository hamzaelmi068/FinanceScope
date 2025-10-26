import React from 'react';
import { Home, Bus, ShoppingCart, Music, TrendingUp, MapPin, DollarSign } from 'lucide-react';
import { CityData } from '../types/city';
import { motion } from 'framer-motion';
import { componentStyles } from '../utils/designSystem';

interface CityCardProps {
  data: CityData;
  isDarkMode: boolean;
  isComparison?: boolean;
}

export function CityCard({ data, isDarkMode, isComparison = false }: CityCardProps) {
  const sectionBg = isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50';
  const borderColor = isComparison ? 'border-blue-200 dark:border-blue-700' : 'border-gray-200 dark:border-gray-700';

  const costItems = [
    {
      icon: Home,
      label: 'Average Rent (1BR)',
      value: `$${data.costOfLiving.rent.oneBedroom.toLocaleString()}`,
      color: 'text-green-500 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      trend: '+5.2%'
    },
    {
      icon: Bus,
      label: 'Public Transport',
      value: `$${data.costOfLiving.transportation.toLocaleString()}`,
      color: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      trend: '+2.1%'
    },
    {
      icon: ShoppingCart,
      label: 'Groceries',
      value: `$${data.costOfLiving.groceries.toLocaleString()}`,
      color: 'text-yellow-500 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      trend: '+3.8%'
    },
    {
      icon: Music,
      label: 'Entertainment',
      value: `$${(data.costOfLiving.groceries * 0.6).toLocaleString()}`,
      color: 'text-pink-500 dark:text-pink-400',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      trend: '+1.5%'
    }
  ];

  const totalMonthlyCost = 
    data.costOfLiving.rent.oneBedroom + 
    data.costOfLiving.transportation + 
    data.costOfLiving.groceries + 
    (data.costOfLiving.groceries * 0.6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${componentStyles.card.base} ${componentStyles.card.hover} p-6 space-y-6 border-2 ${borderColor} relative overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{data.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{data.country}</p>
          </div>
        </div>
        {isComparison && (
          <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
            Comparison
          </div>
        )}
      </div>

      {/* Total Monthly Cost Summary */}
      <div className={`p-4 rounded-xl ${sectionBg} border-l-4 border-blue-500`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Total Monthly Cost</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ${totalMonthlyCost.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {costItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 rounded-xl ${item.bgColor} hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex items-center gap-3 mb-2">
              <item.icon className={`h-5 w-5 ${item.color}`} />
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{item.label}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
              <span className="text-xs text-gray-500 dark:text-gray-400">{item.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Salary Information */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Median Salary</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              ${data.salary.median.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Required: ${data.salary.required.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Economic Indicators */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Inflation</p>
          <p className="text-sm font-semibold text-orange-500">{data.economics.inflation}%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Cost Growth</p>
          <p className="text-sm font-semibold text-red-500">+{data.economics.costGrowth}%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Unemployment</p>
          <p className="text-sm font-semibold text-blue-500">{data.economics.unemploymentRate}%</p>
        </div>
      </div>
    </motion.div>
  );
}
