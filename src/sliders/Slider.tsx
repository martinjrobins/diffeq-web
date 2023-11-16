import { Box, Grid, Input, Slider as MuiSlider, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import Latex from 'react-latex';

interface SliderProps {
  value: number;
  lowerBound: number;
  upperBound: number;
  index: number;
  onSliderChange: (event: Event | undefined, newValue: number | number[]) => void;
  onLowerBoundChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onUpperBoundChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isDelta: boolean
}

function Slider({ value, index, lowerBound, upperBound, onSliderChange, onLowerBoundChange, onUpperBoundChange, isDelta}: SliderProps) {
  const step = (upperBound - lowerBound) / 100;
  const sliderValues = value;
  const label = isDelta ? `$\\delta x_${index}$` : `$x_${index}$`;

  return (
    <Box sx={{ width: '100% '}}>
      <Typography id="input-slider" gutterBottom>
        <Latex>{label}</Latex>
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
            value={sliderValues}
            min={lowerBound}
            max={upperBound}
            step={step}
            onChange={onSliderChange}
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
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