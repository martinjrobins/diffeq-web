import { Dispatch, createContext, useContext, useReducer } from 'react';

type ModelContextType = {
  number_of_inputs: number;
  number_of_outputs: number;
  code: string;
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
  number_of_inputs: 2,
  number_of_outputs: 2,
  code: defaultCode,
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

  return (
    <ModelContext.Provider value={model}>
      <ModelDispatchContext.Provider value={dispatch}>
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
      return model;
    }
    default: {
      // @ts-expect-error
      throw Error('Unknown action: ' + action.type);
    }
  }
}



