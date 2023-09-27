import React from 'react';
import { useModel, useModelDispatch } from '../context/model';
import Slider from './Slider';

function Sliders() {
  const dispatch = useModelDispatch();
  const model = useModel();
  const inputs = model.inputs.getFloat64Array();
  const lowerBound = model.lowerBound;
  const upperBound = model.upperBound;
  const inputsArray = Array.from(inputs);
  const handleSliderChange = (i: number) => (e: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      dispatch({ type: 'setInput', value: newValue, index: i});
    } else {
      console.error('error should not get a number[]');
    }
  }
  const handleLowerBoundChange= (i: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = parseFloat(e.target.value);
    dispatch({ type: 'setLowerBound', value: newValue, index: i});
  }
  const handleUpperBoundChange= (i: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = parseFloat(e.target.value);
    dispatch({ type: 'setUpperBound', value: newValue, index: i});
  }
  return (
    <div>
    { inputsArray.map((input, i) => (
      <Slider value={input} index={i} lowerBound={lowerBound[i]} upperBound={upperBound[i]} onSliderChange={handleSliderChange(i)} onLowerBoundChange={handleLowerBoundChange(i)} onUpperBoundChange={handleUpperBoundChange(i)} />
    ))}
    </div>
  );
}
export default Sliders;