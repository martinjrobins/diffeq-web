import { useMemo } from 'react';
import { Config, Data, Layout } from 'plotly.js';
import { useModel } from '../context/model';
import Plot from 'react-plotly.js';

function Chart() {
  let model = useModel();

  const outputs = useMemo(() => {
    return Array(model.number_of_outputs).map((_, i) => {
      const number_of_timepoints = model.timepoints.length;
      let output = new Float64Array(number_of_timepoints);
      for (let j = 0; j < number_of_timepoints; j++) {
        output[j] = model.outputs[j * model.number_of_outputs + i];
      }
      return output;
  })}, [model.number_of_outputs, model.outputs]);

  const plotData: Data[] = outputs.map((output, i) => {
    return {
      x: model.timepoints,
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
    <div>
      <Plot
        data={plotData}
        layout={plotLayout}
        style={{ width: '100%', height: '100%' }}
        config={config}
      />
    </div>
  );
}
export default Chart;