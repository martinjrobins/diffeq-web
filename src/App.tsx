import React from 'react';
import logo from './logo.svg';
import Editor from './editor/Editor';
import Sliders from './sliders/Sliders';
import Plot from './plot/Plot';
import { Stack, Grid, ThemeProvider } from '@mui/material';
import Header from './header/Header';
import theme from './theme';
import { ModelProvider } from './context/model';


function App() {
  return (
    <ThemeProvider theme={theme}>
    <ModelProvider>
      <Header />
      <Stack direction="row" spacing={2}>
        <Editor />
        <Stack direction="column" spacing={2}>
          <Sliders/>
          <Plot />
        </Stack>
      </Stack>
    </ModelProvider>
    </ThemeProvider>
  );
}

export default App;
