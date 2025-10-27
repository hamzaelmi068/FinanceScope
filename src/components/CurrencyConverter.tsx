import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, DollarSign, Euro, PoundSterling, RefreshCw, TrendingUp } from 'lucide-react';
import { CityData } from '../types/city';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface CurrencyConverterProps {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

interface ExchangeRates {
  [key: string]: number;
}

export function CurrencyConverter({ amount, fromCurrency, toCurrency }: CurrencyConverterProps) {
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedFromCurrency, setSelectedFromCurrency] = useState(fromCurrency);
  const [selectedToCurrency, setSelectedToCurrency] = useState(toCurrency);
  const [inputAmount, setInputAmount] = useState(amount);

  const currencies = [
    { code: 'USD', name: 'US Dollar', icon: DollarSign, symbol: '$' },
    { code: 'EUR', name: 'Euro', icon: Euro, symbol: '€' },
    { code: 'GBP', name: 'British Pound', icon: PoundSterling, symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', icon: DollarSign, symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', icon: DollarSign, symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', icon: DollarSign, symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', icon: DollarSign, symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', icon: DollarSign, symbol: '¥' }
  ];

  const fetchExchangeRates = async () => {
    try {
      setLoading(true);
      // Using a free API for demo purposes
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setRates(data.rates);
      setLastUpdated(new Date());
      toast.success('Exchange rates updated!');
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      // Fallback rates for demo
      setRates({
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110,
        CAD: 1.25,
        AUD: 1.35,
        CHF: 0.92,
        CNY: 6.45
      });
      setLastUpdated(new Date());
      toast.error('Using fallback rates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
    // Refresh rates every 5 minutes
    const interval = setInterval(fetchExchangeRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const convertAmount = (amount: number, from: string, to: string): number => {
    if (!rates[from] || !rates[to]) return amount;
    const usdAmount = amount / rates[from];
    return usdAmount * rates[to];
  };

  const convertedAmount = convertAmount(inputAmount, selectedFromCurrency, selectedToCurrency);
  const fromCurrencyInfo = currencies.find(c => c.code === selectedFromCurrency);
  const toCurrencyInfo = currencies.find(c => c.code === selectedToCurrency);

  const swapCurrencies = () => {
    setSelectedFromCurrency(selectedToCurrency);
    setSelectedToCurrency(selectedFromCurrency);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-6 w-6 text-blue-500" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Currency Converter
          </h3>
        </div>
        <button
          onClick={fetchExchangeRates}
          disabled={loading}
          className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 text-blue-600 dark:text-blue-400 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* From Currency */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              From
            </label>
            <div className="flex gap-2">
              <select
                value={selectedFromCurrency}
                onChange={(e) => setSelectedFromCurrency(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={inputAmount}
                onChange={(e) => setInputAmount(Number(e.target.value))}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* To Currency */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              To
            </label>
            <div className="flex gap-2">
              <select
                value={selectedToCurrency}
                onChange={(e) => setSelectedToCurrency(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code}
                  </option>
                ))}
              </select>
              <div className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white">
                {convertedAmount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={swapCurrencies}
            className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          >
            <ArrowRightLeft className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </motion.button>
        </div>

        {/* Conversion Display */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                {fromCurrencyInfo && <fromCurrencyInfo.icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />}
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {fromCurrencyInfo?.symbol} {inputAmount.toLocaleString()}
                </span>
              </div>
              <ArrowRightLeft className="h-5 w-5 text-gray-400" />
              <div className="flex items-center gap-2">
                {toCurrencyInfo && <toCurrencyInfo.icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />}
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {toCurrencyInfo?.symbol} {convertedAmount.toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              1 {selectedFromCurrency} = {(rates[selectedToCurrency] / rates[selectedFromCurrency]).toFixed(4)} {selectedToCurrency}
            </p>
          </div>
        </div>

        {/* Last Updated */}
        {lastUpdated && (
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        )}

        {/* Currency Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {currencies.map((currency) => (
            <motion.div
              key={currency.code}
              whileHover={{ scale: 1.05 }}
              className={`p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                selectedFromCurrency === currency.code || selectedToCurrency === currency.code
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => {
                if (selectedFromCurrency === currency.code) {
                  setSelectedToCurrency(currency.code);
                } else if (selectedToCurrency === currency.code) {
                  setSelectedFromCurrency(currency.code);
                } else {
                  setSelectedFromCurrency(currency.code);
                }
              }}
            >
              <div className="flex items-center gap-2">
                <currency.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {currency.code}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {currency.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced City Cost Converter
interface CityCostConverterProps {
  cityData: CityData;
  salary: number;
}

export function CityCostConverter({ cityData, salary }: CityCostConverterProps) {
  const [targetCurrency, setTargetCurrency] = useState('USD');
  
  const monthlyIncome = salary / 12;
  const costs = [
    { name: 'Monthly Income', amount: monthlyIncome },
    { name: 'Rent (1BR)', amount: cityData.costOfLiving.rent.oneBedroom },
    { name: 'Transportation', amount: cityData.costOfLiving.transportation },
    { name: 'Groceries', amount: cityData.costOfLiving.groceries },
    { name: 'Utilities', amount: cityData.costOfLiving.utilities }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          💱 Convert Costs to Different Currencies
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          See how your {cityData.name} costs translate to other currencies
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CurrencyConverter 
          amount={monthlyIncome} 
          fromCurrency="USD" 
          toCurrency={targetCurrency} 
        />
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Cost Breakdown in {targetCurrency}
          </h4>
          <div className="space-y-3">
            {costs.map((cost, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {cost.name}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  ${cost.amount.toLocaleString()}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}