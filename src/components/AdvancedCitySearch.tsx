import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, TrendingUp, TrendingDown, DollarSign, Users, Building, Star } from 'lucide-react';
import { CityData } from '../types/city';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvancedCitySearchProps {
  cities: CityData[];
  onCitySelect: (city: CityData) => void;
  selectedCity?: CityData;
}

interface FilterOptions {
  searchTerm: string;
  sortBy: 'name' | 'cost' | 'salary' | 'inflation';
  sortOrder: 'asc' | 'desc';
  costRange: [number, number];
  salaryRange: [number, number];
  continent: string;
  showOnlyAffordable: boolean;
  showOnlyPopular: boolean;
}

export function AdvancedCitySearch({ cities, onCitySelect, selectedCity }: AdvancedCitySearchProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    sortBy: 'name',
    sortOrder: 'asc',
    costRange: [0, 10000],
    salaryRange: [0, 200000],
    continent: 'all',
    showOnlyAffordable: false,
    showOnlyPopular: false
  });

  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const continents = [
    { value: 'all', label: 'All Continents' },
    { value: 'North America', label: 'North America' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Asia', label: 'Asia' },
    { value: 'South America', label: 'South America' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Oceania', label: 'Oceania' }
  ];

  const filteredAndSortedCities = useMemo(() => {
    let filtered = cities.filter(city => {
      // Search filter
      const matchesSearch = city.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                          city.country.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      // Cost filter
      const totalCost = city.costOfLiving.rent.oneBedroom + city.costOfLiving.transportation + 
                       city.costOfLiving.groceries + city.costOfLiving.utilities;
      const matchesCost = totalCost >= filters.costRange[0] && totalCost <= filters.costRange[1];
      
      // Salary filter
      const matchesSalary = city.salary.median >= filters.salaryRange[0] && 
                           city.salary.median <= filters.salaryRange[1];
      
      // Continent filter
      const matchesContinent = filters.continent === 'all' || 
                              city.country.includes(filters.continent);
      
      // Affordability filter
      const isAffordable = !filters.showOnlyAffordable || 
                          (city.salary.median > totalCost * 12 * 0.3); // 30% rule
      
      // Popular cities filter (major cities)
      const isPopular = !filters.showOnlyPopular || 
                       ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Toronto', 'Berlin', 'Amsterdam'].includes(city.name);
      
      return matchesSearch && matchesCost && matchesSalary && matchesContinent && isAffordable && isPopular;
    });

    // Sort cities
    filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'cost':
          aValue = a.costOfLiving.rent.oneBedroom + a.costOfLiving.transportation + 
                  a.costOfLiving.groceries + a.costOfLiving.utilities;
          bValue = b.costOfLiving.rent.oneBedroom + b.costOfLiving.transportation + 
                  b.costOfLiving.groceries + b.costOfLiving.utilities;
          break;
        case 'salary':
          aValue = a.salary.median;
          bValue = b.salary.median;
          break;
        case 'inflation':
          aValue = a.economics.inflation;
          bValue = b.economics.inflation;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'asc' ? 
          aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return filters.sortOrder === 'asc' ? 
          (aValue as number) - (bValue as number) : 
          (bValue as number) - (aValue as number);
      }
    });

    return filtered;
  }, [cities, filters]);

  const getTotalCost = (city: CityData): number => {
    return city.costOfLiving.rent.oneBedroom + city.costOfLiving.transportation + 
           city.costOfLiving.groceries + city.costOfLiving.utilities;
  };

  const getAffordabilityScore = (city: CityData): number => {
    const totalCost = getTotalCost(city);
    const monthlySalary = city.salary.median / 12;
    return Math.min((monthlySalary / totalCost) * 100, 100);
  };

  const getAffordabilityColor = (score: number): string => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const toggleFavorite = (cityId: string) => {
    setFavorites(prev => 
      prev.includes(cityId) 
        ? prev.filter(id => id !== cityId)
        : [...prev, cityId]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Search and Filter Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search cities or countries..."
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <Filter className="h-5 w-5" />
            Filters
          </motion.button>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="name">Name</option>
                    <option value="cost">Total Cost</option>
                    <option value="salary">Median Salary</option>
                    <option value="inflation">Inflation Rate</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Order
                  </label>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>

                {/* Continent */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Continent
                  </label>
                  <select
                    value={filters.continent}
                    onChange={(e) => setFilters({ ...filters, continent: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {continents.map(continent => (
                      <option key={continent.value} value={continent.value}>
                        {continent.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quick Filters */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quick Filters
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={filters.showOnlyAffordable}
                        onChange={(e) => setFilters({ ...filters, showOnlyAffordable: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      Affordable Only
                    </label>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={filters.showOnlyPopular}
                        onChange={(e) => setFilters({ ...filters, showOnlyPopular: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      Popular Cities
                    </label>
                  </div>
                </div>
              </div>

              {/* Cost Range */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Cost Range: ${filters.costRange[0].toLocaleString()} - ${filters.costRange[1].toLocaleString()}
                </label>
                <div className="flex gap-4">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={filters.costRange[0]}
                    onChange={(e) => setFilters({ ...filters, costRange: [Number(e.target.value), filters.costRange[1]] })}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={filters.costRange[1]}
                    onChange={(e) => setFilters({ ...filters, costRange: [filters.costRange[0], Number(e.target.value)] })}
                    className="flex-1"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredAndSortedCities.length} of {cities.length} cities
        </p>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredAndSortedCities.map((city, index) => {
            const totalCost = getTotalCost(city);
            const affordabilityScore = getAffordabilityScore(city);
            const isSelected = selectedCity?.id === city.id;
            const isFavorite = favorites.includes(city.id);

            return (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onCitySelect(city)}
                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 ${
                  isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {/* City Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{city.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{city.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(city.id);
                      }}
                      className={`p-1 rounded-full transition-colors ${
                        isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <Star className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </motion.button>
                    <div className={`text-right ${getAffordabilityColor(affordabilityScore)}`}>
                      <p className="text-sm font-medium">{affordabilityScore.toFixed(0)}%</p>
                      <p className="text-xs">Affordable</p>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Rent (1BR)</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${city.costOfLiving.rent.oneBedroom.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Transport</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${city.costOfLiving.transportation.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Groceries</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${city.costOfLiving.groceries.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-gray-200 dark:border-gray-700 pt-2">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Total Monthly</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${totalCost.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Salary Info */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-400">Median Salary</span>
                  </div>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    ${city.salary.median.toLocaleString()}
                  </span>
                </div>

                {/* Economic Indicators */}
                <div className="flex justify-between items-center text-sm mt-2">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-600 dark:text-gray-400">Inflation</span>
                  </div>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    {city.economics.inflation}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredAndSortedCities.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Cities Found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your filters to see more results.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
