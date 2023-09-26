import React from 'react';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { useModel, useModelDispatch } from '../context/model';

function Editor() {
  const dispatch = useModelDispatch();
  const code = useModel().code;
  const onChange = React.useCallback((val: string, viewUpdate: ViewUpdate) => {
    dispatch({ type: 'setCode', code: val });
  }, []);
  return (
    <CodeMirror
      value={code}
      width="400px"
      basicSetup={{
        foldGutter: false,
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: false,
      }}
      onChange={onChange}

    />
  );
}
export default Editor;