import 'server-only'

import { query } from '@/server/db/index'
import type {
  Reading,
  ReadingRequestValue,
  ReadingUpdateProps,
} from '@/server/types'
import { getMealSchedules } from '@/server/services/MealSchedulesService'

export const createReading = async (reading: ReadingRequestValue) => {
  const mealSchedule = await getMealSchedules(reading.userId)

  const readingTime = new Date(reading.date).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  })

  const mealScheduleFound = mealSchedule.find(
    (schedule) =>
      schedule.start_time <= readingTime && schedule.end_time >= readingTime,
  )

  if (!mealScheduleFound) {
    throw new Error('Horário de refeição não encontrado')
  }

  const readingCreated: ReadingRequestValue = {
    ...reading,
    meal: mealScheduleFound.schedule_name,
  }

  const result = await query(
    'INSERT INTO readings (user_id, date, value, meal) VALUES ($1, $2, $3, $4) RETURNING *',
    [
      readingCreated.userId,
      readingCreated.date,
      readingCreated.value,
      readingCreated.meal,
    ],
  )
  return result.rows[0]
}

export const getReadings = async (userId: string) => {
  const result = await query(
    'SELECT id, date, value, meal FROM readings WHERE user_id = $1 AND deleted = 0 ORDER BY date DESC',
    [userId],
  )
  return result.rows
}

export const updateReading = async (
  reading: ReadingUpdateProps,
): Promise<Reading> => {
  const result = await query(
    'UPDATE readings SET value = $1, meal = $2 WHERE id = $3 RETURNING *',
    [reading.value, reading.meal, reading.id],
  )
  return result.rows[0]
}

export const deleteReading = async (id: number) => {
  const result = await query(
    'UPDATE readings SET deleted = 1 WHERE id = $1 RETURNING *',
    [id],
  )
  return result.rows[0]
}
