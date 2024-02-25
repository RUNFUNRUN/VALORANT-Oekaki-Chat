import { Height, Resolution } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Dispatch, SetStateAction } from 'react';

export const Setting = ({
  setResolution,
  height,
  setHeight,
}: {
  setResolution: Dispatch<SetStateAction<Resolution>>;
  height: Height;
  setHeight: Dispatch<SetStateAction<Height>>;
}) => {
  return (
    <div className='w-[390px] md:w-[750px] lg:w-[1000px] mx-auto my-8'>
      <Label htmlFor='resolution' className='text-xl font-bold'>
        Resolution
      </Label>
      <RadioGroup defaultValue='fullhd' id='resolution' className='flex gap-4'>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            value='fullhd'
            id='r1'
            onClick={() => {
              setResolution('fullhd');
            }}
          />
          <Label htmlFor='r1' className='text-xl'>
            Full HD
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            value='stretch'
            id='r2'
            onClick={() => {
              setResolution('stretch');
            }}
          />
          <Label htmlFor='r2' className='text-xl'>
            Stretch
          </Label>
        </div>
      </RadioGroup>
      <Label htmlFor='height' className='text-xl'>
        <span className='font-bold'>Height</span> (1-13 default: 7)
      </Label>
      <div id='height' className='flex'>
        <Input
          className='w-16 mr-8 ml-0'
          type='number'
          value={height}
          onChange={(e) => {
            if (height === 13 && Number(e.target.value) > 13) {
              setHeight(13);
              return;
            }
            if (height === 1 && Number(e.target.value) < 1) {
              setHeight(1);
              return;
            }
            if (Number(e.target.value) < 1 || Number(e.target.value) > 13) {
              return;
            }
            setHeight(Number(e.target.value));
          }}
        />
        <Slider
          defaultValue={[height]}
          min={1}
          max={13}
          step={1}
          onValueChange={(e) => setHeight(e[0])}
        />
      </div>
    </div>
  );
};
