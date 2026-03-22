import { NextResponse } from 'next/server'

import {
  createSpreadsheet,
  getSpreadsheet,
} from '@/server/services/SpreadsheetsService'

export const runtime = 'nodejs'
export const maxDuration = 300

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  try {
    if (!userId || !startDate || !endDate) {
      return NextResponse.json(
        {
          error: 'Parâmetros obrigatórios',
          message: 'userId, startDate e endDate são obrigatórios',
        },
        { status: 400 },
      )
    }

    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)

    if (Number.isNaN(startDateObj.getTime()) || Number.isNaN(endDateObj.getTime())) {
      return NextResponse.json(
        {
          error: 'Formato de data inválido',
          message: 'As datas devem estar no formato YYYY-MM-DD',
        },
        { status: 400 },
      )
    }

    if (startDateObj > endDateObj) {
      return NextResponse.json(
        {
          error: 'Data inválida',
          message: 'A data de início deve ser anterior à data de fim',
        },
        { status: 400 },
      )
    }

    const spreadsheetExists = await getSpreadsheet(userId, startDate, endDate)
    if (spreadsheetExists) {
      return NextResponse.json({
        message: 'Planilha já existe',
        data: {
          id: spreadsheetExists.id,
          start_date: spreadsheetExists.start_date,
          end_date: spreadsheetExists.end_date,
          url: spreadsheetExists.url,
          created_at: spreadsheetExists.created_at,
          updated_at: spreadsheetExists.updated_at,
        },
      })
    }

    const spreadsheet = await createSpreadsheet(userId, startDate, endDate)

    return NextResponse.json(
      {
        message: 'Planilha criada com sucesso',
        data: {
          url: spreadsheet,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Erro ao criar planilha', error)
    return NextResponse.json(
      {
        error: 'Erro ao criar planilha',
        message:
          error instanceof Error ? error.message : 'Erro interno do servidor',
      },
      { status: 500 },
    )
  }
}
