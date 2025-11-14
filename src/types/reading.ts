import { z } from 'zod'

export type ReadingRequest = {
  userId: string
  date: Date
  value: number
}

export type ReadingUpdateRequest = {
  id: number
  meal: string
  value: number
}

export type ReadingsResponse = {
  message: string
  data: Reading[]
}

export type ReadingResponse = {
  message: string
  data: Reading
}

export type Reading = {
  id: number
  date: Date
  meal: string
  value: number
}

export const FormUpdateReadingSchema = z.object({
  meal: z.string().min(1, {
    message: 'Por favor, selecione o horário da refeição.',
  }),
  value: z
    .number()
    .min(1, {
      message: 'Por favor, digite o valor da glicemia.',
    })
    .refine((val) => val > 0, {
      message: 'A glicemia deve ser um número válido maior que zero.',
    }),
})
