'use client';

import {
  deleteReading,
  generateSpreadsheet,
  getReadings,
  updateReading,
} from '@/api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { FaPen, FaTrash } from 'react-icons/fa6';
import { useCallback, useEffect, useState } from 'react';
import { FormUpdateReadingSchema, Reading } from '@/types/reading';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate, formatDateForInput, parseDateFromInput } from '@/tools/tools';
import { useMeal } from '@/hooks/useMeal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  FormGenerateSpreadsheet,
  FormGenerateSpreadsheetSchema,
  SpreadsheetResponse,
} from '@/types/spreadsheet';

export default function Glicemias() {
  const { user } = useAuth();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingReading, setEditingReading] = useState<Reading | null>(null);

  const fetchReadings = useCallback(async () => {
    if (!user?.userId) return;

    try {
      setIsLoading(true);
      const response = await getReadings(user.userId);
      setReadings(response.data);
    } catch (error) {
      console.error('Erro ao carregar glicemias:', error);
      toast.error('Erro ao carregar glicemias');
    } finally {
      setIsLoading(false);
    }
  }, [user?.userId]);

  useEffect(() => {
    if (user?.userId) {
      fetchReadings();
    }
  }, [fetchReadings]);

  const handleDeleteReading = useCallback(async (readingId: number) => {
    try {
      await deleteReading(readingId);
      setReadings(prev => prev.filter(reading => reading.id !== readingId));
      toast.success('Glicemia excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir glicemia:', error);
      toast.error('Erro ao excluir glicemia');
    }
  }, []);

  return (
    <div className='flex flex-col gap-4 mx-4'>
      <Card className='bg-white p-4 min-w-[320px] flex'>
        <CardDescription>
          <ScrollArea className='h-[calc(100vh-340px)]'>
            <div className='flex flex-col gap-2'>
              {isLoading ? (
                <div className='flex flex-col gap-2'>
                  {[...Array(9)].map((_, i) => (
                    <Skeleton
                      key={i}
                      className='w-full h-[48px] rounded-md bg-gray-200'
                    />
                  ))}
                </div>
              ) : readings.length === 0 ? (
                <div className='flex justify-center items-center h-full'>
                  <p className='text-gray-500'>Nenhuma glicemia encontrada</p>
                </div>
              ) : (
                readings.map(reading => (
                  <div
                    key={reading.id}
                    className='flex justify-between items-center gap-2 border-b border-gray-200 pb-1'
                  >
                    <div className='flex flex-col text-xs w-full'>
                      {reading.meal}
                      <div className='flex justify-between items-end'>
                        <strong className='text-semibold text-base'>
                          {reading.value}mg/dL
                        </strong>
                        <span className='text-xs'>
                          {formatDate(reading.date)}
                        </span>
                      </div>
                    </div>
                    <div className='flex gap-1'>
                      <Dialog
                        open={editingReading?.id === reading.id}
                        onOpenChange={open => {
                          if (open) {
                            setEditingReading(reading);
                          } else {
                            setEditingReading(null);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size='icon'
                            variant='secondary'
                            className='rounded-full'
                          >
                            <FaPen />
                          </Button>
                        </DialogTrigger>
                        <EditReadingDialog
                          reading={reading}
                          onUpdateSuccess={() => {
                            fetchReadings();
                            setEditingReading(null);
                          }}
                        />
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size='icon'
                            variant='destructive'
                            className='rounded-full'
                          >
                            <FaTrash />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Excluir glicemia
                            </AlertDialogTitle>
                            <AlertDialogDescription asChild>
                              <div className='flex flex-col gap-2 text-black'>
                                <Input
                                  className='text-center'
                                  disabled
                                  value={formatDate(reading.date)}
                                />
                                <div className='flex gap-2'>
                                  <Input
                                    className='w-full'
                                    disabled
                                    value={reading.meal}
                                  />
                                  <Input
                                    className='w-[146px]'
                                    disabled
                                    value={`${reading.value}mg/dL`}
                                  />
                                </div>
                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction asChild>
                              <Button
                                variant='destructive'
                                onClick={() => handleDeleteReading(reading.id)}
                              >
                                Excluir
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardDescription>
      </Card>
      {user?.userId && <GenerateSpreadsheetDialog userId={user.userId} />}
    </div>
  );
}

function EditReadingDialog({
  reading,
  onUpdateSuccess,
}: {
  reading: Reading;
  onUpdateSuccess: () => void;
}) {
  const { meals } = useMeal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormUpdateReadingSchema>>({
    resolver: zodResolver(FormUpdateReadingSchema),
    defaultValues: {
      meal: reading.meal,
      value: reading.value,
    },
  });

  async function onSubmit(data: z.infer<typeof FormUpdateReadingSchema>) {
    setIsLoading(true);

    try {
      const response = await updateReading(reading.id, {
        id: reading.id,
        meal: data.meal,
        value: data.value,
      });

      toast.success(response.message, {
        description: (
          <span className='text-sm'>
            {response.data.meal}{' '}
            <strong className='text-md'>| {response.data.value} mg/dL</strong>
          </span>
        ),
      });

      // Chamar o callback de sucesso para recarregar os dados
      onUpdateSuccess();

      // Dialog será fechado pelo componente pai
    } catch (error) {
      console.error('Erro ao atualizar glicemia:', error);
      toast.error('Erro ao atualizar glicemia. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar glicemia</DialogTitle>
        <DialogDescription asChild>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4 mt-2'
          >
            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='meal'
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Selecione o horário' />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      {meals.map(meal => (
                        <SelectItem key={meal.id} value={meal.name}>
                          {meal.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              <FormField
                control={form.control}
                name='value'
                render={({ field }) => (
                  <Input
                    className='w-[102px]'
                    placeholder='Valor'
                    type='number'
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='secondary' type='button'>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Atualizando...' : 'Confirmar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}

function GenerateSpreadsheetDialog({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormGenerateSpreadsheet>({
    resolver: zodResolver(FormGenerateSpreadsheetSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  async function onSubmit(data: FormGenerateSpreadsheet) {
    try {
      toast.promise(generateSpreadsheet(
        userId,
        data.startDate.toISOString().split('T')[0],
        data.endDate.toISOString().split('T')[0],
      ), {
        loading: 'Gerando planilha...',
        success: (response) => {
          if (response?.data?.url) {
            window.open(response.data.url, '_blank');
          }
          reset();
          setOpen(false);
          return {
            message: 'Planilha gerada com sucesso!',
            action: {
              label: 'Abrir planilha',
              onClick: () => window.open(response.data.url, '_blank'),
            }
          };
        },
        error: 'Erro ao gerar planilha. Tente novamente.',
      });

    } catch (error) {
      console.error('Erro ao gerar planilha:', error);
      toast.error('Erro ao gerar planilha. Tente novamente.');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary' size='lg'>Gerar planilha</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerar planilha de glicemias</DialogTitle>
          <DialogDescription>Selecione uma data inicial e final para gerar a planilha</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4 mt-2'
          >
            <div className='flex gap-2 w-full'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Data inicial</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        value={formatDateForInput(field.value)}
                        onChange={e => {
                          const date = parseDateFromInput(e.target.value);
                          if (date) {
                            field.onChange(date);
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
                name='endDate'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Data final</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        value={formatDateForInput(field.value)}
                        onChange={e => {
                          const date = parseDateFromInput(e.target.value);
                          if (date) {
                            field.onChange(date);
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
                <Button variant='secondary' type='button'>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Gerando...' : 'Gerar planilha'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
