import { NextResponse } from 'next/server'

import { listSpreadsheets } from '@/server/services/SpreadsheetsService'

export const runtime = 'nodejs'

type RouteParams = { params: Promise<{ userId: string }> }

export async function GET(_request: Request, { params }: RouteParams) {
  const { userId } = await params

  try {
    const spreadsheets = await listSpreadsheets(userId)

    if (spreadsheets.length === 0) {
      return NextResponse.json({
        message: 'Nenhuma planilha encontrada',
        data: [],
      })
    }

    return NextResponse.json({
      message: 'Planilhas encontradas com sucesso',
      data: spreadsheets,
    })
  } catch (error) {
    console.error('Erro ao buscar planilhas', error)
    return NextResponse.json(
      { error: 'Erro ao buscar planilhas', message: String(error) },
      { status: 500 },
    )
  }
}
