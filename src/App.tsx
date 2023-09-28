import Editor from './editor/Editor';
import Sliders from './sliders/Sliders';
import { ThemeProvider, Box } from '@mui/material';
import Header from './header/Header';
import theme from './theme';
import { ModelProvider, useModelDispatch } from './context/model';
import { Allotment } from 'allotment';
import "allotment/dist/style.css";
import Chart from './chart/Chart';
import { useEffect } from 'react';


function App() {
  return (
    <ThemeProvider theme={theme}>
    <ModelProvider>
      <Box sx={{
        height: '94vh',
        width: '100vw',
      }}>
      <Header />
      <Allotment vertical={false} >
        <Editor />
        <Allotment vertical={true} >
          <Sliders/>
          <Chart />
        </Allotment>
      </Allotment>
      </Box>
    </ModelProvider>
    </ThemeProvider>
  );
}

export default App;
