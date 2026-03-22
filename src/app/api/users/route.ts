import { NextResponse } from 'next/server'

import { mealSchedulesDefault } from '@/server/db/mealSchedulesDefault'
import { createMealSchedule } from '@/server/services/MealSchedulesService'
import { createUser } from '@/server/services/UsersService'
import type { User } from '@/server/types'

export async function POST(request: Request) {
  const user = (await request.json()) as User

  try {
    const newUser = await createUser(user)
    const userId = newUser.id
    await createMealSchedule({
      userId,
      schedules: mealSchedulesDefault,
    })
    return NextResponse.json(
      { message: 'Usuário criado com sucesso', data: newUser },
      { status: 201 },
    )
  } catch (error) {
    console.error('Erro ao criar usuário', error)
    return NextResponse.json(
      { error: 'Erro ao criar usuário', message: String(error) },
      { status: 500 },
    )
  }
}
