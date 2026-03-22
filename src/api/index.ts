import { apiUrl } from '@/lib/api-base'
import { MealsResponse } from '@/types/meals'
import { SpreadsheetResponse, SpreadsheetsResponse } from '@/types/spreadsheet'
import type { UserRequest, UserResponse } from '@/types/user'

import {
  ReadingRequest,
  ReadingResponse,
  ReadingsResponse,
  ReadingUpdateRequest,
} from '../types/reading'

export async function getUser(email: string) {
  try {
    const response = await fetch(
      apiUrl(`/users/${encodeURIComponent(email)}`),
    )
    if (response.status === 404) {
      return null
    }
    const { data }: UserResponse = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function createUser(body: UserRequest) {
  try {
    const response = await fetch(apiUrl('/users'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const { data }: UserResponse = await response.json()

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function registerReading(body: ReadingRequest) {
  try {
    const response = await fetch(apiUrl('/readings'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data: ReadingResponse = await response.json()

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getReadings(userId: string) {
  try {
    const response = await fetch(apiUrl(`/readings/${userId}`))
    const data: ReadingsResponse = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function deleteReading(readingId: number) {
  try {
    const response = await fetch(apiUrl(`/readings/${readingId}`), {
      method: 'DELETE',
    })
    const data: ReadingResponse = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function updateReading(
  readingId: number,
  body: ReadingUpdateRequest,
) {
  try {
    const response = await fetch(apiUrl(`/readings/${readingId}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data: ReadingResponse = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getMeals() {
  try {
    const response = await fetch(apiUrl('/meals'))
    const data: MealsResponse = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function generateSpreadsheet(
  userId: string,
  startDate: string,
  endDate: string,
): Promise<SpreadsheetResponse> {
  try {
    const params = new URLSearchParams({ userId, startDate, endDate })
    const response = await fetch(
      apiUrl(`/spreadsheets?${params.toString()}`),
      {
        method: 'POST',
      },
    )
    const data: SpreadsheetResponse = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getSpreadsheets(
  userId: string,
): Promise<SpreadsheetsResponse> {
  try {
    const response = await fetch(apiUrl(`/spreadsheets/${userId}`), {
      method: 'GET',
    })
    const data: SpreadsheetsResponse = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
