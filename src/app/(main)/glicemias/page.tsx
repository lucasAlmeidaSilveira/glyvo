'use client';

import { deleteReading, getReadings } from '@/api';
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
import { useEffect, useState } from 'react';
import { Reading } from '@/types/reading';
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/tools/tools";

export default function Glicemias() {
  const { user } = useAuth();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReadings = async () => {
      const response = await getReadings(user?.userId as string);
      setReadings(response.data);
      setIsLoading(false);
    };
    fetchReadings();
  }, []);

  async function handleDeleteReading(readingId: number) {
    await deleteReading(readingId);
    setReadings(readings.filter(reading => reading.id !== readingId));
  }

  return (
    <Card className='mx-4 bg-white p-4 min-w-[320px] flex'>
      <CardDescription>
        <ScrollArea className='h-[480px]'>
          <div className='flex flex-col gap-2'>
            {isLoading ? (
              <div className='flex flex-col gap-2'>
                {[...Array(9)].map((_, i) => (
                  <Skeleton key={i} className='w-full h-[48px] rounded-md bg-gray-200' />
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size='icon'
                          variant='secondary'
                          className='rounded-full'
                        >
                          <FaPen />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar glicemia</DialogTitle>
                          <DialogDescription>
                            <div className='flex gap-2 mt-2'>
                              <Select defaultValue={reading.meal}>
                                <SelectTrigger className='w-full'>
                                  <SelectValue placeholder='Selecione o horário' />
                                </SelectTrigger>
                                <SelectContent className='bg-white'>
                                  <SelectItem value='1'>Jejum</SelectItem>
                                  <SelectItem value='2'>
                                    2 horas após café
                                  </SelectItem>
                                  <SelectItem value='3'>
                                    Antes do almoço
                                  </SelectItem>
                                  <SelectItem value='4'>
                                    2 horas após almoço
                                  </SelectItem>
                                  <SelectItem value='5'>
                                    Antes do jantar
                                  </SelectItem>
                                  <SelectItem value='6'>
                                    2 horas após jantar
                                  </SelectItem>
                                  <SelectItem value='7'>
                                    Antes de dormir
                                  </SelectItem>
                                  <SelectItem value='8'>3 horas</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input
                                className='w-[102px]'
                                defaultValue={reading.value}
                              />
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant='secondary'>Cancelar</Button>
                          </DialogClose>
                          <Button variant='default'>Confirmar</Button>
                        </DialogFooter>
                      </DialogContent>
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
                          <AlertDialogTitle>Excluir glicemia</AlertDialogTitle>
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
                            <Button variant='destructive' onClick={() => handleDeleteReading(reading.id)}>Excluir</Button>
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
  );
}
