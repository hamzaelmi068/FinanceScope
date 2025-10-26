import React, { useState, useEffect } from 'react';
import { Target, Calculator, TrendingUp, Calendar, DollarSign, PiggyBank, Plus, Trash2 } from 'lucide-react';
import { CityData } from '../types/city';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

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

  // Load goals from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem('financialGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save goals to localStorage
  useEffect(() => {
    localStorage.setItem('financialGoals', JSON.stringify(goals));
  }, [goals]);

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
      toast.success('Goal added successfully!');
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast.success('Goal deleted');
  };

  const updateGoalProgress = (id: string, newAmount: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, currentAmount: newAmount } : goal
    ));
    toast.success('Progress updated!');
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
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
        </motion.div>
      </div>

      {/* Add Goal Button */}
      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 mx-auto"
        >
          <Plus className="h-5 w-5" />
          Add New Goal
        </motion.button>
      </div>

      {/* Add Goal Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addGoal}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                Add Goal
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goals List */}
      <div className="space-y-4">
        <AnimatePresence>
          {goals.map((goal, index) => {
            const progress = getGoalProgress(goal);
            const monthsToGoal = calculateTimeToGoal(goal);
            const categoryInfo = categories.find(cat => cat.value === goal.category);
            
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{categoryInfo?.icon}</span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{categoryInfo?.label}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                      <motion.div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: 0.5 }}
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

                {/* Progress Update */}
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Update progress..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const value = Number((e.target as HTMLInputElement).value);
                        if (value >= 0) {
                          updateGoalProgress(goal.id, value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.querySelector(`input[placeholder="Update progress..."]`) as HTMLInputElement;
                      const value = Number(input.value);
                      if (value >= 0) {
                        updateGoalProgress(goal.id, value);
                        input.value = '';
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Update
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {goals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Goals Yet</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Start by adding your first financial goal to begin planning your future!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}