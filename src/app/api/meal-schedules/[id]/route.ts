import { NextResponse } from 'next/server'

import {
  getMealSchedules,
  updateMealSchedule,
} from '@/server/services/MealSchedulesService'
import type { MealSchedule } from '@/server/types'

type RouteParams = { params: Promise<{ id: string }> }

/** GET: `id` é o userId. PUT: `id` é o id do registro de horário. */
export async function GET(_request: Request, { params }: RouteParams) {
  const { id: userId } = await params

  try {
    const mealSchedules = await getMealSchedules(userId)
    return NextResponse.json({
      message: 'Horários encontrados com sucesso',
      data: mealSchedules,
    })
  } catch (error) {
    console.error('Erro ao buscar horários', error)
    return NextResponse.json(
      { error: 'Erro ao buscar horários', message: String(error) },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request, _context: RouteParams) {
  const mealSchedule = (await request.json()) as MealSchedule

  try {
    const mealScheduleUpdated = await updateMealSchedule(mealSchedule)
    return NextResponse.json({
      message: 'Horário atualizado com sucesso',
      data: mealScheduleUpdated,
    })
  } catch (error) {
    console.error('Erro ao atualizar horário', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar horário', message: String(error) },
      { status: 500 },
    )
  }
}
