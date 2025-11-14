'use client'

import { useEffect, useState } from 'react'

import { createBrazilDate, toUTC } from '../lib/date-utils'
import { Input } from './ui/input'

interface DateInputProps {
  value?: Date
  onChange: (date: Date) => void
  showTime?: boolean
  className?: string
  placeholder?: string
}

export default function DateInput({
  value,
  onChange,
  showTime = true,
  className = '',
  placeholder = 'Selecione a data',
}: DateInputProps) {
  const [dateString, setDateString] = useState('')
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    if (value) {
      const brazilDate = new Date(value)
      setDateString(brazilDate.toISOString().split('T')[0])
      setTimeString(brazilDate.toTimeString().slice(0, 5))
    }
  }, [value])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateString = e.target.value
    setDateString(newDateString)

    if (newDateString && timeString) {
      const [year, month, day] = newDateString.split('-').map(Number)
      const [hour, minute] = timeString.split(':').map(Number)

      // Cria a data no fuso brasileiro
      const brazilDate = createBrazilDate(year, month, day, hour, minute)

      // Converte para UTC antes de enviar
      const utcDate = toUTC(brazilDate)
      onChange(utcDate)
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTimeString = e.target.value
    setTimeString(newTimeString)

    if (dateString && newTimeString) {
      const [year, month, day] = dateString.split('-').map(Number)
      const [hour, minute] = newTimeString.split(':').map(Number)

      // Cria a data no fuso brasileiro
      const brazilDate = createBrazilDate(year, month, day, hour, minute)

      // Converte para UTC antes de enviar
      const utcDate = toUTC(brazilDate)
      onChange(utcDate)
    }
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <Input
        type="date"
        value={dateString}
        onChange={handleDateChange}
        placeholder={placeholder}
      />
      {showTime && (
        <Input
          type="time"
          value={timeString}
          onChange={handleTimeChange}
          className="w-32"
        />
      )}
    </div>
  )
}
