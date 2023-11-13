import { Config, Data, Layout } from 'plotly.js';
import { useModel } from '../context/model';
import Plot from 'react-plotly.js';
import { Box, CircularProgress } from '@mui/material';

function Chart() {
  let model = useModel();

  if (model.timepoints === undefined || model.outputs === undefined || model.doutputs === undefined || model.solver === undefined) {
    return ( <CircularProgress /> );
  }

  const times = Array.from(model.timepoints.getFloat64Array());
  const outputs_array = model.outputs.getFloat64Array();
  const doutputs_array = model.doutputs.getFloat64Array();
  const noutputs = model.solver.number_of_outputs;
  const convert_to_array = (array: Float64Array) => {
    return Array.from({ length: noutputs }).map((_, i) => {
      if (model.outputs === undefined || model.timepoints === undefined || model.solver === undefined) {
        return [];
      }
      const number_of_timepoints = model.timepoints.length();
      let output: number[] = Array(number_of_timepoints);
      for (let j = 0; j < number_of_timepoints; j++) {
        output[j] = array[j * model.solver.number_of_outputs + i];
      }
      return output;
    })
  }

  const outputs = convert_to_array(outputs_array);
  const doutputs = convert_to_array(doutputs_array);
  let plotData: Data[] = [];
  for (let i = 0; i < noutputs; i++) {
    // lower bound
    plotData.push({
      x: times,
      y: outputs[i].map((o, j) => o - doutputs[i][j]),
      type: 'scatter',
      name: `out${i}-l`,
    });
    
    // upper bound
    plotData.push({
      x: times,
      y: outputs[i].map((o, j) => o + doutputs[i][j]),
      type: 'scatter',
      fill: 'tonexty',
      name: `out${i}-u`,
    });

    // output
    plotData.push({
      x: times,
      y: outputs[i],
      type: 'scatter',
      name: `out${i}`,
    });
  }

    
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