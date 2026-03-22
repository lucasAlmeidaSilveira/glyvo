import 'server-only'

import { query } from '@/server/db/index'

export const getMeals = async () => {
  const result = await query('SELECT * FROM meals ORDER BY id ASC', [])
  return result.rows
}
