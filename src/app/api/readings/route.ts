import { NextResponse } from 'next/server'

import { createReading } from '@/server/services/ReadingsService'
import type { ReadingRequestValue } from '@/server/types'

export async function POST(request: Request) {
  const readingValue = (await request.json()) as ReadingRequestValue

  try {
    const reading = await createReading(readingValue)
    return NextResponse.json({ message: 'Glicemia salva!', data: reading }, {
      status: 201,
    })
  } catch (error) {
    console.error('Erro ao criar glicemia', error)
    const message =
      error instanceof Error ? error.message : 'Erro ao criar glicemia'
    const status =
      message === 'Horário de refeição não encontrado' ? 400 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
