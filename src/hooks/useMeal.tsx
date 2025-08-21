'use client';

import { MealProps } from '@/types/meals';
import { getMeals } from '@/api';
import { useEffect, useState } from 'react';

export function useMeal() {
  const [meals, setMeals] = useState<MealProps[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await getMeals();
      setMeals(response.data);
    };
    fetchMeals();
  }, []);

  return { meals };
}
