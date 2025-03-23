import { CityData, BudgetAdvice } from '../types/city';

export function analyzeBudget(city: CityData, salary: number): BudgetAdvice {
  const monthlyIncome = salary / 12;
  const totalMonthlyExpenses = 
    city.costOfLiving.rent.oneBedroom +
    city.costOfLiving.utilities +
    city.costOfLiving.groceries +
    city.costOfLiving.transportation;

  const recommendations: string[] = [];
  const savingsOpportunities: string[] = [];
  const alternativeCities: string[] = [];

  // Calculate recommended budget allocation
  const housing = city.costOfLiving.rent.oneBedroom;
  const utilities = city.costOfLiving.utilities;
  const groceries = city.costOfLiving.groceries;
  const transportation = city.costOfLiving.transportation;
  const savings = monthlyIncome * 0.2; // 20% recommended savings
  const discretionary = monthlyIncome - (housing + utilities + groceries + transportation + savings);

  // Generate recommendations based on financial situation
  if (monthlyIncome < totalMonthlyExpenses + savings) {
    recommendations.push("Your current income might be stretched thin in this city.");
    recommendations.push("Consider exploring remote work opportunities or roles in higher-paying industries.");
  }

  if (housing / monthlyIncome > 0.3) {
    savingsOpportunities.push("Your housing costs exceed 30% of income. Consider finding a roommate or exploring nearby neighborhoods.");
  }

  if (city.economics.inflation > 3) {
    recommendations.push("High inflation rate detected. Focus on fixed-rate contracts and building an emergency fund.");
  }

  // Determine if there are more affordable alternatives
  if (city.costOfLiving.rent.oneBedroom > monthlyIncome * 0.4) {
    if (city.id === 'nyc') alternativeCities.push('Toronto');
    if (city.id === 'sf') alternativeCities.push('New York');
  }

  return {
    summary: `Based on your ${salary.toLocaleString()} salary in ${city.name}, you have ${discretionary > 0 ? 'some' : 'limited'} financial flexibility.`,
    monthlyBudget: {
      housing,
      utilities,
      groceries,
      transportation,
      savings,
      discretionary
    },
    recommendations,
    savingsOpportunities,
    alternativeCities: alternativeCities.length > 0 ? alternativeCities : undefined
  };
}