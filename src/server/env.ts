import { z } from 'zod'

const envSchema = z.object({
  POSTGRESQL_HOSTNAME: z.string(),
  POSTGRESQL_PORT: z.coerce.number(),
  POSTGRESQL_DATABASE: z.string(),
  POSTGRESQL_USERNAME: z.string(),
  POSTGRESQL_PASSWORD: z.string(),
})

let cached: z.infer<typeof envSchema> | null = null

export function getServerEnv() {
  if (!cached) {
    cached = envSchema.parse(process.env)
  }
  return cached
}
