import 'server-only'

import pkg from 'pg'

import { getServerEnv } from '@/server/env'

const { Pool } = pkg

let pool: InstanceType<typeof Pool> | null = null

function getPool() {
  if (!pool) {
    const env = getServerEnv()
    pool = new Pool({
      user: env.POSTGRESQL_USERNAME,
      host: env.POSTGRESQL_HOSTNAME,
      database: env.POSTGRESQL_DATABASE,
      password: env.POSTGRESQL_PASSWORD,
      port: env.POSTGRESQL_PORT,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  }
  return pool
}

// biome-ignore lint/suspicious/noExplicitAny: pool query values
export const query = (text: string, values: any[]) => getPool().query(text, values)
