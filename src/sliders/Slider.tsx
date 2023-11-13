import { Box, Checkbox, FormControlLabel, Grid, Input, Slider as MuiSlider, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';

interface SliderProps {
  value: number;
  dvalue: number;
  lowerBound: number;
  upperBound: number;
  index: number;
  onSliderChange: (event: Event | undefined, newValue: number | number[]) => void;
  onLowerBoundChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onUpperBoundChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function Slider({ value, dvalue, index, lowerBound, upperBound, onSliderChange, onLowerBoundChange, onUpperBoundChange}: SliderProps) {
  const step = (upperBound - lowerBound) / 100;
  const [isRange, setIsRange] = useState<boolean>(false);
  const sliderValues = isRange ? [value - dvalue, value + dvalue] : value;
  const handleRangeClick = () => {
    if (isRange) {
      onSliderChange(undefined, value);
      setIsRange(false);
    } else {
      onSliderChange(undefined, [value, value]);
      setIsRange(true);
    }
  }

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
        <Grid item>
          <FormControlLabel control={<Checkbox checked={isRange} onClick={handleRangeClick} />} label="Range" />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Slider;