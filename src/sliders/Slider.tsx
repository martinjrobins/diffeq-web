import { Box, Grid, Input, Slider as MuiSlider, Typography } from '@mui/material';
import { ChangeEvent } from 'react';

interface SliderProps {
  value: number | number[];
  lowerBound: number;
  upperBound: number;
  index: number;
  onSliderChange: (event: Event, newValue: number | number[]) => void;
  onLowerBoundChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onUpperBoundChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function Slider({ value, index, lowerBound, upperBound, onSliderChange, onLowerBoundChange, onUpperBoundChange}: SliderProps) {
  const step = (upperBound - lowerBound) / 100;

  return (
    <Box sx={{ width: '100% '}}>
      <Typography id="input-slider" gutterBottom>
        { `input[${index}]`} 
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Input
            value={lowerBound}
            size="small"
            onChange={onLowerBoundChange}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
        <Grid item xs>
          <MuiSlider
            value={typeof value === 'number' ? value : 0}
            min={lowerBound}
            max={upperBound}
            step={step}
            onChange={onSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={upperBound}
            size="small"
            onChange={onUpperBoundChange}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Slider;