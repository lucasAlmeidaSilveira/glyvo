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
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaPen, FaTrash } from 'react-icons/fa6';

const glicemias = [
  {
    id: 1,
    step: 'Antes do almoço',
    step_value: '3',
    value: 125,
    time: '01/08/2025 - 11:57',
  },
  {
    id: 2,
    step: 'Depois do almoço',
    step_value: '4',
    value: 127,
    time: '01/08/2025 - 11:57',
  },
  {
    id: 3,
    step: 'Depois do almoço',
    step_value: '4',
    value: 127,
    time: '01/08/2025 - 11:57',
  },
  {
    id: 4,
    step: 'Depois do almoço',
    step_value: '4',
    value: 127,
    time: '01/08/2025 - 11:57',
  },
  {
    id: 5,
    step: 'Depois do almoço',
    step_value: '4',
    value: 127,
    time: '01/08/2025 - 11:57',
  },
  {
    id: 6,
    step: 'Depois do almoço',
    step_value: '4',
    value: 127,
    time: '01/08/2025 - 11:57',
  },
  {
    id: 7,
    step: 'Depois do almoço',
    step_value: '4',
    value: 127,
    time: '01/08/2025 - 11:57',
  },
  {
    id: 8,
    step: 'Depois do almoço',
    step_value: '4',
    value: 127,
    time: '01/08/2025 - 11:57',
  },
  {
    id: 9,
    step: 'Depois do almoço',
    step_value: '4',
    value: 127,
    time: '01/08/2025 - 11:57',
  },
  {
    id: 10,
    step: 'Depois do almoço',
    step_value: '4',
    value: 127,
    time: '01/08/2025 - 11:57',
  },
];

export default function Glicemias() {
  return (
    <Card className='mx-4 bg-white p-4 min-w-[320px] flex'>
      <CardDescription>
        <ScrollArea className='h-[480px]'>
          <div className='flex flex-col gap-2'>
            {glicemias.map(glicemia => (
              <div
                key={glicemia.id}
                className='flex justify-between items-center gap-2 border-b border-gray-200 pb-1'
              >
                <div className='flex flex-col text-xs w-full'>
                  {glicemia.step}
                  <div className='flex justify-between items-end'>
                    <strong className='text-semibold text-base'>
                      {glicemia.value}mg/dL
                    </strong>
                    <span className='text-xs'>{glicemia.time}</span>
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
                          <div className="flex gap-2 mt-2">
                            <Select defaultValue={glicemia.step_value}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione o horário" />
                              </SelectTrigger>
                              <SelectContent className='bg-white'>
                                <SelectItem value="1">Jejum</SelectItem>
                                <SelectItem value="2">2 horas após café</SelectItem>
                                <SelectItem value="3">Antes do almoço</SelectItem>
                                <SelectItem value="4">2 horas após almoço</SelectItem>
                                <SelectItem value="5">Antes do jantar</SelectItem>
                                <SelectItem value="6">2 horas após jantar</SelectItem>
                                <SelectItem value="7">Antes de dormir</SelectItem>
                                <SelectItem value="7">3 horas</SelectItem>
                              </SelectContent>
                            </Select>
                              <Input className="w-[102px]" defaultValue={glicemia.value}  />
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
                        <AlertDialogDescription>
                          <div className="flex flex-col gap-2 text-black">
                            <Input className="text-center" disabled value={glicemia.time} />
                            <div className="flex gap-2">
                              <Input className="w-full" disabled value={glicemia.step} />
                              <Input className="w-[146px]" disabled value={`${glicemia.value}mg/dL`} />
                            </div>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        {/* <div className='flex justify-between w-full'> */}
                        <AlertDialogCancel>
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction asChild >
                          <Button variant='destructive'>Excluir</Button>
                        </AlertDialogAction>
                        {/* </div> */}
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardDescription>
    </Card>
  );
}
