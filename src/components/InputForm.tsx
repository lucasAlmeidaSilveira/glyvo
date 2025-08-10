'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getTime } from '@/tools/tools';
import { Toaster } from './ui/sonner';
import { CheckIcon } from 'lucide-react';
import Logo from './Logo';

const FormSchema = z.object({
  dataHora: z.string().min(1, {
    message: 'Por favor, selecione a data e horário.',
  }),
  glicemia: z
    .string()
    .min(1, {
      message: 'Por favor, digite o valor da glicemia.',
    })
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'A glicemia deve ser um número válido maior que zero.',
    }),
});

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dataHora: getTime(new Date()),
      glicemia: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Converter a string datetime-local para um objeto Date
    const dataHora = new Date(data.dataHora);

    // Formatar a data e hora para exibição
    const dataFormatada = dataHora.toLocaleDateString('pt-BR');
    const horaFormatada = dataHora.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    toast('Dados enviados com sucesso!', {
      description: (
        <span className='text-sm'>Antes do almoço <strong className='text-lg'>| {data.glicemia}<span className="text-sm">mg/dL</span></strong></span>
      ),
      icon: <Logo variant='icon' />,
      position: 'top-center',
    });

    // Limpar o formulário após envio
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
        <FormField
          control={form.control}
          name='dataHora'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='datetime-local'
                  className='w-full text-center p-5'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='glicemia'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Digite sua glicemia'
                  type='number'
                  min='1'
                  step='0.1'
                  className='w-full text-center p-5'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full text-lg py-6 uppercase'>
          Enviar
        </Button>
      </form>
    </Form>
  );
}
