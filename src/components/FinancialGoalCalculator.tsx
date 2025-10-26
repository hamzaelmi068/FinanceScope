import React, { useState, useEffect } from 'react';
import { Target, Calculator, TrendingUp, Calendar, DollarSign, PiggyBank } from 'lucide-react';
import { CityData } from '../types/city';

interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  monthlyContribution: number;
  category: 'emergency' | 'house' | 'car' | 'vacation' | 'retirement' | 'other';
}

interface FinancialGoalCalculatorProps {
  cityData: CityData;
  salary: number;
}

export function FinancialGoalCalculator({ cityData, salary }: FinancialGoalCalculatorProps) {
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [newGoal, setNewGoal] = useState<Partial<FinancialGoal>>({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    targetDate: '',
    monthlyContribution: 0,
    category: 'other'
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const monthlyIncome = salary / 12;
  const availableForGoals = monthlyIncome * 0.2; // 20% of income for goals

  const categories = [
    { value: 'emergency', label: 'Emergency Fund', icon: '🚨', color: 'red' },
    { value: 'house', label: 'House Down Payment', icon: '🏠', color: 'blue' },
    { value: 'car', label: 'Car Purchase', icon: '🚗', color: 'green' },
    { value: 'vacation', label: 'Vacation', icon: '✈️', color: 'purple' },
    { value: 'retirement', label: 'Retirement', icon: '👴', color: 'orange' },
    { value: 'other', label: 'Other', icon: '🎯', color: 'gray' }
  ];

  const addGoal = () => {
    if (newGoal.name && newGoal.targetAmount && newGoal.targetDate) {
      const goal: FinancialGoal = {
        id: Date.now().toString(),
        name: newGoal.name,
        targetAmount: newGoal.targetAmount || 0,
        currentAmount: newGoal.currentAmount || 0,
        targetDate: newGoal.targetDate,
        monthlyContribution: newGoal.monthlyContribution || 0,
        category: newGoal.category || 'other'
      };
      setGoals([...goals, goal]);
      setNewGoal({
        name: '',
        targetAmount: 0,
        currentAmount: 0,
        targetDate: '',
        monthlyContribution: 0,
        category: 'other'
      });
      setShowAddForm(false);
    }
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const calculateTimeToGoal = (goal: FinancialGoal): number => {
    const remaining = goal.targetAmount - goal.currentAmount;
    if (goal.monthlyContribution <= 0) return Infinity;
    return Math.ceil(remaining / goal.monthlyContribution);
  };

  const getGoalProgress = (goal: FinancialGoal): number => {
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  };

  const totalMonthlyContributions = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);
  const totalGoalsValue = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🎯 Financial Goal Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Plan and track your financial goals in {cityData.name}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Available for Goals</h3>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            ${availableForGoals.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Goals Value</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${totalGoalsValue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">target amount</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <PiggyBank className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Contributions</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            ${totalMonthlyContributions.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">committed monthly</p>
        </div>
      </div>

      {/* Add Goal Button */}
      <div className="text-center">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 mx-auto"
        >
          <Target className="h-5 w-5" />
          Add New Goal
        </button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Add New Financial Goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Goal Name
              </label>
              <input
                type="text"
                value={newGoal.name || ''}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Emergency Fund"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={newGoal.category || 'other'}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Amount ($)
              </label>
              <input
                type="number"
                value={newGoal.targetAmount || ''}
                onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Amount ($)
              </label>
              <input
                type="number"
                value={newGoal.currentAmount || ''}
                onChange={(e) => setNewGoal({ ...newGoal, currentAmount: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Monthly Contribution ($)
              </label>
              <input
                type="number"
                value={newGoal.monthlyContribution || ''}
                onChange={(e) => setNewGoal({ ...newGoal, monthlyContribution: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Date
              </label>
              <input
                type="date"
                value={newGoal.targetDate || ''}
                onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={addGoal}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Add Goal
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = getGoalProgress(goal);
          const monthsToGoal = calculateTimeToGoal(goal);
          const categoryInfo = categories.find(cat => cat.value === goal.category);
          
          return (
            <div key={goal.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{categoryInfo?.icon}</span>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{categoryInfo?.label}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{progress.toFixed(1)}% complete</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Contribution</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${goal.monthlyContribution.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time to Goal</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {monthsToGoal === Infinity ? '∞' : `${monthsToGoal} months`}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-12">
          <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Goals Yet</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Start by adding your first financial goal to begin planning your future!
          </p>
        </div>
      )}
    </div>
  );
}
