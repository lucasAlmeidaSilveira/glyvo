import { User } from 'firebase/auth'

export type UserProps = User & {
  userId?: string
  name?: string
  email?: string
  photoURL?: string
  createdAt?: Date
  updatedAt?: Date
}

export type UserRequest = {
  name: string
  email: string
}

export type UserDB = {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  deleted: 0 | 1
}

export interface UserResponse {
  message: string
  data: UserDB
}
