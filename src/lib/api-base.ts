/**
 * Com `NEXT_PUBLIC_API_URL` apontando para o glyvo-api (ou outro host), usa essa base.
 * Sem a variável, as chamadas vão para as Route Handlers do Next em `/api`.
 */
export function apiUrl(path: string): string {
  const external = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (external) {
    return `${external}${normalized}`
  }
  return `/api${normalized}`
}
