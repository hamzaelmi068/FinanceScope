import { create } from 'zustand';
import { CityData } from '../types/city';

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
  },
  {
    id: 'ber',
    name: 'Berlin',
    country: 'Germany',
    costOfLiving: {
      rent: {
        oneBedroom: 1200,
        threeBedroom: 2200
      },
      utilities: 200,
      groceries: 400,
      transportation: 90
    },
    salary: {
      median: 60000,
      required: 70000,
      industries: {
        tech: 80000,
        finance: 90000,
        healthcare: 65000
      }
    },
    economics: {
      inflation: 2.5,
      costGrowth: 3.8,
      unemploymentRate: 5.0
    }
  },
  {
    id: 'tok',
    name: 'Tokyo',
    country: 'Japan',
    costOfLiving: {
      rent: {
        oneBedroom: 1500,
        threeBedroom: 3000
      },
      utilities: 180,
      groceries: 500,
      transportation: 100
    },
    salary: {
      median: 70000,
      required: 80000,
      industries: {
        tech: 90000,
        finance: 100000,
        healthcare: 75000
      }
    },
    economics: {
      inflation: 1.8,
      costGrowth: 2.5,
      unemploymentRate: 2.9
    }
  },
  {
    id: 'syd',
    name: 'Sydney',
    country: 'Australia',
    costOfLiving: {
      rent: {
        oneBedroom: 2000,
        threeBedroom: 3500
      },
      utilities: 220,
      groceries: 550,
      transportation: 120
    },
    salary: {
      median: 85000,
      required: 95000,
      industries: {
        tech: 110000,
        finance: 120000,
        healthcare: 90000
      }
    },
    economics: {
      inflation: 2.9,
      costGrowth: 4.2,
      unemploymentRate: 4.1
    }
  },
  {
    id: 'par',
    name: 'Paris',
    country: 'France',
    costOfLiving: {
      rent: {
        oneBedroom: 1800,
        threeBedroom: 3200
      },
      utilities: 150,
      groceries: 450,
      transportation: 80
    },
    salary: {
      median: 65000,
      required: 75000,
      industries: {
        tech: 85000,
        finance: 100000,
        healthcare: 70000
      }
    },
    economics: {
      inflation: 2.2,
      costGrowth: 3.5,
      unemploymentRate: 7.0
    }
  },
  {
    id: 'sgp',
    name: 'Singapore',
    country: 'Singapore',
    costOfLiving: {
      rent: {
        oneBedroom: 2500,
        threeBedroom: 4500
      },
      utilities: 200,
      groceries: 600,
      transportation: 100
    },
    salary: {
      median: 90000,
      required: 100000,
      industries: {
        tech: 110000,
        finance: 130000,
        healthcare: 80000
      }
    },
    economics: {
      inflation: 1.5,
      costGrowth: 2.8,
      unemploymentRate: 2.0
    }
  },
  {
    id: 'hkg',
    name: 'Hong Kong',
    country: 'Hong Kong',
    costOfLiving: {
      rent: {
        oneBedroom: 3000,
        threeBedroom: 5000
      },
      utilities: 180,
      groceries: 550,
      transportation: 120
    },
    salary: {
      median: 80000,
      required: 90000,
      industries: {
        tech: 100000,
        finance: 120000,
        healthcare: 75000
      }
    },
    economics: {
      inflation: 2.0,
      costGrowth: 3.2,
      unemploymentRate: 3.5
    }
  },
  {
    id: 'dub',
    name: 'Dubai',
    country: 'United Arab Emirates',
    costOfLiving: {
      rent: {
        oneBedroom: 2200,
        threeBedroom: 4000
      },
      utilities: 150,
      groceries: 500,
      transportation: 100
    },
    salary: {
      median: 85000,
      required: 95000,
      industries: {
        tech: 100000,
        finance: 120000,
        healthcare: 80000
      }
    },
    economics: {
      inflation: 2.5,
      costGrowth: 4.0,
      unemploymentRate: 2.2
    }
  },
  {
    id: 'mum',
    name: 'Mumbai',
    country: 'India',
    costOfLiving: {
      rent: {
        oneBedroom: 500,
        threeBedroom: 1000
      },
      utilities: 50,
      groceries: 200,
      transportation: 30
    },
    salary: {
      median: 15000,
      required: 20000,
      industries: {
        tech: 25000,
        finance: 30000,
        healthcare: 18000
      }
    },
    economics: {
      inflation: 6.0,
      costGrowth: 7.5,
      unemploymentRate: 8.5
    }
  },
  {
    id: 'sao',
    name: 'São Paulo',
    country: 'Brazil',
    costOfLiving: {
      rent: {
        oneBedroom: 800,
        threeBedroom: 1500
      },
      utilities: 100,
      groceries: 300,
      transportation: 50
    },
    salary: {
      median: 20000,
      required: 25000,
      industries: {
        tech: 30000,
        finance: 35000,
        healthcare: 22000
      }
    },
    economics: {
      inflation: 5.5,
      costGrowth: 6.8,
      unemploymentRate: 12.0
    }
  },
  {
    id: 'mex',
    name: 'Mexico City',
    country: 'Mexico',
    costOfLiving: {
      rent: {
        oneBedroom: 700,
        threeBedroom: 1300
      },
      utilities: 80,
      groceries: 250,
      transportation: 40
    },
    salary: {
      median: 18000,
      required: 22000,
      industries: {
        tech: 25000,
        finance: 30000,
        healthcare: 20000
      }
    },
    economics: {
      inflation: 4.5,
      costGrowth: 5.5,
      unemploymentRate: 4.8
    }
  },
  {
    id: 'ist',
    name: 'Istanbul',
    country: 'Turkey',
    costOfLiving: {
      rent: {
        oneBedroom: 600,
        threeBedroom: 1200
      },
      utilities: 100,
      groceries: 200,
      transportation: 50
    },
    salary: {
      median: 15000,
      required: 18000,
      industries: {
        tech: 20000,
        finance: 25000,
        healthcare: 15000
      }
    },
    economics: {
      inflation: 15.0,
      costGrowth: 18.0,
      unemploymentRate: 10.5
    }
  },
  {
    id: 'jhb',
    name: 'Johannesburg',
    country: 'South Africa',
    costOfLiving: {
      rent: {
        oneBedroom: 500,
        threeBedroom: 1000
      },
      utilities: 80,
      groceries: 200,
      transportation: 40
    },
    salary: {
      median: 12000,
      required: 15000,
      industries: {
        tech: 18000,
        finance: 20000,
        healthcare: 12000
      }
    },
    economics: {
      inflation: 5.0,
      costGrowth: 6.5,
      unemploymentRate: 35.0
    }
  },
  {
    id: 'bkk',
    name: 'Bangkok',
    country: 'Thailand',
    costOfLiving: {
      rent: {
        oneBedroom: 600,
        threeBedroom: 1200
      },
      utilities: 100,
      groceries: 200,
      transportation: 50
    },
    salary: {
      median: 15000,
      required: 18000,
      industries: {
        tech: 20000,
        finance: 25000,
        healthcare: 15000
      }
    },
    economics: {
      inflation: 1.5,
      costGrowth: 2.5,
      unemploymentRate: 2.0
    }
  },
  {
    id: 'nbo',
    name: 'Nairobi',
    country: 'Kenya',
    costOfLiving: {
      rent: {
        oneBedroom: 400,
        threeBedroom: 800
      },
      utilities: 60,
      groceries: 150,
      transportation: 30
    },
    salary: {
      median: 10000,
      required: 12000,
      industries: {
        tech: 15000,
        finance: 18000,
        healthcare: 10000
      }
    },
    economics: {
      inflation: 6.5,
      costGrowth: 7.8,
      unemploymentRate: 40.0
    }
  },
  {
    id: 'bue',
    name: 'Buenos Aires',
    country: 'Argentina',
    costOfLiving: {
      rent: {
        oneBedroom: 300,
        threeBedroom: 600
      },
      utilities: 50,
      groceries: 150,
      transportation: 20
    },
    salary: {
      median: 10000,
      required: 12000,
      industries: {
        tech: 15000,
        finance: 18000,
        healthcare: 10000
      }
    },
    economics: {
      inflation: 50.0,
      costGrowth: 60.0,
      unemploymentRate: 10.0
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