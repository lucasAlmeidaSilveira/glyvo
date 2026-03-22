export type User = {
  id: string
  name: string
  email: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
  deleted: number
}

export type ReadingRequestValue = {
  date: string
  value: number
  userId: string
  meal?: string
}

export type Reading = {
  id: string
  date: Date
  value: number
  userId: string
  meal: string
}

export type ReadingUpdateProps = {
  id: string | number
  value: number
  meal: string
}

export type MealScheduleRequestProps = {
  schedule_name: string
  start_time: string
  end_time: string
}

export interface MealScheduleRequest {
  schedules: MealScheduleRequestProps[]
  userId: string
}

export type MealSchedule = {
  id: string
  userId: string
  schedule_name: string
  start_time: string
  end_time: string
}

export type Spreadsheet = {
  id: number
  url: string
  start_date: Date
  end_date: Date
  userId: number
  created_at: string
  updated_at: string
  deleted_at: string
  deleted: number
}
