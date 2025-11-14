'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { toast } from 'sonner'

import { getSpreadsheets } from '@/api'
import { GenerateSpreadsheet } from '@/components/GenerateSpreadSheet'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/contexts/AuthContext'
import { formatDateData } from '@/tools/tools'
import { SpreadsheetData } from '@/types/spreadsheet'

import { GenerateSpreadsheetDialog } from '../glicemias/page'

export default function SpreadsheetsPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [spreadsheets, setSpreadsheets] = useState<SpreadsheetData[]>([])

  const fetchSpreadsheets = useCallback(async () => {
    if (!user?.userId) return
    try {
      setIsLoading(true)
      const response = await getSpreadsheets(user.userId)
      setSpreadsheets(response.data)
    } catch (error) {
      console.error('Erro ao carregar planilhas:', error)
      toast.error('Erro ao carregar planilhas')
    } finally {
      setIsLoading(false)
    }
  }, [user?.userId])

  useEffect(() => {
    if (user?.userId) {
      fetchSpreadsheets()
    }
  }, [fetchSpreadsheets, user?.userId])

  return (
    <div className="mx-4 flex flex-col gap-4">
      <Card className="flex min-w-[320px] bg-white p-4">
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-340px)]">
            <div className="flex flex-col gap-2">
              {isLoading ? (
                <div className="flex flex-col gap-2">
                  {[...Array(9)].map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-[48px] w-full rounded-md bg-gray-200"
                    />
                  ))}
                </div>
              ) : spreadsheets.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-500">Nenhuma planilha encontrada</p>
                </div>
              ) : (
                spreadsheets.map((spreadsheet) => (
                  <Link
                    key={spreadsheet.id}
                    href={spreadsheet.url}
                    target="_blank"
                    className="flex items-center justify-between gap-2 border-b border-gray-200 pb-1"
                  >
                    <div className="flex flex-col">
                      <span className="w-full text-xs">Data da planilha</span>
                      <strong className="text-semibold text-base">
                        {formatDateData(spreadsheet.start_date)} -{' '}
                        {formatDateData(spreadsheet.end_date)}
                      </strong>
                    </div>
                    <FaExternalLinkAlt size={20} />
                  </Link>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      {user?.userId && <GenerateSpreadsheet userId={user.userId} />}
    </div>
  )
}
