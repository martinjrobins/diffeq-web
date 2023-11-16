import Editor from './editor/Editor';
import Sliders from './sliders/Sliders';
import { ThemeProvider, Box } from '@mui/material';
import Header from './header/Header';
import theme from './theme';
import { ModelProvider } from './context/model';
import { Allotment } from 'allotment';
import "allotment/dist/style.css";
import Chart from './chart/Chart';
import Errors from './errors/Errors';
import Help from './help/Help';
import ServerErrorDialog from './errors/ServerErrorDialog';


function App() {
  return (
    <ThemeProvider theme={theme}>
    <ModelProvider>
      <Box sx={{
        height: '94vh',
        width: '100vw',
      }}>
      <Header />
      <ServerErrorDialog />
      <Allotment vertical={false} >
        <Allotment vertical={true} >
          <Allotment.Pane preferredSize={'35%'}>
            <Editor />
          </Allotment.Pane>
          <Allotment.Pane preferredSize={'49%'}>
            <Help />
          </Allotment.Pane>
          <Allotment.Pane preferredSize={'8%'}>
            <Errors type={'compile'} />
          </Allotment.Pane>
          <Allotment.Pane preferredSize={'8%'}>
            <Errors type={'solve'} />
          </Allotment.Pane>
        </Allotment>
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
