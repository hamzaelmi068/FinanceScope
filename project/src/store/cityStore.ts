import { create } from 'zustand';
import { CityData } from '../types/city';

// Sample data - in a real app, this would come from an API
const cityData: CityData[] = [
  {
    id: 'nyc',
    name: 'New York',
    country: 'United States',
    costOfLiving: {
      rent: {
        oneBedroom: 2800,
        threeBedroom: 4500
      },
      utilities: 150,
      groceries: 600,
      transportation: 130
    },
    salary: {
      median: 85000,
      required: 95000,
      industries: {
        tech: 120000,
        finance: 150000,
        healthcare: 90000
      }
    },
    economics: {
      inflation: 3.2,
      costGrowth: 5.8,
      unemploymentRate: 4.2
    }
  },
  {
    id: 'sf',
    name: 'San Francisco',
    country: 'United States',
    costOfLiving: {
      rent: {
        oneBedroom: 3200,
        threeBedroom: 5200
      },
      utilities: 180,
      groceries: 650,
      transportation: 100
    },
    salary: {
      median: 112000,
      required: 130000,
      industries: {
        tech: 160000,
        finance: 140000,
        healthcare: 95000
      }
    },
    economics: {
      inflation: 3.5,
      costGrowth: 6.2,
      unemploymentRate: 3.8
    }
  },
  {
    id: 'ldn',
    name: 'London',
    country: 'United Kingdom',
    costOfLiving: {
      rent: {
        oneBedroom: 2500,
        threeBedroom: 4000
      },
      utilities: 200,
      groceries: 500,
      transportation: 150
    },
    salary: {
      median: 75000,
      required: 85000,
      industries: {
        tech: 95000,
        finance: 120000,
        healthcare: 70000
      }
    },
    economics: {
      inflation: 2.8,
      costGrowth: 4.5,
      unemploymentRate: 4.5
    }
  },
  {
    id: 'tor',
    name: 'Toronto',
    country: 'Canada',
    costOfLiving: {
      rent: {
        oneBedroom: 2200,
        threeBedroom: 3800
      },
      utilities: 160,
      groceries: 550,
      transportation: 140
    },
    salary: {
      median: 80000,
      required: 90000,
      industries: {
        tech: 110000,
        finance: 130000,
        healthcare: 85000
      }
    },
    economics: {
      inflation: 3.1,
      costGrowth: 5.2,
      unemploymentRate: 4.0
    }
  }
];

interface CityStore {
  cities: CityData[];
  selectedCity: string;
  comparisonCity: string | null;
  userSalary: number;
  setUserSalary: (salary: number) => void;
  setSelectedCity: (city: string) => void;
  setComparisonCity: (city: string | null) => void;
  getSelectedCityData: () => CityData | undefined;
  getComparisonCityData: () => CityData | undefined;
}

export const useCityStore = create<CityStore>((set, get) => ({
  cities: cityData,
  selectedCity: 'nyc',
  comparisonCity: null,
  userSalary: 75000,
  setUserSalary: (salary) => set({ userSalary: salary }),
  setSelectedCity: (city) => set({ selectedCity: city }),
  setComparisonCity: (city) => set({ comparisonCity: city }),
  getSelectedCityData: () => get().cities.find(city => city.id === get().selectedCity),
  getComparisonCityData: () => get().comparisonCity ? get().cities.find(city => city.id === get().comparisonCity) : undefined
}));