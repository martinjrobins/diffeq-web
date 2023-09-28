import { Dispatch, createContext, useContext, useReducer } from 'react';
import { compileModel, compileResponse, Solver, Options, Vector } from '@martinjrobins/diffeq-js';


type ModelContextType = {
  inputs: Vector | undefined;
  lowerBound: number[];
  upperBound: number[];
  outputs: Vector | undefined;
  timepoints: Vector | undefined;
  solver: Solver | undefined;
  code: string;
  error: string | undefined;
  compiling: boolean;
}

const defaultCode = `in = [r, k]
r { 1 }
k { 1 }
u_i {
  y = 1,
  z = 0,
}
dudt_i {
    dydt = 0,
    dzdt = 0,
}
F_i {
    dydt,
    0,
}
G_i {
    (r * y) * (1 - (y / k)),
    (2 * y) - z,
}
out_i {
    y,
    z,
}`;

export const defaultModel: ModelContextType = {
  inputs: undefined,
  outputs: undefined,
  lowerBound: Array(0),
  upperBound: Array(0),
  timepoints: undefined,
  code: defaultCode,
  error: undefined,
  compiling: false,
  solver: undefined,
};

export const ModelContext = createContext(defaultModel);

export const ModelDispatchContext = createContext(undefined as unknown as Dispatch<ModelAction>);


export function useModel() {
  return useContext(ModelContext);
}

export function useModelDispatch() {
  return useContext(ModelDispatchContext);
}

export function ModelProvider({ children }: { children: React.ReactNode} ) {
  const [model, dispatch] = useReducer(
    modelReducer,
    defaultModel
  );

  // middleware for compiling model (async)
  const asyncDispatch = (action: ModelAction) => {
    if (action.type === 'compile') {
      if (model.compiling) {
        return;
      }
      dispatch(action);
      compileModel(model.code).then(() => {
        dispatch({ type: 'compiled' });
      });
    } else {
      dispatch(action);
    }
  }

  return (
    <ModelContext.Provider value={model}>
      <ModelDispatchContext.Provider value={asyncDispatch}>
        {children}
      </ModelDispatchContext.Provider>
    </ModelContext.Provider>
  );
}

type ModelAction = {
  type: 'compile',
} | {
  type: 'setCode',
  code: string,
} | {
  type: 'setInput',
  value: number,
  index: number,
} | {
  type: 'setLowerBound',
  value: number,
  index: number,
} | {
  type: 'setUpperBound',
  value: number,
  index: number,
} | {
  type: 'compiled', 
} | {
  type: 'setMaxTime',
  value: number,
}


function modelReducer(model: ModelContextType, action: ModelAction) {
  switch (action.type) {
    case 'setCode': {
      return {
        ...model,
        code: action.code,
      };
    }
    case 'compile': {
      model.inputs?.destroy();
      model.outputs?.destroy();
      model.timepoints?.destroy();
      model.solver?.destroy();
      return {
        ...model,
        compiling: true,
        solver: undefined,
        inputs: undefined,
        outputs: undefined,
        timepoints: undefined,
      };
    }
    case 'compiled': {
      const options = new Options({});
      let solver = new Solver(options);
      console.log('solver', solver.number_of_outputs, model.code)
      const times = new Vector([0, 1]);
      const outputs = new Vector(Array(times.length() * solver.number_of_outputs).fill(0.0));
      const inputs = new Vector(Array(solver.number_of_inputs).fill(1.0));
      const lowerBound = Array(solver.number_of_inputs).fill(0.0);
      const upperBound = Array(solver.number_of_inputs).fill(2.0);
      console.log('compiled', solver.number_of_outputs);
      solver.solve(times, inputs, outputs)
      
      return {
        ...model,
        compiling: false,
        timepoints: times,
        outputs: outputs,
        inputs: inputs,
        lowerBound: lowerBound,
        upperBound: upperBound,
        solver: solver,
      };
    }
    case 'setInput': {
      if (model.inputs === undefined) {
        throw Error('inputs not defined');
      }
      if (model.outputs == undefined) {
        throw Error('outputs not defined');
      }
      if (model.solver === undefined) {
        throw Error('solver not defined');
      }
      if (model.timepoints === undefined) {
        throw Error('timepoints not defined');
      }
      const newInputs = model.inputs.getFloat64Array();
      newInputs[action.index] = action.value;
      const lastTimePoint = model.timepoints.get(model.timepoints.length() - 1);
      model.timepoints.resize(2);
      let newTimes = model.timepoints.getFloat64Array();
      newTimes[0] = 0;
      newTimes[1] = lastTimePoint;
      model.solver.solve(model.timepoints, model.inputs, model.outputs)
      return {
        ...model,
      };
    }
    case 'setLowerBound': {
      const newLowerBound = model.lowerBound;
      newLowerBound[action.index] = action.value;
      return {
        ...model,
        lower_bound: newLowerBound,
      };
    }
    case 'setUpperBound': {
      const newUpperBound = model.upperBound;
      newUpperBound[action.index] = action.value;
      return {
        ...model,
        upper_bound: newUpperBound,
      };
    }
    case 'setMaxTime': {
      if (model.timepoints === undefined || model.outputs === undefined || model.solver === undefined || model.inputs === undefined) {
        throw Error('timepoints not defined');
      }
      model.timepoints.resize(2);
      let newTimes = model.timepoints.getFloat64Array();
      newTimes[0] = 0;
      newTimes[1] = action.value;
      model.solver.solve(model.timepoints, model.inputs, model.outputs)
      return {
        ...model,
      };
    }
    default: {
      // @ts-expect-error
      throw Error('Unknown action: ' + action.type);
    }
  }
}



