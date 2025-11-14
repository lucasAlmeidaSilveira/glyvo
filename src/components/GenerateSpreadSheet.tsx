'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { generateSpreadsheet } from '@/api'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { formatDateForInput, parseDateFromInput } from '@/tools/tools'
import {
  FormGenerateSpreadsheet,
  FormGenerateSpreadsheetSchema,
} from '@/types/spreadsheet'

export function GenerateSpreadsheet({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false)

  const form = useForm<FormGenerateSpreadsheet>({
    resolver: zodResolver(FormGenerateSpreadsheetSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form

  async function onSubmit(data: FormGenerateSpreadsheet) {
    try {
      toast.promise(
        generateSpreadsheet(
          userId,
          data.startDate.toISOString().split('T')[0],
          data.endDate.toISOString().split('T')[0],
        ),
        {
          loading: 'Gerando planilha...',
          success: (response) => {
            if (response?.data?.url) {
              window.open(response.data.url, '_blank')
            }
            reset()
            setOpen(false)
            return {
              message: 'Planilha gerada com sucesso!',
              action: {
                label: 'Abrir planilha',
                onClick: () => window.open(response.data.url, '_blank'),
              },
            }
          },
          error: 'Erro ao gerar planilha. Tente novamente.',
        },
      )
    } catch (error) {
      console.error('Erro ao gerar planilha:', error)
      toast.error('Erro ao gerar planilha. Tente novamente.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg">
          Gerar planilha
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerar planilha de glicemias</DialogTitle>
          <DialogDescription>
            Selecione uma data inicial e final para gerar a planilha
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-2 flex flex-col gap-4"
          >
            <div className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Data inicial</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={formatDateForInput(field.value)}
                        onChange={(e) => {
                          const date = parseDateFromInput(e.target.value)
                          if (date) {
                            field.onChange(date)
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Data final</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={formatDateForInput(field.value)}
                        onChange={(e) => {
                          const date = parseDateFromInput(e.target.value)
                          if (date) {
                            field.onChange(date)
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Gerando...' : 'Gerar planilha'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
