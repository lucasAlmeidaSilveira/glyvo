'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerReading } from '@/api'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { getTime } from '@/tools/tools'
import { ReadingRequest } from '@/types/reading'

const FormSchema = z.object({
  dataHora: z.string().min(1, {
    message: 'Por favor, selecione a data e horário.',
  }),
  glicemia: z
    .string()
    .min(1, {
      message: 'Por favor, digite o valor da glicemia.',
    })
    .max(3)
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'A glicemia deve ser um número válido maior que zero.',
    }),
})

export function InputForm() {
  const { user } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dataHora: getTime(new Date()),
      glicemia: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // Converter a string datetime-local para um objeto Date
    const dataHora = new Date(data.dataHora)

    const readingRequest: ReadingRequest = {
      userId: user?.userId as string,
      date: dataHora,
      value: Number(data.glicemia),
    }

    setIsLoading(true)
    const response = await registerReading(readingRequest)
    const dataResponse = response.data

    toast.success(response.message, {
      description: (
        <span className="text-sm">
          {dataResponse.meal}{' '}
          <strong className="text-md">| {dataResponse.value} mg/dL</strong>
        </span>
      ),
      action: {
        label: 'Ver glicemias',
        onClick: () => {
          redirect('/glicemias')
        },
      },
    })

    // Limpar o formulário após envio
    form.reset()
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="dataHora"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="datetime-local"
                  className="w-full p-5 text-center"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="glicemia"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Digite sua glicemia"
                  type="number"
                  min="1"
                  step="1"
                  className="w-full p-5 text-center"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full py-6 text-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Image
                src="/logoIconPrimary.svg"
                alt="Logo"
                className="h-8 w-8 animate-spin"
              />
              Enviando...
            </div>
          ) : (
            'Enviar'
          )}
        </Button>
      </form>
    </Form>
  )
}
