import { Config, Data, Layout } from 'plotly.js';
import { useModel } from '../context/model';
import Plot from 'react-plotly.js';
import { Box, CircularProgress } from '@mui/material';

function Chart() {
  let model = useModel();

  if (model.timepoints === undefined || model.outputs === undefined || model.solver === undefined) {
    return ( <CircularProgress /> );
  }

  const times = Array.from(model.timepoints.getFloat64Array());
  const outputs_array = model.outputs.getFloat64Array();
  const outputs = Array.from({ length: model.solver.number_of_outputs }).map((_, i) => {
      if (model.outputs === undefined || model.timepoints === undefined || model.solver === undefined) {
        return [];
      }
      const number_of_timepoints = model.timepoints.length();
      let output: number[] = Array(number_of_timepoints);
      for (let j = 0; j < number_of_timepoints; j++) {
        output[j] = outputs_array[j * model.solver.number_of_outputs + i];
      }
      return output;
  })

  const plotData: Data[] = outputs.map((output, i) => {
    return {
      x: times,
      y: output,
      type: 'scatter',
      name: `out${i}`,
    }
  });
    
  const plotLayout: Partial<Layout> = {
    legend: {
      orientation: 'v',
      yanchor: 'top',
      xanchor: 'right',
      y: 1,
      x: 1,
    },
    xaxis: {
      title: 'time',
      automargin: true,
      exponentformat: 'power',  
    },
    yaxis: {
      title: 'out',
      automargin: true,
      exponentformat: 'power',  
    },
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4
    }
  }
  const config: Partial<Config> = {
    displaylogo: false,
  }
   return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <Plot
        data={plotData}
        layout={plotLayout}
        style={{ width: '100%', height: '100%' }}
        config={config}
      />
    </Box>
  );
}
export default Chart;