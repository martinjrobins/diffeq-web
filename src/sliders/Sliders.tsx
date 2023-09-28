import React from 'react';
import { useModel, useModelDispatch } from '../context/model';
import Slider from './Slider';
import { CircularProgress, Stack, TextField } from '@mui/material';

function Sliders() {
  const dispatch = useModelDispatch();
  const model = useModel();
  if (model.inputs === undefined || model.timepoints === undefined) {
    return ( <CircularProgress /> );
  }
  const times = model.timepoints.getFloat64Array();
  const maxTime = times[times.length - 1];
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
  const handleMaxTimeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = parseFloat(e.target.value);
    dispatch({ type: 'setMaxTime', value: newValue});
  }
  return (
    <Stack spacing={2} sx={{ mx: 1 }}>
    { inputsArray.map((input, i) => (
      <div key={i}>
      <Slider value={input} index={i} lowerBound={lowerBound[i]} upperBound={upperBound[i]} onSliderChange={handleSliderChange(i)} onLowerBoundChange={handleLowerBoundChange(i)} onUpperBoundChange={handleUpperBoundChange(i)} />
      </div>
    ))}
    <TextField onChange={handleMaxTimeChange} value={maxTime} label="max time" InputProps={{ type: 'number' }}/>
    </Stack>
  );
}
export default Sliders;