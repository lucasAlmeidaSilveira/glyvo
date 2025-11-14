'use client'

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

import { createUser, getUser } from '@/api'
import { auth, db } from '@/lib/firebase'
import { UserDB, UserProps, UserRequest } from '@/types/user'

interface AuthContextType {
  user: UserProps | null
  isLoading: boolean
  loginWithEmail: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Função para gerar chave única do storage
  const getStorageKey = (email: string) => `userData_${email}`

  // Função para recuperar dados do usuário do sessionStorage
  const getUserFromStorage = (email: string) => {
    try {
      const storageKey = getStorageKey(email)
      const storedData = sessionStorage.getItem(storageKey)
      return storedData ? JSON.parse(storedData) : null
    } catch (error) {
      console.warn('Erro ao ler dados do sessionStorage:', error)
      return null
    }
  }

  // Função para salvar dados do usuário no sessionStorage
  const saveUserToStorage = (email: string, userData: any) => {
    try {
      const storageKey = getStorageKey(email)
      sessionStorage.setItem(storageKey, JSON.stringify(userData))
    } catch (error) {
      console.warn('Erro ao salvar dados no sessionStorage:', error)
    }
  }

  // Função para limpar dados do usuário do sessionStorage
  const clearUserFromStorage = (email: string) => {
    const storageKey = getStorageKey(email)
    sessionStorage.removeItem(storageKey)
  }

  // Função para buscar ou criar dados do usuário
  const fetchOrCreateUserData = async (firebaseUser: User) => {
    let userData = getUserFromStorage(firebaseUser.email as string)

    if (!userData) {
      userData = await getUser(firebaseUser.email as string)

      if (!userData) {
        const userRequest: UserRequest = {
          name: firebaseUser.displayName as string,
          email: firebaseUser.email as string,
        }
        userData = await createUser(userRequest)
      }

      saveUserToStorage(firebaseUser.email as string, userData)
    }

    return userData
  }

  // Função para processar mudança de estado de autenticação
  const handleAuthStateChange = async (firebaseUser: User | null) => {
    if (firebaseUser) {
      const userData = await fetchOrCreateUserData(firebaseUser)
      setUser({ ...firebaseUser, userId: userData.id } as UserProps)
    } else {
      setUser(null)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange)
    return () => unsubscribe()
  }, [])

  const loginWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Erro no login com email:', error)
      throw error
    }
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Erro no login com Google:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      if (user?.email) {
        clearUserFromStorage(user.email)
      }

      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Erro no logout:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithEmail,
        loginWithGoogle,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
