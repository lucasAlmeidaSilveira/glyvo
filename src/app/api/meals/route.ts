import { NextResponse } from 'next/server'

import { getMeals } from '@/server/services/MealsService'

export async function GET() {
  try {
    const meals = await getMeals()
    return NextResponse.json({
      message: 'Refeições encontradas com sucesso',
      data: meals,
    })
  } catch (error) {
    console.error('Erro ao buscar refeições', error)
    return NextResponse.json(
      { error: 'Erro ao buscar refeições' },
      { status: 500 },
    )
  }
}
