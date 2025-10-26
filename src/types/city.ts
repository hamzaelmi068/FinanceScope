export interface CityData {
  id: string;
  name: string;
  country: string;
  costOfLiving: {
    rent: {
      oneBedroom: number;
      threeBedroom: number;
    };
    utilities: number;
    groceries: number;
    transportation: number;
  };
  salary: {
    median: number;
    required: number;
    industries: {
      tech: number;
      finance: number;
      healthcare: number;
    };
  };
  economics: {
    inflation: number;
    costGrowth: number;
    unemploymentRate: number;
  };
}

export interface BudgetAdvice {
  summary: string;
  monthlyBudget: {
    housing: number;
    utilities: number;
    groceries: number;
    transportation: number;
    savings: number;
    discretionary: number;
  };
  recommendations: string[];
  savingsOpportunities: string[];
  alternativeCities?: string[];
}