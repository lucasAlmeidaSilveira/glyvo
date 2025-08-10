import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FaPen, FaTrash } from 'react-icons/fa6';

const glicemias = [
  {
    id: 1,
    step: 'Antes do almoço',
    value: 125,
    time: '11:57',
  },
  {
    id: 2,
    step: 'Depois do almoço',
    value: 127,
    time: '11:57',
  },
  {
    id: 3,
    step: 'Depois do almoço',
    value: 127,
    time: '11:57',
  },
  {
    id: 4,
    step: 'Depois do almoço',
    value: 127,
    time: '11:57',
  },
  {
    id: 5,
    step: 'Depois do almoço',
    value: 127,
    time: '11:57',
  },
  {
    id: 6,
    step: 'Depois do almoço',
    value: 127,
    time: '11:57',
  },
  {
    id: 7,
    step: 'Depois do almoço',
    value: 127,
    time: '11:57',
  },
  {
    id: 8,
    step: 'Depois do almoço',
    value: 127,
    time: '11:57',
  },
  {
    id: 9,
    step: 'Depois do almoço',
    value: 127,
    time: '11:57',
  },
  {
    id: 10,
    step: 'Depois do almoço',
    value: 127,
    time: '11:57',
  },
];

export default function Glicemias() {
  return (
    <Card className='mx-4 bg-white p-4 min-w-[320px] flex'>
      <CardDescription>
        <div className='flex flex-col gap-2 max-h-[480px] grow overflow-x-auto'>
          {glicemias.map(glicemia => (
            <div key={glicemia.id} className='flex justify-between items-center gap-2 border-b border-gray-200 pb-1'>
              <div className='flex flex-col text-xs w-full'>
                {glicemia.step}
                <div className='flex justify-between items-end'>
                  <strong className='text-semibold text-base'>
                    {glicemia.value}mg/dl
                  </strong>
                  <span className='text-xs'>{glicemia.time}</span>
                </div>
              </div>
              <div className='flex gap-1'>
                <Button
                  size='icon'
                  variant='secondary'
                  className='rounded-full'
                >
                  <FaPen />
                </Button>
                <Button
                  size='icon'
                  variant='destructive'
                  className='rounded-full'
                >
                  <FaTrash />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardDescription>
    </Card>
  );
}
