import { NextResponse } from 'next/server'

import {
  deleteReading,
  getReadings,
  updateReading,
} from '@/server/services/ReadingsService'
import type { ReadingUpdateProps } from '@/server/types'

type RouteParams = { params: Promise<{ id: string }> }

/** GET: `id` é o userId (UUID). PUT/DELETE: `id` é o id numérico da leitura. */
export async function GET(_request: Request, { params }: RouteParams) {
  const { id: userId } = await params

  try {
    const readings = await getReadings(userId)
    return NextResponse.json({ data: readings })
  } catch (error) {
    console.error('Erro ao buscar glicemias', error)
    return NextResponse.json(
      { error: 'Erro ao buscar glicemias' },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  const reading = (await request.json()) as ReadingUpdateProps

  try {
    const readingUpdated = await updateReading(reading)
    return NextResponse.json({
      message: 'Glicemia atualizada!',
      data: readingUpdated,
    })
  } catch (error) {
    console.error('Erro ao atualizar glicemia', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar glicemia' },
      { status: 500 },
    )
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params
  const readingId = Number(id)

  try {
    const reading = await deleteReading(readingId)
    return NextResponse.json({
      message: 'Glicemia deletada!',
      data: reading,
    })
  } catch (error) {
    console.error('Erro ao deletar glicemia', error)
    return NextResponse.json(
      { error: 'Erro ao deletar glicemia', message: String(error) },
      { status: 500 },
    )
  }
}
