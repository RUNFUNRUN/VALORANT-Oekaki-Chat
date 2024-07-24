import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import type { DrawingMode, Height, Resolution } from '@/types';
import type { Dispatch, SetStateAction } from 'react';

export const Setting = ({
  setResolution,
  setDrawingMode,
  height,
  setHeight,
}: {
  setResolution: Dispatch<SetStateAction<Resolution>>;
  setDrawingMode: Dispatch<SetStateAction<DrawingMode>>;
  height: Height;
  setHeight: Dispatch<SetStateAction<Height>>;
}) => {
  return (
    <div className='w-[390px] md:w-[750px] lg:w-[1000px] mx-auto my-4 flex flex-col gap-2'>
      <div>
        <Label htmlFor='resolution' className='text-xl font-bold'>
          Resolution
        </Label>
        <RadioGroup
          defaultValue='fullhd'
          id='resolution'
          className='flex gap-4'
        >
          <div className='flex items-center space-x-2'>
            <RadioGroupItem
              value='fullhd'
              id='fullhd'
              onClick={() => {
                setResolution('fullhd');
              }}
            />
            <Label htmlFor='fullhd' className='text-xl'>
              Full HD
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem
              value='stretched'
              id='stretched'
              onClick={() => {
                setResolution('stretched');
              }}
            />
            <Label htmlFor='stretched' className='text-xl'>
              Stretched
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div>
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
      <div>
        <Label htmlFor='drawing-mode' className='text-xl font-bold'>
          Drawing mode
        </Label>
        <RadioGroup
          defaultValue='click'
          id='drawing-mode'
          className='flex gap-4'
        >
          <div className='flex items-center space-x-2'>
            <RadioGroupItem
              value='click'
              id='click'
              onClick={() => {
                setDrawingMode('click');
              }}
            />
            <Label htmlFor='click' className='text-xl'>
              Click
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem
              value='drag'
              id='drag'
              onClick={() => {
                setDrawingMode('drag');
              }}
            />
            <Label htmlFor='drag' className='text-xl'>
              Drag
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
