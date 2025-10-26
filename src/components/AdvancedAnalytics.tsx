import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, BarChart3, Target } from 'lucide-react';
import { CityData } from '../types/city';
import { motion } from 'framer-motion';

interface AdvancedAnalyticsProps {
  primaryCity: CityData;
  comparisonCity?: CityData;
  salary: number;
}

export function AdvancedAnalytics({ primaryCity, comparisonCity, salary }: AdvancedAnalyticsProps) {
  const monthlyIncome = salary / 12;
  
  // Prepare data for charts
  const costComparisonData = [
    {
      category: 'Rent',
      primary: primaryCity.costOfLiving.rent.oneBedroom,
      comparison: comparisonCity?.costOfLiving.rent.oneBedroom || 0,
      primaryLabel: primaryCity.name,
      comparisonLabel: comparisonCity?.name || 'N/A'
    },
    {
      category: 'Transport',
      primary: primaryCity.costOfLiving.transportation,
      comparison: comparisonCity?.costOfLiving.transportation || 0,
      primaryLabel: primaryCity.name,
      comparisonLabel: comparisonCity?.name || 'N/A'
    },
    {
      category: 'Groceries',
      primary: primaryCity.costOfLiving.groceries,
      comparison: comparisonCity?.costOfLiving.groceries || 0,
      primaryLabel: primaryCity.name,
      comparisonLabel: comparisonCity?.name || 'N/A'
    },
    {
      category: 'Utilities',
      primary: primaryCity.costOfLiving.utilities,
      comparison: comparisonCity?.costOfLiving.utilities || 0,
      primaryLabel: primaryCity.name,
      comparisonLabel: comparisonCity?.name || 'N/A'
    }
  ];

  const budgetBreakdownData = [
    { name: 'Housing', value: primaryCity.costOfLiving.rent.oneBedroom, color: '#ef4444' },
    { name: 'Transport', value: primaryCity.costOfLiving.transportation, color: '#3b82f6' },
    { name: 'Groceries', value: primaryCity.costOfLiving.groceries, color: '#f59e0b' },
    { name: 'Utilities', value: primaryCity.costOfLiving.utilities, color: '#8b5cf6' },
    { name: 'Entertainment', value: primaryCity.costOfLiving.groceries * 0.6, color: '#ec4899' },
    { name: 'Savings', value: Math.max(0, monthlyIncome - (primaryCity.costOfLiving.rent.oneBedroom + primaryCity.costOfLiving.transportation + primaryCity.costOfLiving.groceries + primaryCity.costOfLiving.utilities + primaryCity.costOfLiving.groceries * 0.6)), color: '#10b981' }
  ];

  const salaryTrendData = [
    { year: '2020', median: primaryCity.salary.median * 0.85, required: primaryCity.salary.required * 0.85 },
    { year: '2021', median: primaryCity.salary.median * 0.92, required: primaryCity.salary.required * 0.92 },
    { year: '2022', median: primaryCity.salary.median * 0.96, required: primaryCity.salary.required * 0.96 },
    { year: '2023', median: primaryCity.salary.median, required: primaryCity.salary.required },
    { year: '2024', median: primaryCity.salary.median * 1.05, required: primaryCity.salary.required * 1.05 }
  ];

  const COLORS = ['#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#10b981'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📊 Advanced Analytics Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive data visualization and insights for {primaryCity.name}
          {comparisonCity && ` vs ${comparisonCity.name}`}
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Cost Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-6 w-6 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Cost Comparison Analysis
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#f9fafb', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="primary" fill="#3b82f6" name={primaryCity.name} />
              {comparisonCity && (
                <Bar dataKey="comparison" fill="#ef4444" name={comparisonCity.name} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Budget Breakdown Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-2 mb-6">
            <PieChartIcon className="h-6 w-6 text-purple-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Monthly Budget Breakdown
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {budgetBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#f9fafb', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Salary Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Salary Trends & Projections
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salaryTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#f9fafb', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="median" 
                stackId="1" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.6}
                name="Median Salary"
              />
              <Area 
                type="monotone" 
                dataKey="required" 
                stackId="2" 
                stroke="#ef4444" 
                fill="#ef4444" 
                fillOpacity={0.6}
                name="Required Salary"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Financial Health Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-6 w-6 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Financial Health Indicators
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2">
                <span className="text-2xl">💰</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Monthly Income</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">
                ${monthlyIncome.toLocaleString()}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                <span className="text-2xl">🏠</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Housing Ratio</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {((primaryCity.costOfLiving.rent.oneBedroom / monthlyIncome) * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-2">
                <span className="text-2xl">📈</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Savings Rate</p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {Math.max(0, ((monthlyIncome - (primaryCity.costOfLiving.rent.oneBedroom + primaryCity.costOfLiving.transportation + primaryCity.costOfLiving.groceries + primaryCity.costOfLiving.utilities)) / monthlyIncome) * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-2">
                <span className="text-2xl">⚡</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Cost Growth</p>
              <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                +{primaryCity.economics.costGrowth}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
