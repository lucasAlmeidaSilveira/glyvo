import 'server-only'

import { query } from '@/server/db/index'
import type { MealSchedule, MealScheduleRequest } from '@/server/types'

export const getMealSchedules = async (userId: string) => {
  const result = await query(
    'SELECT * FROM meal_schedules WHERE user_id = $1 AND deleted = 0 ORDER BY start_time ASC',
    [userId],
  )
  return result.rows
}

export const createMealSchedule = async (mealSchedule: MealScheduleRequest) => {
  const mealSchedules = mealSchedule.schedules.map((schedule) => ({
    user_id: mealSchedule.userId,
    schedule_name: schedule.schedule_name,
    start_time: schedule.start_time,
    end_time: schedule.end_time,
  }))

  const results: MealSchedule[] = []

  const insertPromises = mealSchedules.map((schedule) =>
    query(
      'INSERT INTO meal_schedules (user_id, schedule_name, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        schedule.user_id,
        schedule.schedule_name,
        schedule.start_time,
        schedule.end_time,
      ],
    ),
  )

  const insertResults = await Promise.all(insertPromises)

  for (const result of insertResults) {
    results.push(result.rows[0])
  }

  return results
}

export const updateMealSchedule = async (mealSchedule: MealSchedule) => {
  const result = await query(
    'UPDATE meal_schedules SET schedule_name = $1, start_time = $2, end_time = $3 WHERE id = $4 RETURNING *',
    [
      mealSchedule.schedule_name,
      mealSchedule.start_time,
      mealSchedule.end_time,
      mealSchedule.id,
    ],
  )
  return result.rows[0]
}
