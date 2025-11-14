'use client'

import { useEffect, useState } from 'react'

import { getMeals } from '@/api'
import { MealProps } from '@/types/meals'

export function useMeal() {
  const [meals, setMeals] = useState<MealProps[]>([])

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await getMeals()
      setMeals(response.data)
    }
    fetchMeals()
  }, [])

  return { meals }
}
