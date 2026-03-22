import { NextResponse } from 'next/server'

import { createMealSchedule } from '@/server/services/MealSchedulesService'
import type { MealScheduleRequest } from '@/server/types'

export async function POST(request: Request) {
  const mealSchedule = (await request.json()) as MealScheduleRequest

  try {
    const mealScheduleCreated = await createMealSchedule(mealSchedule)
    return NextResponse.json(
      {
        message: 'Horário criado com sucesso',
        data: mealScheduleCreated,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Erro ao criar horário', error)
    return NextResponse.json(
      { error: 'Erro ao criar horário', message: String(error) },
      { status: 500 },
    )
  }
}
