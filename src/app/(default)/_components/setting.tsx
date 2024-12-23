import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { MAX_HEIGHT } from '@/config';
import type { DragMode, DrawingMode, Height } from '@/types';
import { Eraser, PenLine } from 'lucide-react';
import type { Dispatch } from 'react';

export const Setting = ({
  drawingMode,
  setDrawingMode,
  dragMode,
  setDragMode,
  height,
  setHeight,
}: {
  drawingMode: DrawingMode;
  setDrawingMode: Dispatch<DrawingMode>;
  dragMode: DragMode;
  setDragMode: Dispatch<DragMode>;
  height: Height;
  setHeight: Dispatch<Height>;
}) => {
  return (
    <div className='mx-auto my-4 flex flex-col gap-2'>
      <div className='flex flex-col gap-1'>
        <Label htmlFor='height' className='text-xl'>
          <span className='font-bold'>Height</span> (1-13 default: 7)
        </Label>
        <div id='height' className='flex'>
          <Input
            className='w-16 mr-8 ml-0'
            type='number'
            value={height}
            onChange={(e) => {
              if (
                height === MAX_HEIGHT &&
                Number(e.target.value) > MAX_HEIGHT
              ) {
                setHeight(MAX_HEIGHT);
                return;
              }
              if (height === 1 && Number(e.target.value) < 1) {
                setHeight(1);
                return;
              }
              if (
                Number(e.target.value) < 1 ||
                Number(e.target.value) > MAX_HEIGHT
              ) {
                return;
              }
              setHeight(Number(e.target.value));
            }}
          />
          <Slider
            defaultValue={[height]}
            min={1}
            max={MAX_HEIGHT}
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
          <div className='flex items-center space-x-2 h-10'>
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
            {drawingMode === 'drag' ? (
              <ToggleGroup type='single' variant='outline' value={dragMode}>
                <ToggleGroupItem
                  value='pen'
                  aria-label='Toggle pen'
                  onClick={() => {
                    setDragMode('pen');
                  }}
                >
                  <PenLine className='h-5 w-5' />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='eraser'
                  aria-label='Toggle eraser'
                  onClick={() => {
                    setDragMode('eraser');
                  }}
                >
                  <Eraser className='h-5 w-5' />
                </ToggleGroupItem>
              </ToggleGroup>
            ) : null}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
