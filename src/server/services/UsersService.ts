import 'server-only'

import { query } from '@/server/db/index'
import type { User } from '@/server/types'

export const getUser = async (email: string) => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email])
  return result.rows[0] as User
}

export const createUser = async (user: User) => {
  const result = await query(
    'INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING RETURNING *',
    [user.name, user.email],
  )
  return result.rows[0]
}
