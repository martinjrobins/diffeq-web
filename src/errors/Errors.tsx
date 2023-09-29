import { Box, Typography } from "@mui/material";
import { useModel } from "../context/model";

interface ErrorsProps {
  type: 'compile' | 'solve',
}

const Errors: React.FC<ErrorsProps> = ({ type }) => {
  let title = type === 'compile' ? 'Compile Error' : 'Solve Error';
  const model = useModel();
  const error = type === 'compile' ? model.compileError : model.solveError;
  if (error === undefined) {
    title = `No ${title}: all good!`;
  } 
  const titleColor = error === undefined ? 'textPrimary' : 'error';
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <Typography variant="h6" color={titleColor}>
        {title}
      </Typography>
      <Typography color={'error'} style={{whiteSpace: 'pre-line'}}>
        {error}
      </Typography>
    </Box>
  );
}

export default Errors;