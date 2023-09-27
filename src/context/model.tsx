import { Dispatch, createContext, useContext, useReducer } from 'react';
import { compileModel, compileResponse, Solver, Options, Vector } from '@martinjrobins/diffeq-js';


type ModelContextType = {
  inputs: Vector;
  lowerBound: number[];
  upperBound: number[];
  outputs: Vector;
  timepoints: Vector;
  solver: Solver;
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
  inputs: new Vector(Array(2).fill(1.0)),
  outputs: new Vector(Array(2).fill(0.0))),
  lowerBound: Array(2).fill(0.0),
  upperBound: Array(2).fill(2.0),
  timepoints: new Vector(Array(2).fill(0.0)),
  code: defaultCode,
  error: undefined,
  compiling: false,
  solver: new Solver(new Options()),
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
      dispatch(action);
      compileModel(model.code).then(() => {
        const options = new Options();
        let solver = new Solver(options);
        const times = new Vector([0, 1]);
        const outputs = new Vector(new Array(times.length * solver.number_of_outputs));
        const inputs = new Vector(new Array(solver.number_of_inputs).fill(1.0));
        const lowerBound = Array(solver.number_of_inputs).fill(0.0);
        const upperBound = Array(solver.number_of_inputs).fill(2.0);
        dispatch({ type: 'compiled', times, outputs, inputs, lowerBound, upperBound, solver });
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
  times: Vector, 
  outputs: Vector, 
  inputs: Vector, 
  lowerBound: number[], 
  upperBound: number[],
  solver: Solver,
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
      return {
        ...model,
        compiling: true,
      };
    }
    case 'compiled': {
      return {
        ...model,
        compiling: false,
        timepoints: action.times,
        outputs: action.outputs,
        inputs: action.inputs,
        lowerBound: action.lowerBound,
        upperBound: action.upperBound,
        Solver: action.solver,
      };
    }
    case 'setInput': {
      const newInputs = model.inputs;
      newInputs[action.index] = action.value;
      return {
        ...model,
        inputs: newInputs,
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
    default: {
      // @ts-expect-error
      throw Error('Unknown action: ' + action.type);
    }
  }
}



