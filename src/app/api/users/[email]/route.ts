import { NextResponse } from 'next/server'

import { getUser } from '@/server/services/UsersService'
import type { User } from '@/server/types'

type RouteParams = { params: Promise<{ email: string }> }

export async function GET(_request: Request, { params }: RouteParams) {
  const { email } = await params
  const decodedEmail = decodeURIComponent(email)

  try {
    const user: User = await getUser(decodedEmail)
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado', message: 'Usuário não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      message: 'Usuário encontrado com sucesso',
      data: user,
    })
  } catch (error) {
    console.error('Erro ao buscar usuário', error)
    return NextResponse.json(
      { error: 'Usuário não encontrado', message: String(error) },
      { status: 404 },
    )
  }
}
