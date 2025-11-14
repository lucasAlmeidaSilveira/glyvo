import z from 'zod'

export type SpreadsheetData = {
  id: number
  url: string
  start_date: Date
  end_date: Date
  created_at: string
  updated_at: string
}

export interface SpreadsheetsResponse {
  message: string
  data: SpreadsheetData[]
}
export interface SpreadsheetResponse {
  message: string
  data: SpreadsheetData
}

export const FormGenerateSpreadsheetSchema = z
  .object({
    startDate: z.date({
      message: 'Por favor, selecione a data inicial.',
    }),
    endDate: z.date({
      message: 'Por favor, selecione a data final.',
    }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'A data final deve ser maior ou igual à data inicial.',
    path: ['endDate'],
  })

export type FormGenerateSpreadsheet = z.infer<
  typeof FormGenerateSpreadsheetSchema
>
